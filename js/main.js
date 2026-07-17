/* ============================================================
   THERATOOLS — main.js
   All client-side interactions.
   ============================================================ */

(() => {
    'use strict';

    /* ----------------------------------------------------------------
     * 0. Utilities
     * ---------------------------------------------------------------- */
    const $  = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    const onReady = (fn) => {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn, { once: true });
    };

    const trapFocus = (container) => {
        const focusable = $$(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            container
        ).filter((el) => el.offsetParent !== null || el === document.activeElement);
        if (focusable.length === 0) return () => {};
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];

        const handler = (e) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        container.addEventListener('keydown', handler);
        return () => container.removeEventListener('keydown', handler);
    };

    const prefersReducedMotion = () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ----------------------------------------------------------------
     * 1. Sticky nav: scrolled state + scroll-spy
     * ---------------------------------------------------------------- */
    const initNav = () => {
        const nav = $('#siteNav');
        if (!nav) return;

        const onScroll = () => {
            nav.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        const links = $$('.nav__link');
        const sections = links
            .map((l) => document.querySelector(l.getAttribute('href')))
            .filter(Boolean);
        if (sections.length === 0) return;

        const setActive = (id) => {
            links.forEach((l) => {
                const isActive = l.getAttribute('href') === '#' + id;
                l.classList.toggle('is-active', isActive);
            });
        };

        const spy = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );
        sections.forEach((s) => spy.observe(s));
    };

    /* ----------------------------------------------------------------
     * 2. Mobile menu drawer
     * ---------------------------------------------------------------- */
    const initMobileMenu = () => {
        const btn   = $('#menuBtn');
        const menu  = $('#mobileMenu');
        if (!btn || !menu) return;

        const open = () => {
            menu.hidden = false;
            requestAnimationFrame(() => {
                menu.dataset.open = 'true';
                btn.setAttribute('aria-expanded', 'true');
                btn.setAttribute('aria-label', '关闭菜单');
                document.body.classList.add('is-locked');
                const firstLink = $('.mobile-menu__link', menu);
                if (firstLink) firstLink.focus();
            });
        };
        const close = () => {
            menu.dataset.open = 'false';
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', '打开菜单');
            document.body.classList.remove('is-locked');
            setTimeout(() => { menu.hidden = true; }, 250);
            btn.focus();
        };

        btn.addEventListener('click', () => {
            if (btn.getAttribute('aria-expanded') === 'true') close();
            else open();
        });

        menu.addEventListener('click', (e) => {
            if (e.target.closest('a')) close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
                close();
            }
        });

        const observer = new MutationObserver(() => {
            if (btn.getAttribute('aria-expanded') === 'true') {
                trapFocus(menu);
            }
        });
        observer.observe(btn, { attributes: true, attributeFilter: ['aria-expanded'] });
    };

    /* ----------------------------------------------------------------
     * 3. Scroll reveal
     * ---------------------------------------------------------------- */
    const initReveal = () => {
        const items = $$('.reveal');
        if (items.length === 0 || prefersReducedMotion()) {
            items.forEach((el) => el.classList.add('is-in'));
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    const delay = parseInt(el.dataset.revealDelay || '0', 10);
                    setTimeout(() => el.classList.add('is-in'), delay);
                    io.unobserve(el);
                });
            },
            { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
        );
        items.forEach((el) => io.observe(el));
    };

    /* ----------------------------------------------------------------
     * 4. Init
     * ---------------------------------------------------------------- */
    onReady(() => {
        initNav();
        initMobileMenu();
        initReveal();
    });
})();
