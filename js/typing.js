/* ================================================
   typing.js — 히어로 타이핑 애니메이션
   ================================================ */

(function () {
    var text = 'SEO BO MIN';
    var speed = 110;
    var startDelay = 600;
    var cursorHideDelay = 2500;

    function run() {
        var el = document.getElementById('typing-text');
        if (!el) return;

        var cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        el.appendChild(cursor);

        var i = 0;
        setTimeout(function () {
            var interval = setInterval(function () {
                if (i < text.length) {
                    cursor.insertAdjacentText('beforebegin', text[i]);
                    i++;
                } else {
                    clearInterval(interval);
                    setTimeout(function () {
                        cursor.style.display = 'none';
                    }, cursorHideDelay);
                }
            }, speed);
        }, startDelay);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
