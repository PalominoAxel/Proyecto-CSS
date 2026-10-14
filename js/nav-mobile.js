// INPELSA - nav-mobile.js
// Menú hamburguesa del navbar global, compartido por todas las páginas
// que usan el header/nav de css/global.css (#navToggle / #mainNav).
// En móvil: el botón abre/cierra el panel; los submenús "Nosotros" y
// "Líneas de Negocio" quedan colapsados y se abren con un clic (el
// hover no existe en pantallas táctiles). En escritorio no se activa
// nada de esto: el link navega normal y el submenú sigue abriéndose
// con :hover, como ya estaba.
(function () {
    'use strict';

    function isMobile() {
        return window.matchMedia('(max-width: 992px)').matches;
    }

    document.addEventListener('DOMContentLoaded', function () {
        var toggle = document.getElementById('navToggle');
        var nav = document.getElementById('mainNav');
        if (!toggle || !nav) return;

        function closeDropdowns() {
            var openItems = nav.querySelectorAll('.nav-item.dropdown-open');
            for (var i = 0; i < openItems.length; i++) {
                openItems[i].classList.remove('dropdown-open');
                var link = openItems[i].querySelector('.dropdown-toggle');
                if (link) link.setAttribute('aria-expanded', 'false');
            }
        }

        function closeNav() {
            nav.classList.remove('is-open');
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            closeDropdowns();
        }

        toggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('is-open');
            toggle.classList.toggle('is-open', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
            if (!isOpen) closeDropdowns();
        });

        var dropdownToggles = nav.querySelectorAll('.nav-item.dropdown > .dropdown-toggle');
        for (var d = 0; d < dropdownToggles.length; d++) {
            dropdownToggles[d].addEventListener('click', function (e) {
                if (!isMobile()) return; // Escritorio: navega normal, el submenú ya abre con :hover.
                e.preventDefault();
                var item = this.parentElement;
                var wasOpen = item.classList.contains('dropdown-open');
                closeDropdowns();
                if (!wasOpen) {
                    item.classList.add('dropdown-open');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        }

        var topLevelLinks = nav.querySelectorAll(':scope > a, .dropdown-link');
        for (var l = 0; l < topLevelLinks.length; l++) {
            topLevelLinks[l].addEventListener('click', closeNav);
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) closeNav();
        });

        document.addEventListener('click', function (e) {
            if (!nav.classList.contains('is-open')) return;
            if (nav.contains(e.target) || toggle.contains(e.target)) return;
            closeNav();
        });
    });
})();
