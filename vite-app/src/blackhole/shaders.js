/*
 * Black hole shaders — adapted from the author's own visual-lab experiment
 * (Concept B "Gravity / Singularity"). Only the side-view accretion-disk
 * raymarch (style E) and the particle pass are kept.
 */

// Full-screen triangle
export const VS = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`

// Particle pass: points + trail line segments, additive
export const PVS = `
attribute vec2 aP; attribute vec3 aC; attribute float aA; attribute float aS;
varying vec3 vC; varying float vA;
void main(){ gl_Position = vec4(aP, 0.0, 1.0); gl_PointSize = aS; vC = aC; vA = aA; }
`

export const PFS = `
precision mediump float;
uniform float uPoint;          // 1 = points (gl_PointCoord) / 0 = trail lines
varying vec3 vC; varying float vA;
void main(){
  float m = 1.0;
  if (uPoint > 0.5) m = 1.0 - smoothstep(0.15, 0.5, length(gl_PointCoord - vec2(0.5)));
  gl_FragColor = vec4(vC * vA * m, vA * m);
}
`

// Schwarzschild raymarch of a side-view accretion disk
export const FS = `
precision highp float;

uniform vec2  uRes;
uniform vec2  uCenter;   // hole center (device px, GL coords)
uniform float uTime;
uniform float uRadius;   // disk outer radius on screen (device px)
uniform float uTilt;     // disk tilt (rad)
uniform float uBeamDir;  // Doppler bright-side azimuth (rad)
uniform float uDiskIn;   // inner radius (Rs)
uniform float uDiskOut;  // outer radius (Rs)
uniform float uDiskRot;  // accumulated texture rotation
uniform float uSteps;    // integration steps
uniform float uBreath;   // breathing scale 0.985..1
uniform float uGrain;    // grain multiplier
uniform float uExposure; // overall brightness multiplier

/* "formation" intro */
uniform float uMass;     // 0..1 black hole mass; 0 = flat spacetime
uniform float uDiskFill; // 0..1 disk grows from inner to outer edge
uniform float uBlobRot;  // accumulated rotation of bright lumps / dark gaps
uniform float uTexScroll;
uniform float uLensK;    // background lensing displacement (Rs)
uniform float uDrift;    // slow inward drift of background grain (Rs)
uniform float uVig;      // vignette on/off
uniform float uRingLit;  // photon ring ignition 0 -> 1.15 -> 1
uniform float uRingIntensity; // photon ring glow strength
uniform float uRingWidth;     // photon ring core width (px)
uniform float uRingHalo;      // outer halo falloff (shadow-radius units)
uniform float uRingDoppler;   // 0..1 brightness asymmetry following the disk's Doppler side
uniform float uArcGain;       // brightness of lensed (back-disk) images relative to the front disk
uniform float uEdgeSoft;      // inner-edge softening of the disk (Rs)
uniform float uOuterSoft;     // outer-edge fade width of the disk (Rs)

uniform vec3 uBg;
uniform vec3 uPhoton;
uniform vec3 uFiberMid;
uniform vec3 uFiberFar;

const float PI = 3.14159265;
const vec3 E_SHADOW = vec3(5.0,   4.0,   3.0) / 255.0;
const vec3 E_RING   = vec3(255.0, 233.0, 200.0) / 255.0;
const float E_B0    = 2.598076;   // 3*sqrt(3)/2: shadow radius (Rs)
const float E_CAM   = 26.0;       // camera distance (Rs)
const vec3 E_WHITE  = vec3(255.0, 240.0, 214.0) / 255.0;
const vec3 E_DIM    = vec3(107.0,  51.0,  36.0) / 255.0;
const float E_DUST  = 5.0;

float hash1(float n){ return fract(sin(n * 127.1) * 43758.5453123); }
float hash2(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash2(i),                 hash2(i + vec2(1.0, 0.0)), u.x),
             mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++){ v += a * vnoise(p); p *= 2.03; a *= 0.5; }
  return v;
}

