document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal on Scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Initialize animations
    document.querySelectorAll('.animate-fade-in-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu-items');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    }

    // 3. Navbar Scroll & Active Link
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section, header#home');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Navbar Shadow
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-2xl', 'bg-slate-900/95');
            navbar.classList.remove('bg-slate-900/80');
        } else {
            navbar.classList.remove('shadow-2xl', 'bg-slate-900/95');
            navbar.classList.add('bg-slate-900/80');
        }

        // Active State
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-white', 'after:w-full');
            link.classList.add('text-gray-400');

            // Check if href matches current section
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-400');
                link.classList.add('text-white', 'after:w-full');
            }
        });
    });

    // 4. Toast Notification Logic
    function showToast(title, message) {
        const toast = document.getElementById('toast');
        if (!toast) return;

        const titleEl = toast.querySelector('h6');
        const msgEl = toast.querySelector('p');

        if (titleEl) titleEl.textContent = title;
        if (msgEl) msgEl.textContent = message;

        // Show
        toast.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');

        // Hide after 3s
        setTimeout(() => {
            toast.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
        }, 3000);
    }

    // 5. Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation
            const email = document.getElementById('email').value;
            const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

            if (!gmailRegex.test(email)) {
                showToast('Error', 'Mohon gunakan email @gmail.com yang valid');
                document.getElementById('email').focus();
                return;
            }

            // Simulate form submission
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Mengirim...';
            btn.disabled = true;

            setTimeout(() => {
                showToast('Pesan Terkirim!', 'Kami akan segera menghubungi Anda.');
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
            }, 1000);
        });
    }

    // 6. Smooth Scroll Offset (for anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});