/*
 * Black hole — zero-dependency WebGL module.
 * Adapted from the author's own visual-lab experiment (Concept B
 * "Gravity / Singularity"): Schwarzschild raymarched accretion disk,
 * particle swarm, "formation" intro, photon ring and film grain.
 *
 *   const bh = initBlackHole(el, options)
 *   bh.pause() / bh.resume() / bh.destroy() / bh.setOpacity(v)
 *
 * Options
 *   center        [x, y] relative to the container (0..1, top-left origin). Default [0.65, 0.4]
 *   radius        shadow radius as a fraction of container height. Default 0.34
 *                 (containers <= 420px wide use 0.30 of the width instead)
 *   exposure      overall brightness multiplier (raymarch + particles). Default 1
 *   particleCount number of particles. Default 2500 (width <= 560) / 6000
 *   steps         raymarch integration steps (8..96). Default 88
 *   maxDpr        devicePixelRatio cap. Default 2 (never above 2)
 *   grain         grain multiplier. Default 1
 *   vignette      darken the frame around the hole. Default true
 *   background    background color (hex). Default '#1A1512'
 *   intro         play the 2.4s "formation" intro. Default true
 *   reducedMotion render one static frame only. Default: prefers-reduced-motion
 *   fallbackSrc   image shown when WebGL is unavailable. Default none
 *   ringIntensity photon ring glow strength. Default 1
 *   ringWidth     photon ring core width in px. Default 2
 *   ringHalo      photon ring outer halo falloff (shadow radii). Default 0.12
 *   ringDoppler   0..1 ring brightness asymmetry (Doppler side brighter). Default 0.6
 *   arcGain       lensed back-disk image brightness vs the front disk. Default 1.2
 *   edgeSoft      disk inner-edge softening in Rs (anti-aliasing). Default 0.1
 *   diskInner     disk inner radius in Rs (photon sphere is 1.5). Default 1.65
 */
import { VS, FS, PVS, PFS } from './shaders.js'

const TAU = Math.PI * 2
const SPIN_DIR = +1          // disk / particle rotation sign
const TEX_SCROLL = -1        // texture sampling sign so patterns move with matter
const E_CAM = 26.0           // camera distance (Rs), same as shader
const TILT = 14              // deg
const BEAM_DIR = 180         // deg
const DISK_OUT = 7.0
const BASE_DISK = (TAU / 7) * Math.pow(2, 1.5) * 0.75
const K_IDLE = (TAU / 7) * Math.pow(2, 1.5) * 0.75
const K_PEAK = TAU * Math.pow(2, 1.5)
const TRAIL_SEC = 0.055
const INTRO_MS = 2400
const BREATH = { every: [18000, 8000], dur: 1400, depth: 0.015 }
const PHOTON = '#F2B05A', FIBER_MID = '#9C4A2F', FIBER_FAR = '#5C3A2E'

function rgb(hex) {
    return [parseInt(hex.slice(1, 3), 16) / 255,
            parseInt(hex.slice(3, 5), 16) / 255,
            parseInt(hex.slice(5, 7), 16) / 255]
}
const clamp01 = t => Math.max(0, Math.min(1, t))
const seg = (ms, a, b) => clamp01((ms - a) / (b - a))
const easeIn = t => t * t
const easeInOut = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