/* Disk material. rD in Rs, phi = disk azimuth, rot = accumulated rotation. */
vec4 diskTex(float rD, float phi, float rot, float detail, float front){
  float x = clamp((rD - uDiskIn) / (uDiskOut - uDiskIn), 0.0, 1.0);

  // Kepler: angular velocity ~ r^-1.5
  float p2 = phi + uTexScroll * rot * pow(rD, -1.5);

  float innerZone = 1.0 - smoothstep(0.0, 0.15, x);
  float azim = fbm(vec2(cos(p2), sin(p2)) * 1.75);
  float band = fbm(vec2(rD * 14.0, azim * mix(2.4, 0.6, innerZone)));
  float fine = fbm(vec2(rD * 40.0, azim * 5.0));
  float n = mix(0.35 * azim + 0.65 * band * detail, fine, 0.25 * detail);
  n = clamp((n - 0.35) * 3.2, 0.0, 1.0);

  vec3 c = mix(mix(uPhoton, uFiberMid, smoothstep(0.10, 0.75, x)), uFiberFar, smoothstep(0.55, 1.0, x));
  c = mix(c, E_WHITE, innerZone * 0.75 * front);

  // Doppler beaming
  float beat = 1.0 + 0.06 * sin(uTime * 0.7);
  float dside = clamp(1.10 * beat * cos(phi - uBeamDir), -1.0, 1.0);
  float dop = 1.0 + 0.55 * beat * cos(phi - uBeamDir);
  c = mix(c, E_WHITE, max(dside, 0.0) * 0.55);
  c = mix(c, E_DIM * vec3(0.94, 1.0, 1.16), max(-dside, 0.0) * 0.85);

  // 5 bright lumps + 3 dark gaps, each orbiting at its own Keplerian speed
  float lump = 1.0;
  for (int i = 0; i < 5; i++){
    float fi = float(i);
    float br = mix(uDiskIn + 0.35, uDiskOut - 0.9,
                   (fi + 0.15 + 0.70 * hash1(fi * 3.13 + 0.21)) / 5.0);
    float bp = hash1(fi * 7.71 + 1.37) * 6.2831853 + uBlobRot * pow(br, -1.5);
    float dp = phi - bp;
    dp = atan(sin(dp), cos(dp));
    float wp = radians(16.0 + 9.0 * hash1(fi * 2.31 + 4.4));
    float dr = (rD - br) / 0.30;
    lump += 0.75 * exp(-dp * dp / (2.0 * wp * wp) - 0.5 * dr * dr);
  }
  for (int i = 0; i < 3; i++){
    float fi = float(i);
    float br = mix(uDiskIn + 0.3, uDiskOut - 0.5,
                   (fi + 0.2 + 0.60 * hash1(fi * 5.17 + 2.9)) / 3.0);
    float bp = hash1(fi * 9.13 + 0.6) * 6.2831853 + uBlobRot * pow(br, -1.5);
    float dp = phi - bp;
    dp = atan(sin(dp), cos(dp));
    float wp = radians(8.0 + 4.0 * hash1(fi * 1.7 + 6.1));
    lump -= 0.30 * exp(-dp * dp / (2.0 * wp * wp));
  }

  float a = pow(1.0 - x, 2.4) * (0.16 + 0.84 * n) * max(dop, 0.0) * 5.2 * max(lump, 0.15);
  return vec4(c, clamp(a, 0.0, 1.0));
}

