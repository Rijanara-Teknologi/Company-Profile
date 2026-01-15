/**
 * Main Application Module
 * Initializes all interactive features
 */

import { initSmoothScroll } from './smooth-scroll.js';
import { initParallax } from './parallax.js';
import { initTilt } from './tilt.js';
import { initReveal } from './reveal.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initSmoothScroll();
    initParallax();
    initTilt();
    initReveal();
    
    // Navbar scroll state
    const navbar = document.querySelector('[data-navbar]');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }
    
    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('[data-mobile-menu-btn]');
    const navLinks = document.querySelector('[data-nav-links]');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });
        
        // Close menu when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Active Link Highlighting
    const sections = document.querySelectorAll('section, header, footer');
    const navItems = document.querySelectorAll('[data-nav-link]');
    
    if (navItems.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                const href = item.getAttribute('href');
                if (href && href.includes(current) && current) {
                    item.classList.add('active');
                }
            });
        }, { passive: true });
    }
    
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                const emailValue = email.trim().toLowerCase();
                const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
                
                if (!gmailRegex.test(emailValue)) {
                    const emailInput = document.getElementById('email');
                    emailInput.classList.add('border-red-500');
                    emailInput.focus();
                    showToast('Mohon gunakan email Gmail (@gmail.com) yang valid', 'error');
                    
                    setTimeout(() => {
                        emailInput.classList.remove('border-red-500');
                    }, 3000);
                    return;
                }
                
                // Netlify form submission
                const formData = new FormData(contactForm);
                
                fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString()
                })
                .then(() => {
                    showToast('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error(error);
                    showToast('Gagal mengirim pesan. Silakan coba lagi.', 'error');
                });
            }
        });
    }
    
    // Toast Helper Function
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.className = 'toast show';
        
        if (type === 'error') {
            toast.classList.add('error');
        }
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
