// CERTIFIED ANGUS BEEF - certified-angus-beef.js
// - Renderiza las 3 tarjetas de "10 especificaciones de calidad" desde un array.
// - Activa el video de YouTube de la sección "La historia..." al hacer clic sobre el play.
(function () {
    'use strict';

    var SPECS = [
        {
            title: 'Marmoleo y madurez',
            image: 'img/certified-angus-beef/especificacion-marmoleo.jpg',
            alt: 'Corte de carne Angus mostrando marmoleo',
            items: [
                'Marmoleo modesto o superior',
                'Textura de marmoleo de media a fina',
                'El ganado debe tener menos de 30 meses de edad determinada por prueba de dentición y solo se acepta carne roja con madurez "A"'
            ]
        },
        {
            title: 'Dimensiones uniformes',
            image: 'img/certified-angus-beef/especificacion-dimensiones.jpg',
            alt: 'Medición del área del ribeye de un corte Angus',
            items: [
                'Área del ribeye de 10 a 16 pulgadas cuadradas (64 a 103 cm²)',
                'Peso de 1,100 lbs. (499 kg) o menos en canal caliente',
                '1 pulgada (2.5 cm) o menos de cobertura de grasa'
            ]
        },
        {
            title: 'Apariencia de calidad y suavidad',
            image: 'img/certified-angus-beef/especificacion-apariencia.jpg',
            alt: 'Corte de carne Angus de apariencia uniforme',
            items: [
                'Musculatura superior',
                'Prácticamente libre de ruptura de capilares',
                'Sin cortes oscuros',
                'Joroba que no excede 2\'\' (5 cm)'
            ]
        }
    ];

    function renderSpecs() {
        var grid = document.getElementById('cabSpecsGrid');
        if (!grid) return;

        var counter = 1;
        var html = '';

        for (var i = 0; i < SPECS.length; i++) {
            var spec = SPECS[i];
            html += '<article class="cab-spec-card cab-reveal">';
            html += '<div class="cab-spec-image-wrap"><img src="' + spec.image + '" alt="' + spec.alt + '" class="cab-spec-image" loading="lazy"></div>';
            html += '<div class="cab-spec-panel">';
            html += '<h3 class="cab-spec-title">' + spec.title + '</h3>';
            html += '<ul class="cab-spec-list">';
            for (var j = 0; j < spec.items.length; j++) {
                html += '<li><span class="cab-spec-number">' + counter + '</span><span>' + spec.items[j] + '</span></li>';
                counter++;
            }
            html += '</ul></div></article>';
        }

        grid.innerHTML = html;
    }

    // Animaciones al hacer scroll (".cab-reveal" -> ".is-visible"): cubre tanto
    // los elementos ya presentes en el HTML como las tarjetas de especificaciones
    // recién insertadas por renderSpecs(), por eso se llama DESPUÉS de renderizarlas.
    function setupScrollReveal() {
        var targets = document.querySelectorAll('.cab-reveal');
        if (!targets.length) return;

        if (!('IntersectionObserver' in window)) {
            for (var i = 0; i < targets.length; i++) {
                targets[i].classList.add('is-visible');
            }
            return;
        }

        var observer = new IntersectionObserver(function (entries, obs) {
            for (var j = 0; j < entries.length; j++) {
                if (entries[j].isIntersecting) {
                    entries[j].target.classList.add('is-visible');
                    obs.unobserve(entries[j].target);
                }
            }
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        for (var k = 0; k < targets.length; k++) {
            observer.observe(targets[k]);
        }
    }

    // Video de la sección "La historia de Certified Angus Beef": portada con botón play.
    function setupVideo() {
        var frame = document.getElementById('cabVideoFrame');
        if (!frame) return;
        var playBtn = frame.querySelector('.cab-video-play');
        if (!playBtn) return;

        playBtn.addEventListener('click', function () {
            var videoId = frame.getAttribute('data-youtube-id');
            if (!videoId) return; // Sin ID configurado todavía: no hace nada.

            var iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
            iframe.title = 'La historia de Certified Angus Beef';
            iframe.setAttribute('frameborder', '0');
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            iframe.className = 'cab-video-iframe';

            frame.innerHTML = '';
            frame.appendChild(iframe);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderSpecs();
        setupScrollReveal();
        setupVideo();
    });
})();
