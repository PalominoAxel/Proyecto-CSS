// INPELSA - scroll-animations.js
// Revela con una animación (css/animations.css: .will-animate / .is-visible)
// las tarjetas, encabezados y bloques de dos columnas (texto/imagen) de todas
// las páginas cuando entran al viewport. Las columnas izquierda/derecha entran
// desde su lado (dir-left/dir-right); el resto, con un fundido hacia arriba.
(function () {
    'use strict';

    var GROUPS = [
        {
            dir: 'left',
            selectors: [
                '.about-left', '.quienes-content', '.hero-left',
                '.contacto-info', '.lineas-content'
            ]
        },
        {
            dir: 'right',
            selectors: [
                '.about-right', '.quienes-image-container', '.hero-right',
                '.contacto-card', '.lineas-slider'
            ]
        },
        {
            dir: 'up',
            selectors: [
                '.hero-content', '.hero-title', '.lineas-hero', '.nosotros-hero',
                '.section-header', '.section-title', '.section-title-lg',
                '.feature-card', '.marca-card', '.logo-box', '.logo-card', '.news-card', '.ventaja-item',
                '.product-card', '.timeline-card', '.valor-card', '.mv-block',
                '.proposito-image-block', '.accordion-item',
                '.sede-item', '.sede-card',
                '.footer-col', '.brand-grid', '.brand-stack', '[data-animate]'
            ]
        }
    ];

    function ready(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    ready(function () {
        var entries = []; // { el, dirClass }

        for (var g = 0; g < GROUPS.length; g++) {
            var group = GROUPS[g];
            var dirClass = group.dir === 'up' ? null : 'dir-' + group.dir;
            var found = document.querySelectorAll(group.selectors.join(','));
            for (var i = 0; i < found.length; i++) {
                entries.push({ el: found[i], dirClass: dirClass });
            }
        }

        if (!entries.length) return;

        // Compatibilidad entre navegadores: sin soporte de IntersectionObserver
        // (Safari viejo, IE11) se muestra el contenido directo, sin animación.
        if (!('IntersectionObserver' in window)) {
            for (var n = 0; n < entries.length; n++) {
                entries[n].el.classList.add('is-visible');
            }
            return;
        }

        var observer = new IntersectionObserver(function (observed, obs) {
            for (var j = 0; j < observed.length; j++) {
                var entry = observed[j];
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            }
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        for (var k = 0; k < entries.length; k++) {
            entries[k].el.classList.add('will-animate');
            if (entries[k].dirClass) entries[k].el.classList.add(entries[k].dirClass);
            observer.observe(entries[k].el);
        }
    });
})();
