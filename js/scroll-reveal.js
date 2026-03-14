/* ================================================
   scroll-reveal.js — 스크롤 시 요소 페이드인 애니메이션
   .reveal 클래스가 붙은 요소가 뷰포트에 들어오면
   .visible 클래스를 추가해 애니메이션 실행
   ================================================ */

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
