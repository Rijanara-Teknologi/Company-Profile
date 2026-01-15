/**
 * Parallax Module
 * Implements parallax scrolling for decorative elements
 * Uses IntersectionObserver and requestAnimationFrame for performance
 */

export function initParallax() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Disable parallax if reduced motion is preferred
    
    // Check if device is touch (mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return; // Disable parallax on touch devices for performance
    
    const parallaxElements = document.querySelectorAll('[data-parallax-layer]');
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    const activeElements = new Set();
    
    // Intersection Observer to track visible elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activeElements.add(entry.target);
            } else {
                activeElements.delete(entry.target);
            }
        });
    }, {
        rootMargin: '100px'
    });
    
    // Observe all parallax elements
    parallaxElements.forEach(el => observer.observe(el));
    
    // Update parallax positions
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        activeElements.forEach(element => {
            const speed = parseFloat(element.dataset.parallaxLayer) || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }
    
    // Scroll event with rAF throttling
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
}
