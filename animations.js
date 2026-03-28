/* ═══════════════════════════════════════════════════════════════
   NIETCode — CRAZY ANIMATIONS ENGINE (JavaScript)
   Include this file at the end of <body> in every page
   AFTER animations.css is linked.
   ═══════════════════════════════════════════════════════════════ */

(function() {
    'use strict';

    // ═══════════ 1. PARTICLE SYSTEM ═══════════
    function initParticles() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        document.body.prepend(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];
        const NUM_PARTICLES = 50;
        const COLORS = [
            'rgba(255,161,22,0.4)',
            'rgba(77,159,255,0.3)',
            'rgba(167,139,250,0.3)',
            'rgba(0,212,170,0.3)',
            'rgba(255,206,86,0.3)'
        ];

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // Create particles
        for (let i = 0; i < NUM_PARTICLES; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                r: Math.random() * 2 + 1,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                pulse: Math.random() * Math.PI * 2
            });
        }

        let mouseX = -1000, mouseY = -1000;
        document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
        document.addEventListener('mouseleave', () => { mouseX = -1000; mouseY = -1000; });

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.pulse += 0.02;
                const pulseScale = 1 + Math.sin(p.pulse) * 0.3;

                // Mouse repulsion
                const dx = p.x - mouseX;
                const dy = p.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const force = (150 - dist) / 150 * 0.8;
                    p.vx += (dx / dist) * force;
                    p.vy += (dy / dist) * force;
                }

                // Dampen velocity
                p.vx *= 0.98;
                p.vy *= 0.98;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * pulseScale, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const d = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255,161,22,${(1 - d / 120) * 0.12})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(draw);
        }
        draw();
    }

    // ═══════════ 2. CUSTOM CURSOR ═══════════
    function initCursor() {
        // Don't init on touch devices
        if ('ontouchstart' in window) return;

        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        const ring = document.createElement('div');
        ring.className = 'cursor-ring';
        document.body.appendChild(dot);
        document.body.appendChild(ring);

        let cx = -100, cy = -100, dx = -100, dy = -100;

        document.addEventListener('mousemove', e => {
            cx = e.clientX;
            cy = e.clientY;
        });

        // Expand ring on interactive elements
        document.addEventListener('mouseover', e => {
            const t = e.target.closest('a, button, input, select, .topic-card, .feature-card, .stat-card, .scard, .lb-row, .solve-btn, .tab-btn, .auth-tab, .topic-chip');
            if (t) ring.classList.add('hover-active');
        });
        document.addEventListener('mouseout', e => {
            ring.classList.remove('hover-active');
        });

        function animate() {
            // Dot follows instantly
            dot.style.left = cx + 'px';
            dot.style.top = cy + 'px';

            // Ring follows with lag
            dx += (cx - dx) * 0.12;
            dy += (cy - dy) * 0.12;
            ring.style.left = dx + 'px';
            ring.style.top = dy + 'px';

            requestAnimationFrame(animate);
        }
        animate();
    }

    // ═══════════ 3. SCROLL PROGRESS BAR ═══════════
    function initScrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            bar.style.width = progress + '%';
        });
    }

    // ═══════════ 4. NAVBAR SCROLL STATE ═══════════
    function initNavScroll() {
        window.addEventListener('scroll', () => {
            document.body.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ═══════════ 5. ENHANCED SCROLL REVEAL ═══════════
    function initScrollReveal() {
        const animClasses = ['anim-enter-up', 'anim-enter-left', 'anim-enter-right', 'anim-enter-scale', 'anim-flip-in'];

        // Auto-add animation classes to common elements
        const selectors = {
            '.feature-card': 'anim-enter-up',
            '.stat-card, .scard': 'anim-enter-scale',
            '.topic-card': 'anim-enter-up',
            '.step': 'anim-enter-up',
            '.lb-table': 'anim-enter-left',
            '.lb-text-side': 'anim-enter-right',
            '.card': 'anim-enter-up',
            '.arch-card': 'anim-flip-in',
            '.section-card': 'anim-enter-up',
            '.schema-wrap': 'anim-enter-up',
            '.p-header': 'anim-enter-scale',
        };

        Object.entries(selectors).forEach(([sel, cls]) => {
            document.querySelectorAll(sel).forEach((el, i) => {
                if (!el.classList.contains('visible') && !animClasses.some(c => el.classList.contains(c))) {
                    el.classList.add(cls);
                    // Add stagger delay
                    const delay = Math.min(i, 8);
                    el.classList.add('anim-delay-' + (delay % 8 + 1));
                }
            });
        });

        // Observe all animated elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        animClasses.forEach(cls => {
            document.querySelectorAll('.' + cls).forEach(el => observer.observe(el));
        });

        // Also observe existing .reveal elements
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
    }

    // ═══════════ 6. RIPPLE CLICK EFFECT ═══════════
    function initRipple() {
        document.addEventListener('click', e => {
            const btn = e.target.closest('button, .btn-hero-primary, .btn-hero-secondary, .btn-cta, .btn-ghost, .gate-btn-primary, .solve-btn, .topic-chip');
            if (!btn) return;

            btn.classList.add('anim-ripple');
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    }

    // ═══════════ 7. 3D TILT ON CARDS ═══════════
    function initTilt() {
        const cards = document.querySelectorAll('.feature-card, .code-window, .stat-card, .scard, .arch-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ═══════════ 8. SPOTLIGHT FOLLOW EFFECT ═══════════
    function initSpotlight() {
        document.querySelectorAll('.feature-card, .topic-card, .scard, .arch-card').forEach(el => {
            el.classList.add('anim-spotlight');
            el.addEventListener('mousemove', e => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const after = el.querySelector('::after') || el;
                el.style.setProperty('--spotlight-x', x + 'px');
                el.style.setProperty('--spotlight-y', y + 'px');
                // Use CSS custom properties for positioning
                if (el.style.getPropertyValue) {
                    el.style.background = el.style.background; // Force repaint
                }
            });
        });
    }

    // ═══════════ 9. TEXT SCRAMBLE EFFECT ═══════════
    function initTextScramble() {
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        class TextScramble {
            constructor(el) {
                this.el = el;
                this.chars = chars;
                this.update = this.update.bind(this);
            }
            setText(newText) {
                const oldText = this.el.textContent;
                const length = Math.max(oldText.length, newText.length);
                const promise = new Promise(resolve => this.resolve = resolve);
                this.queue = [];
                for (let i = 0; i < length; i++) {
                    const from = oldText[i] || '';
                    const to = newText[i] || '';
                    const start = Math.floor(Math.random() * 20);
                    const end = start + Math.floor(Math.random() * 20);
                    this.queue.push({ from, to, start, end });
                }
                cancelAnimationFrame(this.frameRequest);
                this.frame = 0;
                this.update();
                return promise;
            }
            update() {
                let output = '';
                let complete = 0;
                for (let i = 0; i < this.queue.length; i++) {
                    let { from, to, start, end, char } = this.queue[i];
                    if (this.frame >= end) {
                        complete++;
                        output += to;
                    } else if (this.frame >= start) {
                        if (!char || Math.random() < 0.28) {
                            char = this.chars[Math.floor(Math.random() * this.chars.length)];
                            this.queue[i].char = char;
                        }
                        output += `<span style="color:var(--orange);opacity:0.7">${char}</span>`;
                    } else {
                        output += from;
                    }
                }
                this.el.innerHTML = output;
                if (complete === this.queue.length) {
                    this.resolve();
                } else {
                    this.frameRequest = requestAnimationFrame(this.update);
                    this.frame++;
                }
            }
        }

        // Apply to hero titles on scroll into view
        const heroTitles = document.querySelectorAll('.hero-title .line1, .hero-title .line2');
        if (heroTitles.length) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const scramble = new TextScramble(entry.target);
                        const originalText = entry.target.textContent;
                        scramble.setText(originalText);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            heroTitles.forEach(el => observer.observe(el));
        }
    }

    // ═══════════ 10. COUNTER GLOW EFFECT ═══════════
    function initCounterGlow() {
        document.querySelectorAll('[data-target]').forEach(el => {
            const obs = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => el.classList.add('anim-count-glow', 'counted'), 1800);
                        obs.unobserve(el);
                    }
                });
            }, { threshold: 0.5 });
            obs.observe(el);
        });
    }

    // ═══════════ 11. PARALLAX ON SCROLL ═══════════
    function initParallax() {
        const orbs = document.querySelectorAll('.orb');
        const hero = document.querySelector('.hero, .place-hero');
        if (!hero && !orbs.length) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            orbs.forEach((orb, i) => {
                const speed = 0.3 + (i * 0.1);
                orb.style.transform = `translateY(${scrollY * speed * -0.3}px)`;
            });
            if (hero) {
                hero.style.backgroundPositionY = scrollY * 0.2 + 'px';
            }
        });
    }

    // ═══════════ 12. MAGNETIC BUTTONS ═══════════
    function initMagnetic() {
        const btns = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary, .btn-cta, .gate-btn-primary');
        btns.forEach(btn => {
            btn.addEventListener('mousemove', e => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.03)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ═══════════ 13. PAGE TRANSITION SYSTEM ═══════════
    function initPageTransitions() {
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="sweep sweep-1"></div>
            <div class="sweep sweep-2"></div>
            <div class="sweep sweep-3"></div>
            <span class="trans-brand">NIETCode</span>
        `;
        document.body.appendChild(overlay);

        // On page load — play the ENTER (reveal) animation
        overlay.classList.add('enter');
        document.body.classList.add('page-entered');
        // Clean up after animation
        setTimeout(() => {
            overlay.classList.remove('enter');
        }, 800);

        // Intercept all internal navigation links
        document.addEventListener('click', e => {
            const link = e.target.closest('a[href]');
            if (!link) return;

            const href = link.getAttribute('href');
            // Skip external links, anchors, javascript:, and # links
            if (!href || href.startsWith('#') || href.startsWith('javascript') ||
                href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') ||
                link.target === '_blank') return;

            // Skip if it's the same page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            if (href === currentPage) return;

            e.preventDefault();

            // Play EXIT animation (covers the page)
            overlay.classList.remove('enter');
            overlay.classList.add('exit');

            // Navigate after the animation completes
            setTimeout(() => {
                window.location.href = href;
            }, 550);
        });
    }

    // ═══════════ 14. WORD-BY-WORD TEXT REVEAL ═══════════
    function initWordReveal() {
        const selectors = '.section-title, .cta-title, .gate-title, .bp-header h1, .list-header h1';
        document.querySelectorAll(selectors).forEach(el => {
            // Skip if already processed
            if (el.querySelector('.word-anim')) return;

            const text = el.textContent.trim();
            if (!text) return;

            const words = text.split(/\s+/);
            el.innerHTML = words.map((word, i) =>
                `<span class="word-anim" style="animation-delay: ${i * 0.1}s">${word}</span>`
            ).join(' ');
        });
    }

    // ═══════════ 15. SECTION TAG CHARACTER STAGGER ═══════════
    function initCharStagger() {
        document.querySelectorAll('.section-tag').forEach(tag => {
            // Skip if already processed
            if (tag.querySelector('.char-anim')) return;

            const text = tag.textContent.trim();
            if (!text) return;

            tag.innerHTML = text.split('').map((char, i) => {
                if (char === ' ') return ' ';
                return `<span class="char-anim" style="animation-delay: ${i * 0.04}s">${char}</span>`;
            }).join('');
        });
    }

    // ═══════════ INIT ALL ═══════════
    function init() {
        initPageTransitions();
        initParticles();
        initCursor();
        initScrollProgress();
        initNavScroll();
        initRipple();
        initTilt();
        initTextScramble();
        initCounterGlow();
        initParallax();
        initMagnetic();
        initWordReveal();
        initCharStagger();

        // Delay scroll reveal slightly so DOM is ready
        requestAnimationFrame(() => {
            initScrollReveal();
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