export function initBlackHole(el, options = {}) {
    const opt = {
        center: [0.65, 0.4],
        radius: 0.34,
        exposure: 1,
        particleCount: null,
        steps: 88,
        maxDpr: 2,
        grain: 1,
        vignette: true,
        background: '#1A1512',
        intro: true,
        reducedMotion: typeof matchMedia === 'function'
            && matchMedia('(prefers-reduced-motion: reduce)').matches,
        fallbackSrc: null,
        ringIntensity: 1,
        ringWidth: 2,
        ringHalo: 0.12,
        ringDoppler: 0.6,
        arcGain: 1.2,
        edgeSoft: 0.1,
        diskInner: 1.65,
        ...options
    }

    const canvas = document.createElement('canvas')
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block'
    canvas.setAttribute('aria-hidden', 'true')
    el.appendChild(canvas)

    let gl = null
    try {
        gl = canvas.getContext('webgl', { antialias: true, alpha: false })
            || canvas.getContext('experimental-webgl')
    } catch (e) { gl = null }

    if (!gl) {
        canvas.remove()
        let img = null
        if (opt.fallbackSrc) {
            img = document.createElement('img')
            img.src = opt.fallbackSrc
            img.alt = ''
            img.setAttribute('aria-hidden', 'true')
            img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block'
            el.appendChild(img)
        }
        const target = img
        return {
            webgl: false,
            pause() {}, resume() {},
            destroy() { if (img) img.remove() },
            setOpacity(v) { if (target) target.style.opacity = String(v) }
        }
    }

    /* ── GL setup ── */
    const shaders = []
    function compile(type, src) {
        const s = gl.createShader(type)
        gl.shaderSource(s, src); gl.compileShader(s)
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
        shaders.push(s)
        return s
    }
    function link(vs, fs) {
        const p = gl.createProgram()
        gl.attachShader(p, compile(gl.VERTEX_SHADER, vs))
        gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs))
        gl.linkProgram(p)
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p))
        return p
    }

    const prog = link(VS, FS)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    const loc = {}
    ;['uRes', 'uCenter', 'uTime', 'uRadius', 'uTilt', 'uBeamDir', 'uDiskIn', 'uDiskOut',
      'uDiskRot', 'uSteps', 'uBreath', 'uGrain', 'uExposure', 'uMass', 'uDiskFill',
      'uBlobRot', 'uTexScroll', 'uLensK', 'uDrift', 'uVig', 'uRingLit',
      'uRingIntensity', 'uRingWidth', 'uRingHalo', 'uRingDoppler', 'uArcGain', 'uEdgeSoft',
      'uBg', 'uPhoton', 'uFiberMid', 'uFiberFar'].forEach(n => { loc[n] = gl.getUniformLocation(prog, n) })

    const pprog = link(PVS, PFS)
    const pa = {
        aP: gl.getAttribLocation(pprog, 'aP'),
        aC: gl.getAttribLocation(pprog, 'aC'),
        aA: gl.getAttribLocation(pprog, 'aA'),
        aS: gl.getAttribLocation(pprog, 'aS')
    }
    const uPoint = gl.getUniformLocation(pprog, 'uPoint')
    const pvbo = gl.createBuffer()

    /* ── size ── */
    let dpr = 1, cssW = 1, cssH = 1
    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, opt.maxDpr, 2)
        const r = el.getBoundingClientRect()
        cssW = Math.max(1, r.width); cssH = Math.max(1, r.height)
        const w = Math.round(cssW * dpr), h = Math.round(cssH * dpr)
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w; canvas.height = h
            gl.viewport(0, 0, w, h)
        }
    }
    function radiusPx() {
        const shadowPx = cssW <= 420 ? cssW * 0.30 : cssH * opt.radius
        return DISK_OUT * shadowPx * dpr     // shader R corresponds to |S| = diskOut
    }
    function centerPx() {
        return [opt.center[0] * canvas.width, (1 - opt.center[1]) * canvas.height]
    }

    /* ── particles ── */
    const PN = opt.particleCount ?? (el.getBoundingClientRect().width <= 560 ? 2500 : 6000)
    const pr = new Float32Array(PN), pphi = new Float32Array(PN), pz = new Float32Array(PN)
    const pw = new Float32Array(PN), pb = new Float32Array(PN), ps = new Float32Array(PN)
    const ptmp = new Float32Array(PN), pin = new Float32Array(PN), edgeHint = new Float32Array(PN)
    const pbuf = new Float32Array(PN * 2 * 7)
    let pAlpha = 0, pGrav = 0, pK = 0, pInflow = 0, pFlat = 0, pNextFall = 0

    function seedParticle(i, outer) {
        pr[i] = outer ? 9.5 + Math.random() * 2.5 : 2.4 + Math.pow(Math.random(), 0.55) * 9.6
        pphi[i] = Math.random() * TAU
        pz[i] = outer ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.5) * 13.0
        pw[i] = SPIN_DIR * (Math.random() - 0.5) * 0.10
        pb[i] = 0.42 + Math.random() * 0.33
        ps[i] = 0.9 + Math.random() * 0.9
        ptmp[i] = Math.random()
        pin[i] = 0
    }
    for (let i = 0; i < PN; i++) seedParticle(i, false)

    // camera basis, identical to the raymarch camera
    const tr = TILT * Math.PI / 180
    const cam = {
        cy: E_CAM * Math.sin(tr), cz: -E_CAM * Math.cos(tr),
        fy: -Math.sin(tr), fz: Math.cos(tr),
        uy: Math.cos(tr), uz: Math.sin(tr),
        F: E_CAM / 2.598076
    }

    /* ── animation state ── */
    let mass = 1, fill = 1, ring = 1
    let diskRot = 0, blobRot = 0, lensK = 0, bgDrift = 0
    let breath = 1, breathPhase = -1, breathStart = 0
    let suckStart = -1, suck = 0
    let introOn = false, introT0 = 0
    const t0 = performance.now()
    let last = t0
    let nextBreath = BREATH.every[0] + Math.random() * BREATH.every[1]

    function introEnd() {
        mass = 1; fill = 1; ring = 1
        pGrav = 1; pK = K_IDLE; pInflow = 0; pFlat = 3.0; pAlpha = 0.32
        introOn = false
    }

    function tickIntro(now) {
        if (!introOn) return
        const ms = now - introT0
        /* 0–500 scattered stars; 400–1000 gravity takes over; 1000–1600 peak spin,
           mass -> 1, ring ignites at 1300; 1600–2200 disk fills; 2200–2400 settle */
        const m1 = easeIn(seg(ms, 400, 1000)) * 0.35
        const m2 = easeInOut(seg(ms, 1000, 1600)) * 0.65
        mass = Math.min(1, m1 + m2)
        fill = easeInOut(seg(ms, 1600, 2200))
        pGrav = easeIn(seg(ms, 400, 1000))
        pK = K_IDLE + (K_PEAK - K_IDLE) * (easeIn(seg(ms, 400, 1000)) - easeInOut(seg(ms, 1600, 2200)))
        pInflow = 0.9 * easeIn(seg(ms, 400, 1000)) * (1 - 0.75 * easeInOut(seg(ms, 1600, 2200)))
        pFlat = 6.0 * easeIn(seg(ms, 400, 1000))
        pAlpha = 0.62 - 0.30 * easeInOut(seg(ms, 1600, 2200))
        const rl = seg(ms, 1300, 1500)
        ring = rl <= 0 ? 0 : (rl < 1 ? rl * 1.15 + Math.sin(rl * Math.PI) * 0.15 : 1)
        if (ms >= 2200 && suckStart < 0) suckStart = now
        if (ms >= INTRO_MS) introEnd()
    }

    function stepParticles(dt, now) {
        const scale = radiusPx() / DISK_OUT
        const hw = canvas.width * 0.5, hh = canvas.height * 0.5
        const [cx, cy] = centerPx()
        const offX = cx - hw, offY = cy - hh
        const soft = 6 / scale
        const alphaMul = opt.exposure

        if (pGrav > 0.9 && pInflow < 0.05 && now > pNextFall) {
            pin[(Math.random() * PN) | 0] = 1.1
            pNextFall = now + 16000 + Math.random() * 9000
        }

        let k = 0
        for (let i = 0; i < PN; i++) {
            const r = pr[i]
            const wKep = SPIN_DIR * pK * Math.pow(r > 0.6 ? r : 0.6, -1.5)
            const w = pw[i] * (1 - pGrav) + wKep * pGrav
            pphi[i] += w * dt
            const inf = pInflow + pin[i]
            if (inf > 0) pr[i] = r - inf * dt * (1 + 1.6 / (r > 1 ? r : 1))
            if (pFlat > 0) pz[i] += (0 - pz[i]) * Math.min(1, pFlat * dt)
            if (pr[i] < 2.0) {
                pb[i] -= dt * 2.6
                if (pb[i] <= 0) seedParticle(i, true)
            }

            const ph = pphi[i], rr = pr[i]
            let dPhi = w * TRAIL_SEC * (1 + 2 * edgeHint[i])
            if (dPhi > 0.30) dPhi = 0.30; else if (dPhi < -0.30) dPhi = -0.30
            const trailPhi = ph - dPhi
            for (let e = 0; e < 2; e++) {
                const a = e === 0 ? ph : trailPhi
                const rz = e === 0 ? rr : rr + inf * TRAIL_SEC
                const wx = rz * Math.cos(a), wy = pz[i], wz = rz * Math.sin(a)
                const dyv = wy - cam.cy, dzv = wz - cam.cz
                let df = dyv * cam.fy + dzv * cam.fz
                if (df < 0.5) df = 0.5
                let sx = (wx / df) * cam.F
                let sy = ((dyv * cam.uy + dzv * cam.uz) / df) * cam.F
                let sm = Math.sqrt(sx * sx + sy * sy)
                if (sm > 0.05) {
                    const ramp = sm < 0.9 ? sm / 0.9 : 1
                    const pin2 = (lensK * (1 - Math.min(1, Math.max(0, (sm - 1.1) / 2.9))) + bgDrift) * ramp
                    const lf = 1 - pin2 / sm
                    sx *= lf; sy *= lf; sm *= lf
                }
                const sd = sm - mass
                const occl = sd <= 0 ? 0 : (sd >= soft ? 1 : sd / soft)
                const edge = sd > 0 && sd < 0.2 * mass ? 1 - sd / (0.2 * mass) : 0
                pbuf[k++] = (sx * scale + offX) / hw
                pbuf[k++] = (sy * scale + offY) / hh
                const t = ptmp[i]
                pbuf[k++] = (255 - 13 * t) / 255
                pbuf[k++] = (233 - 57 * t) / 255
                pbuf[k++] = (192 - 102 * t) / 255
                const far = 1 - pGrav * (rr < 7.5 ? 0 : (rr > 11.5 ? 1 : (rr - 7.5) / 4))
                const al = pb[i] * pAlpha * occl * far * (1 - 0.55 * edge) * alphaMul
                if (e === 0) edgeHint[i] = edge
                pbuf[k++] = e === 0 ? al : 0.0
                pbuf[k++] = e === 0 ? ps[i] * dpr : 0.0
            }
        }
    }

    function drawParticles() {
        if (pAlpha <= 0.002) return
        gl.useProgram(pprog)
        gl.bindBuffer(gl.ARRAY_BUFFER, pvbo)
        gl.bufferData(gl.ARRAY_BUFFER, pbuf, gl.DYNAMIC_DRAW)
        const st = 28
        gl.enableVertexAttribArray(pa.aP); gl.vertexAttribPointer(pa.aP, 2, gl.FLOAT, false, st, 0)
        gl.enableVertexAttribArray(pa.aC); gl.vertexAttribPointer(pa.aC, 3, gl.FLOAT, false, st, 8)
        gl.enableVertexAttribArray(pa.aA); gl.vertexAttribPointer(pa.aA, 1, gl.FLOAT, false, st, 20)
        gl.enableVertexAttribArray(pa.aS); gl.vertexAttribPointer(pa.aS, 1, gl.FLOAT, false, st, 24)
        gl.enable(gl.BLEND); gl.blendFunc(gl.ONE_MINUS_DST_COLOR, gl.ONE)
        gl.uniform1f(uPoint, 0.0); gl.drawArrays(gl.LINES, 0, PN * 2)
        gl.uniform1f(uPoint, 1.0); gl.drawArrays(gl.POINTS, 0, PN * 2)
        gl.disable(gl.BLEND)
        gl.disableVertexAttribArray(pa.aC)
        gl.disableVertexAttribArray(pa.aA)
        gl.disableVertexAttribArray(pa.aS)
    }

    const bg = rgb(opt.background), photon = rgb(PHOTON), fMid = rgb(FIBER_MID), fFar = rgb(FIBER_FAR)

    function tick(now, animate) {
        const dt = Math.min((now - last) / 1000, 0.05); last = now
        const time = (now - t0) / 1000

        if (animate) {
            diskRot += SPIN_DIR * dt * BASE_DISK
            blobRot += SPIN_DIR * dt * BASE_DISK
        }

        suck = 0
        if (suckStart >= 0 && animate) {
            const sT = (now - suckStart) / 600
            if (sT >= 1) suckStart = -1; else suck = Math.sin(sT * Math.PI)
        }

        tickIntro(now)

        if (animate && !introOn) {
            if (breathPhase < 0 && (now - t0) > nextBreath) { breathPhase = 0; breathStart = now }
            if (breathPhase === 0) {
                const bt = (now - breathStart) / BREATH.dur
                if (bt >= 1) {
                    breathPhase = -1; breath = 1
                    nextBreath = (now - t0) + BREATH.every[0] + Math.random() * BREATH.every[1]
                } else {
                    breath = 1 - BREATH.depth * Math.sin(bt * Math.PI)
                }
            }
        } else { breath = 1 }

        // background lensing: ~12px displacement at 2.6 Rs
        lensK = 12 * dpr / (radiusPx() / DISK_OUT)
        if (animate && !introOn) bgDrift = Math.min(0.9, bgDrift + dt * 0.003 * 2.6)

        if (!introOn) {
            pGrav = 1; pK = K_IDLE; pInflow = 0.45 * suck; pFlat = 3.0; pAlpha = 0.32
        }

        gl.useProgram(prog)
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        const [cx, cy] = centerPx()
        gl.uniform2f(loc.uRes, canvas.width, canvas.height)
        gl.uniform2f(loc.uCenter, cx, cy)
        gl.uniform1f(loc.uTime, time)
        gl.uniform1f(loc.uRadius, radiusPx())
        gl.uniform1f(loc.uTilt, TILT * Math.PI / 180)
        gl.uniform1f(loc.uBeamDir, BEAM_DIR * Math.PI / 180)
        gl.uniform1f(loc.uDiskIn, opt.diskInner)
        gl.uniform1f(loc.uDiskOut, DISK_OUT)
        gl.uniform1f(loc.uDiskRot, diskRot)
        gl.uniform1f(loc.uSteps, Math.max(8, Math.min(96, opt.steps)))
        gl.uniform1f(loc.uBreath, breath)
        gl.uniform1f(loc.uGrain, opt.grain)
        gl.uniform1f(loc.uExposure, opt.exposure)
        gl.uniform1f(loc.uMass, mass)
        gl.uniform1f(loc.uDiskFill, fill)
        gl.uniform1f(loc.uBlobRot, blobRot)
        gl.uniform1f(loc.uTexScroll, TEX_SCROLL)
        gl.uniform1f(loc.uLensK, lensK)
        gl.uniform1f(loc.uDrift, bgDrift)
        gl.uniform1f(loc.uVig, opt.vignette ? 1 : 0)
        gl.uniform1f(loc.uRingLit, ring)
        gl.uniform1f(loc.uRingIntensity, opt.ringIntensity)
        gl.uniform1f(loc.uRingWidth, opt.ringWidth)
        gl.uniform1f(loc.uRingHalo, opt.ringHalo)
        gl.uniform1f(loc.uRingDoppler, opt.ringDoppler)
        gl.uniform1f(loc.uArcGain, opt.arcGain)
        gl.uniform1f(loc.uEdgeSoft, opt.edgeSoft)
        gl.uniform3fv(loc.uBg, bg)
        gl.uniform3fv(loc.uPhoton, photon)
        gl.uniform3fv(loc.uFiberMid, fMid)
        gl.uniform3fv(loc.uFiberFar, fFar)
        gl.drawArrays(gl.TRIANGLES, 0, 3)

        stepParticles(animate ? dt : 0, now)
        drawParticles()
    }

    /* ── loop ── */
    let raf = 0, running = false, destroyed = false
    function frame(now) {
        raf = requestAnimationFrame(frame)
        tick(now, true)
    }

    function renderStatic() {
        introEnd()
        // let the particles settle onto the disk plane before the still frame
        let t = performance.now()
        for (let i = 0; i < 80; i++) { last = t; t += 50; stepParticles(0.05, t) }
        last = performance.now()
        tick(last, false)
    }

    const ro = new ResizeObserver(() => {
        resize()
        if (!running && !destroyed) tick(performance.now(), false)
    })
    resize()
    ro.observe(el)

    if (opt.reducedMotion) {
        renderStatic()
    } else {
        if (opt.intro) {
            introOn = true; introT0 = performance.now()
            pAlpha = 0.62
        } else {
            introEnd()
        }
        pNextFall = performance.now() + 18000
        running = true
        raf = requestAnimationFrame(frame)
    }

    return {
        webgl: true,
        pause() {
            if (!running) return
            running = false
            cancelAnimationFrame(raf)
        },
        resume() {
            if (running || destroyed || opt.reducedMotion) return
            running = true
            last = performance.now()
            raf = requestAnimationFrame(frame)
        },
        setOpacity(v) { canvas.style.opacity = String(v) },
        destroy() {
            if (destroyed) return
            destroyed = true
            running = false
            cancelAnimationFrame(raf)
            ro.disconnect()
            gl.deleteBuffer(buf); gl.deleteBuffer(pvbo)
            gl.deleteProgram(prog); gl.deleteProgram(pprog)
            shaders.forEach(s => gl.deleteShader(s))
            const lose = gl.getExtension('WEBGL_lose_context')
            if (lose) lose.loseContext()
            canvas.remove()
        }
    }
}
