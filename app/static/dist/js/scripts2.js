/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});

/* ============================================================
   Site enhancements (appended 2026-07): dark mode, i18n toggle,
   stat count-up. Shared across scripts.js / scripts2.js.
   ============================================================ */
(function () {
    var NAV = { '首頁':'Home', '履歷':'Resume', '實習經驗':'Internship', '特殊經歷':'Honors', '專案':'Projects', '聯絡我':'Contact' };

    function leaf(el) { while (el.firstElementChild) el = el.firstElementChild; return el; }

    function initEnhance() {
        var body = document.body;

        /* ---- Dark mode ---- */
        function applyTheme(t) {
            body.classList.toggle('dark-mode', t === 'dark');
            var i = document.querySelector('#themeToggle i');
            if (i) i.className = (t === 'dark') ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        }
        applyTheme(localStorage.getItem('theme') || 'light');
        var tb = document.getElementById('themeToggle');
        if (tb) tb.addEventListener('click', function () {
            var n = body.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', n); applyTheme(n);
        });

        /* ---- Language toggle (zh <-> en) ---- */
        function applyLang(lang) {
            document.querySelectorAll('.navbar-nav .nav-link').forEach(function (a) {
                var lf = leaf(a);
                var zh = lf.getAttribute('data-navzh') || lf.textContent.trim();
                lf.setAttribute('data-navzh', zh);
                if (NAV[zh] !== undefined) lf.textContent = (lang === 'en') ? NAV[zh] : zh;
            });
            document.querySelectorAll('[data-en]').forEach(function (el) {
                if (!el.hasAttribute('data-zh')) el.setAttribute('data-zh', el.innerHTML);
                el.innerHTML = (lang === 'en') ? el.getAttribute('data-en') : el.getAttribute('data-zh');
            });
            document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-TW');
            var lb = document.getElementById('langToggle');
            if (lb) lb.textContent = (lang === 'en') ? '中文' : 'EN';
        }
        applyLang(localStorage.getItem('lang') || 'zh');
        var lgb = document.getElementById('langToggle');
        if (lgb) lgb.addEventListener('click', function () {
            var n = ((localStorage.getItem('lang') || 'zh') === 'en') ? 'zh' : 'en';
            localStorage.setItem('lang', n); applyLang(n);
        });

        /* ---- Stat count-up (homepage) ---- */
        var nums = document.querySelectorAll('.stat-num[data-target]');
        function run(el) {
            var t = parseFloat(el.getAttribute('data-target'));
            var d = parseInt(el.getAttribute('data-decimals') || '0', 10);
            var suf = el.getAttribute('data-suffix') || '';
            var dur = 1200, s = null;
            function step(ts) {
                if (!s) s = ts;
                var p = Math.min((ts - s) / dur, 1);
                el.textContent = (t * p).toFixed(d) + suf;
                if (p < 1) requestAnimationFrame(step); else el.textContent = t.toFixed(d) + suf;
            }
            requestAnimationFrame(step);
        }
        if (nums.length) {
            if ('IntersectionObserver' in window) {
                var io = new IntersectionObserver(function (es) {
                    es.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
                }, { threshold: 0.4 });
                nums.forEach(function (n) { io.observe(n); });
            } else nums.forEach(run);
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initEnhance);
    else initEnhance();
})();
