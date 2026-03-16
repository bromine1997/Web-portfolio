/* ================================================
   typing.js — 히어로 스크램블 텍스트 애니메이션
   랜덤 문자가 섞이다가 올바른 글자로 해독되는 효과
   ================================================ */

(function () {
    var TARGET      = 'SEO BO MIN';
    var CHARS       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&';
    var START_DELAY = 500;    // 시작 전 대기 (ms)
    var STEP_MS     = 55;     // 전체 루프 간격
    var SCRAMBLE_CYCLES = 8;  // 각 글자가 해독되기 전 노이즈 횟수

    function randomChar() {
        return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function run() {
        var el = document.getElementById('typing-text');
        if (!el) return;

        var len      = TARGET.length;
        var revealed = new Array(len).fill(false);  // 확정된 글자 여부
        var counters = new Array(len).fill(0);       // 각 글자의 노이즈 카운터
        var active   = -1;   // 현재 해독 중인 글자 인덱스

        function render() {
            var result = '';
            for (var i = 0; i < len; i++) {
                if (TARGET[i] === ' ') {
                    result += '&nbsp;';
                } else if (revealed[i]) {
                    result += TARGET[i];
                } else if (i <= active) {
                    result += '<span class="scramble-noise">' + randomChar() + '</span>';
                } else {
                    result += '';
                }
            }
            el.innerHTML = result;
        }

        function tick() {
            // 아직 해독 안 된 글자 중 가장 앞 인덱스 찾기
            var next = -1;
            for (var i = 0; i < len; i++) {
                if (!revealed[i] && TARGET[i] !== ' ') { next = i; break; }
                if (!revealed[i] && TARGET[i] === ' ')  { revealed[i] = true; }
            }

            if (next === -1) {
                // 모든 글자 완성
                render();
                return;
            }

            active = next;

            if (counters[next] < SCRAMBLE_CYCLES) {
                counters[next]++;
                render();
                setTimeout(tick, STEP_MS);
            } else {
                // 해당 글자 확정
                revealed[next] = true;
                render();
                setTimeout(tick, STEP_MS * 1.5);
            }
        }

        setTimeout(tick, START_DELAY);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
