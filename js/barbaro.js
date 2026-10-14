// BÁRBARO - barbaro.js
// Menú hamburguesa móvil del header independiente de la página Bárbaro.
(function () {
    'use strict';

    var toggle = document.getElementById('bbNavToggle');
    var nav = document.getElementById('bbNav');
    if (!toggle || !nav) return;

    function closeNav() {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    var links = nav.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', closeNav);
    }
})();
