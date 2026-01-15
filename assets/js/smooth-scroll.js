/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links with reduced-motion support
 */

export function initSmoothScroll() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Add smooth scroll behavior to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = 80; // Navbar height offset
                    const targetPosition = targetElement.offsetTop - offset;
                    
                    if (prefersReducedMotion) {
                        // Instant scroll for reduced motion
                        window.scrollTo(0, targetPosition);
                    } else {
                        // Smooth scroll
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
}
