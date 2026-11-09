// Scroll-in fade for content blocks: fades in with a small upward shift the first
// time each element enters the viewport. Does nothing under prefers-reduced-motion.
export function initReveal(selector) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
    const els = document.querySelectorAll(selector)
    const io = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
        }
    }, { rootMargin: '0px 0px -60px 0px' })
    els.forEach(el => {
        el.classList.add('reveal')
        io.observe(el)
    })
    return () => io.disconnect()
}
