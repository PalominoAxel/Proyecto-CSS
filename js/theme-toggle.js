// INPELSA - theme-toggle.js
// Botón circular del navbar (#themeToggle) que alterna entre la vista de
// día (negro, por defecto) y la vista de noche (blanco), guardando la
// preferencia en localStorage. El atributo data-theme="light" en <html>
// ya se aplica antes del primer render mediante el script inline en el
// <head> de cada página, para evitar el parpadeo del tema al cargar.
(function () {
    'use strict';

    var STORAGE_KEY = 'inpelsa-theme';

    document.addEventListener('DOMContentLoaded', function () {
        var toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        function updateButton(isLight) {
            toggle.setAttribute('aria-pressed', String(isLight));
            toggle.setAttribute('aria-label', isLight ? 'Cambiar a vista de día' : 'Cambiar a vista de noche');
        }

        updateButton(document.documentElement.getAttribute('data-theme') === 'light');

        toggle.addEventListener('click', function () {
            var isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
            }
            try {
                localStorage.setItem(STORAGE_KEY, isLight ? 'dark' : 'light');
            } catch (e) {
                // localStorage no disponible (modo privado, etc.): el toggle sigue funcionando en la página actual.
            }
            updateButton(!isLight);
        });
    });
})();
