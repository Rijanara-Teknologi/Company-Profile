/**
 * Scroll Reveal Module
 * Reveals elements on scroll using Intersection Observer
 * Respects reduced-motion preference
 */

export function initReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length === 0) return;
    
    // If reduced motion, show all elements immediately
    if (prefersReducedMotion) {
        revealElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Apply delay if specified
        const delay = el.dataset.revealDelay;
        if (delay) {
            el.style.transitionDelay = `${delay}ms`;
        }
        
        observer.observe(el);
    });
    
    // Add CSS for visible state
    const style = document.createElement('style');
    style.textContent = `
        [data-reveal].is-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}
