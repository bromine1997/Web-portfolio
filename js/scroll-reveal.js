/* ================================================
   scroll-reveal.js — 스크롤 애니메이션 + 네비게이션 활성화
   ================================================ */

/* ── 스크롤 리빌 ── */
(function () {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });
})();

/* ── 네비게이션 활성 섹션 표시 ── */
(function () {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('nav ul li a');

    var navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.1, rootMargin: '-60px 0px -45% 0px' });

    sections.forEach(function (section) {
        navObserver.observe(section);
    });
})();
