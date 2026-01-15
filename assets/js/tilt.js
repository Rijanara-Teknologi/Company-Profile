/**
 * 3D Tilt Effect Module
 * Implements 3D tilt hover effect on cards
 * Only active on desktop (pointer: fine) and respects reduced-motion preference
 */

export function initTilt() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    // Check if device has fine pointer (desktop mouse)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;
    
    const tiltElements = document.querySelectorAll('[data-tilt]');
    if (tiltElements.length === 0) return;
    
    tiltElements.forEach(element => {
        let ticking = false;
        let currentX = 0;
        let currentY = 0;
        
        // Create glare element if it doesn't exist
        let glareElement = element.querySelector('[data-tilt-glare]');
        if (!glareElement) {
            glareElement = document.createElement('div');
            glareElement.setAttribute('data-tilt-glare', '');
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(glareElement);
        }
        
        function updateTilt() {
            const maxTilt = 10; // Maximum tilt angle in degrees
            const rotateY = (currentX / element.offsetWidth - 0.5) * maxTilt * 2;
            const rotateX = -(currentY / element.offsetHeight - 0.5) * maxTilt * 2;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Update glare position
            const glareX = (currentX / element.offsetWidth) * 100;
            const glareY = (currentY / element.offsetHeight) * 100;
            glareElement.style.setProperty('--x', `${glareX}%`);
            glareElement.style.setProperty('--y', `${glareY}%`);
            
            ticking = false;
        }
        
        function onMouseMove(e) {
            const rect = element.getBoundingClientRect();
            currentX = e.clientX - rect.left;
            currentY = e.clientY - rect.top;
            
            if (!ticking) {
                requestAnimationFrame(updateTilt);
                ticking = true;
            }
        }
        
        function onMouseLeave() {
            element.style.transform = '';
            if (glareElement) {
                glareElement.style.opacity = '0';
            }
        }
        
        element.addEventListener('mousemove', onMouseMove);
        element.addEventListener('mouseleave', onMouseLeave);
    });
}
