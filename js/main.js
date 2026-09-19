// Página LÍNEAS DE NEGOCIO: sliders de imágenes por bloque + acordeón de hamburguesas.
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Sliders de imágenes de cada bloque ---------- */
    document.querySelectorAll('.lineas-slider').forEach((slider) => {
        const slides = Array.from(slider.querySelectorAll('.slide-img'));
        const tag = slider.querySelector('.slider-tag');
        const prevBtn = slider.querySelector('.slider-arrow.prev');
        const nextBtn = slider.querySelector('.slider-arrow.next');
        if (!slides.length) return;

        let current = slides.findIndex((img) => img.classList.contains('active'));
        if (current === -1) current = 0;

        function showSlide(index) {
            slides[current].classList.remove('active');
            current = (index + slides.length) % slides.length;
            slides[current].classList.add('active');

            if (tag) {
                const label = slides[current].dataset.label;
                tag.textContent = label || '';
                tag.hidden = !label;
            }
        }

        if (prevBtn) prevBtn.addEventListener('click', () => showSlide(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => showSlide(current + 1));
    });

    /* ---------- Acordeón de tipos de hamburguesa ---------- */
    document.querySelectorAll('.lineas-accordion').forEach((accordion) => {
        const items = Array.from(accordion.querySelectorAll('.accordion-item'));

        items.forEach((item) => {
            const header = item.querySelector('.accordion-header');
            const panel = item.querySelector('.accordion-panel');
            if (!header || !panel) return;

            header.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                items.forEach((other) => {
                    if (other !== item && other.classList.contains('active')) {
                        other.classList.remove('active');
                        other.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                        other.querySelector('.accordion-panel').style.maxHeight = null;
                    }
                });

                item.classList.toggle('active', !isOpen);
                header.setAttribute('aria-expanded', String(!isOpen));
                panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
            });
        });
    });
});
