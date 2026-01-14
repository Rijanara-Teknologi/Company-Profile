document.addEventListener('DOMContentLoaded', () => {
    // Reveal on Scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Navbar Scrolled State
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Active Link Highlighting
    const sections = document.querySelectorAll('section, header, footer');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // FAQ Accordion
    const accordions = document.querySelectorAll('.accordion-header');

    accordions.forEach(acc => {
        acc.addEventListener('click', function () {
            // Toggle current
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);

            const content = this.nextElementSibling;

            if (!expanded) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }

            // Optional: Close others
            accordions.forEach(other => {
                if (other !== this && other.getAttribute('aria-expanded') === 'true') {
                    other.setAttribute('aria-expanded', 'false');
                    other.nextElementSibling.style.maxHeight = null;
                }
            });
        });
    });

    // Toast Helper
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show'; // Reset classes

        if (type === 'error') {
            toast.classList.add('error');
        }

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // Contact Form & Toast
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation check (already handled by 'required' attribute, but just in case)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                const emailValue = email.trim().toLowerCase();
                const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

                // Validate email domain using Regex
                if (!gmailRegex.test(emailValue)) {
                    // Show error UI
                    const emailInput = document.getElementById('email');
                    emailInput.classList.add('error');
                    emailInput.focus();

                    // Show error toast
                    showToast('Mohon gunakan email Gmail (@gmail.com) yang valid', 'error');
                    return;
                }

                // Remove error class if valid
                document.getElementById('email').classList.remove('error');

                // Show success toast
                showToast('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');

                // Reset form
                contactForm.reset();
            }
        });
    }

    // Smooth Scroll for anchor links (safeguard for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for sticky navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
