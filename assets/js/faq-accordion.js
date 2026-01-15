/**
 * FAQ Accordion Module
 * Vanilla JS implementation with smooth height transitions
 * Features: Event delegation, accessibility, reduced-motion support
 */

(function() {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initialize FAQ accordion
    function initFAQ() {
        const faqContainer = document.querySelector('[data-faq]');
        
        if (!faqContainer) {
            return;
        }
        
        // Event delegation: single listener on container
        faqContainer.addEventListener('click', handleFAQClick);
    }
    
    // Handle clicks on FAQ triggers
    function handleFAQClick(e) {
        // Find the trigger button (even if user clicks on icon/text inside)
        const trigger = e.target.closest('[data-faq-trigger]');
        
        if (!trigger) return;
        
        e.preventDefault();
        
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);
        
        if (!panel) {
            console.warn('[FAQ] Panel not found:', panelId);
            return;
        }
        
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            closePanel(trigger, panel);
        } else {
            // Optional: Close all other panels (accordion mode)
            closeAllPanels();
            openPanel(trigger, panel);
        }
    }
    
    // Open a panel with animation
    function openPanel(trigger, panel) {
        const icon = trigger.querySelector('[data-faq-icon]');
        
        // Update ARIA
        trigger.setAttribute('aria-expanded', 'true');
        
        // Remove hidden attribute first
        panel.hidden = false;
        
        // Rotate icon
        if (icon) {
            icon.style.transform = 'rotate(180deg)';
        }
        
        if (prefersReducedMotion) {
            // No animation for reduced motion
            panel.style.height = 'auto';
        } else {
            // Animate height from 0 to scrollHeight
            const height = panel.scrollHeight;
            panel.style.height = '0px';
            
            // Force reflow
            panel.offsetHeight;
            
            // Add transition
            panel.style.transition = 'height 0.3s ease-out';
            
            // Set target height
            panel.style.height = height + 'px';
            
            // After transition, set to auto for responsive behavior
            const handleTransitionEnd = () => {
                if (trigger.getAttribute('aria-expanded') === 'true') {
                    panel.style.height = 'auto';
                }
                panel.removeEventListener('transitionend', handleTransitionEnd);
            };
            
            panel.addEventListener('transitionend', handleTransitionEnd);
        }
    }
    
    // Close a panel with animation
    function closePanel(trigger, panel) {
        const icon = trigger.querySelector('[data-faq-icon]');
        
        // Update ARIA
        trigger.setAttribute('aria-expanded', 'false');
        
        // Rotate icon back
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
        
        if (prefersReducedMotion) {
            // No animation for reduced motion
            panel.hidden = true;
            panel.style.height = '';
        } else {
            // Get current height
            const height = panel.scrollHeight;
            panel.style.height = height + 'px';
            
            // Force reflow
            panel.offsetHeight;
            
            // Add transition
            panel.style.transition = 'height 0.3s ease-out';
            
            // Animate to 0
            panel.style.height = '0px';
            
            // After transition, hide the panel
            const handleTransitionEnd = () => {
                if (trigger.getAttribute('aria-expanded') === 'false') {
                    panel.hidden = true;
                    panel.style.height = '';
                }
                panel.removeEventListener('transitionend', handleTransitionEnd);
            };
            
            panel.addEventListener('transitionend', handleTransitionEnd);
        }
    }
    
    // Close all panels (accordion mode)
    function closeAllPanels() {
        const allTriggers = document.querySelectorAll('[data-faq-trigger]');
        
        allTriggers.forEach(trigger => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                const panelId = trigger.getAttribute('aria-controls');
                const panel = document.getElementById(panelId);
                if (panel) {
                    closePanel(trigger, panel);
                }
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFAQ);
    } else {
        initFAQ();
    }
})();