void main(){
  vec2 frag = gl_FragCoord.xy - uCenter;
  vec2 p = frag;

  float R  = uRadius * uBreath;
  float px = 1.0 / R;

  vec3 col = uBg;

  float Rs  = 1.0 / uDiskOut;
  vec2  S   = p / (R * Rs);
  float rot = uDiskRot;

  /* Per-pixel Schwarzschild null geodesic: u = 1/r, d2u/dphi2 + u = 1.5 u^2 (Verlet). */
  float rIn = uDiskIn, rOut = uDiskOut;

  vec3 camPos = vec3(0.0, E_CAM * sin(uTilt), -E_CAM * cos(uTilt));
  vec3 fwd = normalize(-camPos);
  vec3 rgt = normalize(cross(vec3(0.0, 1.0, 0.0), fwd));
  vec3 upv = cross(fwd, rgt);
  vec3 rdir = normalize(fwd * (E_CAM / E_B0) + rgt * S.x + upv * S.y);

  vec3 e1 = normalize(camPos);
  vec3 nn = cross(e1, rdir);
  vec3 e2 = length(nn) > 1e-5 ? normalize(cross(nn, e1)) : upv;

  float bImp = length(cross(camPos, rdir));
  // anti-aliased shadow edge: ~1px wide in impact-parameter space
  float pxS = px / Rs;
  float hole = 1.0 - smoothstep(E_B0 * uMass - E_B0 * pxS, E_B0 * uMass + E_B0 * pxS, bImp);

  float u  = 1.0 / E_CAM;
  float du = -u * dot(rdir, e1) / max(dot(rdir, e2), 1e-4);
  float hstep = 2.0 * PI * 3.4 / max(uSteps, 8.0);

  vec3  acc = vec3(0.0);
  float trans = 1.0, phiR = 0.0;
  vec3  Pprev = camPos;

  for (int i = 0; i < 96; i++){
    if (float(i) >= uSteps) break;
    float hh = hstep / (1.0 + 2.0 * u * u);
    float a1 = 1.5 * uMass * u * u - u;
    u  += du * hh + 0.5 * a1 * hh * hh;
    if (u * uMass >= 0.98) break;
    if (u <= 1.0 / (3.0 * E_CAM)) break;
    float a2 = 1.5 * uMass * u * u - u;
    du += 0.5 * (a1 + a2) * hh;
    phiR += hh;

    vec3 P = (1.0 / u) * (cos(phiR) * e1 + sin(phiR) * e2);
    if (P.y * Pprev.y < 0.0 && trans > 0.02){
      float tt = Pprev.y / (Pprev.y - P.y);
      vec3 H = mix(Pprev, P, tt);
      float phiHit = phiR - hh * (1.0 - tt);
      float rh = length(H);
      float rFill = mix(rIn, rOut, uDiskFill);
      if (rh > rIn - uEdgeSoft && rh < rFill){
        float graze = abs(normalize(P - Pprev).y);
        float detail = smoothstep(0.015, 0.20, graze)
                     * (1.0 - 0.80 * smoothstep(0.9, 2.6, phiHit));
        float lensed = smoothstep(0.9, 1.6, phiHit);
        float front = 1.0 - lensed;
        // lensed images: above the hole a bit brighter than below, blended smoothly
        // (a hard S.y > 0 switch here produced a horizontal seam at the hole's center line)
        // and concentrated toward the inner edge so they read as a defined arc
        float xr = clamp((rh - rIn) / (rOut - rIn), 0.0, 1.0);
        float lensedMul = uArcGain * mix(0.5, 1.0, smoothstep(-0.12, 0.12, S.y))
                        * mix(1.0, pow(1.0 - xr, 1.5), lensed);
        float arcMul = mix(1.0, lensedMul, lensed);
        vec4 d = diskTex(max(rh, rIn), atan(H.z, H.x), rot, detail, front);
        float a = clamp(d.a * arcMul
                        * smoothstep(rIn - uEdgeSoft, rIn + uEdgeSoft, rh)
                        * (1.0 - smoothstep(rFill - uOuterSoft, rFill, rh)), 0.0, 1.0);
        // lensed images seen *through* the front disk read as scratches: hide them
        // once the ray has already passed a mostly opaque front layer
        a *= mix(1.0, smoothstep(0.55, 0.95, trans), lensed);
        acc += trans * a * d.rgb;
        trans *= 1.0 - a;
      }
      else if (rh >= rFill && rh < rOut + E_DUST){
        float dphi = atan(H.z, H.x) + uTexScroll * rot * pow(rh, -1.5);
        float dn = fbm(vec2(cos(dphi), sin(dphi)) * 1.2 + vec2(rh * 0.8));
        float ringGate = smoothstep(uMass, uMass + 6.0 * (px / Rs), length(S));
        float a = 0.04 * dn * (1.0 - smoothstep(rOut, rOut + E_DUST, rh)) * ringGate;
        acc += trans * a * uFiberMid;
        trans *= 1.0 - a;
      }
    }
    Pprev = P;
  }

  col = mix(col, E_SHADOW, hole) * trans + acc;

  // Photon ring: a soft glow hugging the shadow edge, brighter on the Doppler side.
  // Gated by the transmittance along the ray, so any disk in front hides it.
  if (uRingLit > 0.001 && uMass > 0.02){
    float dRing = length(S) - uMass;
    float w = max(uRingWidth, 0.5) * pxS;
    float core = exp(-0.5 * dRing * dRing / (w * w));
    float halo = dRing > 0.0 ? exp(-dRing / max(uRingHalo, 1e-3)) : exp(dRing / (2.0 * w));
    float side = max(0.0, 1.0 + uRingDoppler * cos(atan(S.y, S.x) - uBeamDir));
    vec3 ringCol = mix(uPhoton, E_RING, 0.35);
    col += ringCol * (0.55 * core + 0.35 * halo) * side * uRingIntensity * uRingLit
         * smoothstep(0.55, 0.95, trans);
  }

  col *= uExposure;

  // Background grain, pulled toward the hole (lensing + slow drift)
  float sr = length(frag) / (R * Rs);
  float pinch = (uLensK * (1.0 - smoothstep(1.1, 4.0, sr)) + uDrift)
              * smoothstep(0.0, 0.9, sr);
  float f = sr > 0.02 ? 1.0 - pinch / sr : 1.0;
  vec2 gc = uCenter + frag * f;
  float gn = hash2(gc + fract(uTime) * 91.7);
  col += gn * 0.05 * uGrain;

  // Vignette centered on the hole
  if (uVig > 0.5){
    float vr = length(p) / (min(uRes.x, uRes.y) * 0.62);
    col *= mix(1.0, 0.55, pow(clamp(vr, 0.0, 1.0), 1.8));
  }

  gl_FragColor = vec4(col, 1.0);
}
`
