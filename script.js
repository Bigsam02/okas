(function() {
    // ---------- DATA (static) ----------
    const projects = [
        { id: 1, title: 'Luxury Garden Oasis', category: 'horticulture', location: 'Ikoyi, Lagos', image: 'images/project_1.jpg', desc: 'Complete garden redesign with water feature.' },
        { id: 2, title: 'Modern Driveway Stamping', category: 'floor-stamping', location: 'Lekki, Lagos', image: 'images/project_2.jpg', desc: 'Decorative concrete stamping 200m².' },
        { id: 3, title: '3D Ocean Floor', category: '3d-floor', location: 'Abuja', image: 'images/project_3.jpg', desc: 'Stunning 3D epoxy floor.' },
        { id: 5, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_4.jpg', desc: 'Full campus landscaping.' },
        { id: 6, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_5.jpg', desc: 'Full campus landscaping.' },
        { id: 7, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_6.jpg', desc: 'Full campus landscaping.' },
        { id: 8, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_7.jpg', desc: 'Full campus landscaping.' },
        { id: 9, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_8.jpg', desc: 'Full campus landscaping.' },
        { id: 10, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_9.jpg', desc: 'Full campus landscaping.' },
        { id: 11, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_10.jpg', desc: 'Full campus landscaping.' },
        { id: 12, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_11.jpg', desc: 'Full campus landscaping.' },
        { id: 13, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_12.jpg', desc: 'Full campus landscaping.' },
        { id: 14, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_13.jpg', desc: 'Full campus landscaping.' },
        { id: 15, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_14.jpg', desc: 'Full campus landscaping.' },
        { id: 16, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_15.jpg', desc: 'Full campus landscaping.' },
        { id: 17, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_16.jpg', desc: 'Full campus landscaping.' },
        { id: 18, title: 'Corporate Landscaping', category: 'landscaping', location: 'Victoria Island', image: 'images/project_17.jpg', desc: 'Full campus landscaping.' },
    ];

    const testimonials = [
        { id: 1, name: 'Chioma E.', role: 'Homeowner, Lagos', stars: 5, quote: 'OKA\'S transformed our backyard into a paradise!', avatar: 'images/avatar-chioma.jpg' },
        { id: 2, name: 'Mr. Adebayo', role: 'Business Owner, Abuja', stars: 5, quote: 'The 3D floor wows every visitor.', avatar: 'images/avatar-adebayo.jpg' },
        { id: 3, name: 'Sarah O.', role: 'Designer', stars: 4, quote: 'Top-tier floor stamping.', avatar: 'images/avatar-sarah.jpg' },
    ];

    // ---------- NAVIGATION ----------
    let currentSection = 'home';

    function navigateTo(sectionName) {
        currentSection = sectionName;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        const target = document.getElementById('section-' + sectionName);
        if (target) target.classList.add('active');

        document.querySelectorAll('.nav-links [data-nav]').forEach(el => {
            el.classList.remove('active');
            el.removeAttribute('aria-current');
        });
        const activeNav = document.querySelector(`.nav-links [data-nav="${sectionName}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
            activeNav.setAttribute('aria-current', 'page');
        }

        const navLinks = document.getElementById('navLinks');
        const hamburger = document.getElementById('hamburger');
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');

        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (sectionName === 'projects') renderGallery();
        if (sectionName === 'testimonials') renderTestimonials();
    }
    window.navigateTo = navigateTo;

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
    });

    // Hero slideshow
    let slideIndex = 0;
    const slides = document.querySelectorAll('#hero .hero-slide');
    setInterval(() => {
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('active');
    }, 4500);

    // Before/After sliders
    function initBASlider(wrapperId) {
        const wrapper = document.getElementById(wrapperId);
        if (!wrapper) return;
        const slider = wrapper.querySelector('.ba-slider');
        const afterImg = slider.querySelector('.img-after');
        const handle = slider.querySelector('.ba-handle');
        let dragging = false;

        function update(x) {
            const rect = slider.getBoundingClientRect();
            let pct = ((x - rect.left) / rect.width) * 100;
            pct = Math.max(0, Math.min(100, pct));
            afterImg.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
            handle.style.left = pct + '%';
        }
        function start(e) { dragging = true; e.preventDefault(); }
        function move(e) { if (dragging) update(e.touches ? e.touches[0].clientX : e.clientX); }
        function stop() { dragging = false; }

        handle.addEventListener('mousedown', start);
        slider.addEventListener('mousedown', (e) => { dragging = true; update(e.clientX); });
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', stop);
        handle.addEventListener('touchstart', start);
        slider.addEventListener('touchstart', (e) => { dragging = true; update(e.touches[0].clientX); });
        window.addEventListener('touchmove', move);
        window.addEventListener('touchend', stop);
    }
    initBASlider('homeBASlider');
    initBASlider('projectBASlider');

    // FAQ toggle
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('open'));
    });

    // ---------- GALLERY RENDERING (with lightbox) ----------
    function renderGallery(filter = 'all') {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;
        const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
        grid.innerHTML = filtered.map(p => `
            <div class="gallery-item" data-full="${p.image}" data-title="${p.title}">
                <img src="${p.image}" alt="${p.title}" loading="lazy" 
                     onerror="console.warn('Image failed:', this.src); this.src='images/fallback.jpg';">
                <div class="gallery-info"><h4>${p.title}</h4><small>${p.location}</small></div>
            </div>`).join('');
    }

    document.getElementById('galleryFilters').addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelectorAll('#galleryFilters button').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderGallery(e.target.dataset.filter);
        }
    });

    // Lightbox functionality (event delegation on gallery grid)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('show');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    // Open on gallery item click
    document.getElementById('galleryGrid').addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (!galleryItem) return;
        const src = galleryItem.dataset.full;
        const title = galleryItem.dataset.title;
        if (src) openLightbox(src, title);
    });

    // Close events
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        // Close if clicking on the dark background (not the image itself)
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });

    // Testimonials rendering
    function renderTestimonials() {
        const grid = document.getElementById('testimonialGrid');
        if (!grid) return;
        grid.innerHTML = testimonials.map(t => `
            <div class="testimonial-card">
                <div class="stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>
                <p class="quote">"${t.quote}"</p>
                <div class="author">
                    <img src="${t.avatar || 'images/fallback.jpg'}" alt="${t.name}" class="author-avatar" loading="lazy" 
                         onerror="this.src='images/fallback.jpg';">
                    <div><div class="author-name">${t.name}</div><div class="author-role">${t.role}</div></div>
                </div>
            </div>`).join('');
    }

    // Contact form
    window.handleContactSubmit = function(e) {
        e.preventDefault();
        const btnText = document.getElementById('submitBtnText');
        const btnLoader = document.getElementById('submitBtnLoader');
        const form = e.target;
        if (form.querySelector('[name="_honey"]').value) {
            showToast('❌ Spam detected');
            return false;
        }
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-flex';
        setTimeout(() => {
            btnText.style.display = 'inline-flex';
            btnLoader.style.display = 'none';
            showToast('✅ Thank you! We will contact you within 24 hours.');
            form.reset();
        }, 1500);
        return false;
    };

    // Toast
    function showToast(msg) {
        const c = document.getElementById('toastContainer');
        const t = document.createElement('div');
        t.className = 'toast';
        t.textContent = msg;
        c.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }

    // Init
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    renderGallery();
    renderTestimonials();
})();