// Sliders/carousels de la página Nosotros:
// - CLIENTES LICENCIADOS / CLIENTES DEL CATÁLOGO: loop infinito + auto-avance + drag-to-scroll.
// - LA HISTORIA DE INPELSA: slider acotado (sin loop) con botones que se bloquean en los extremos.
// - SEDES y NUESTROS VALORES: animaciones de aparición al hacer scroll.
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Utilidad común: arrastrar con el mouse para desplazar ---------- */
    function enableDragScroll(track, onDragEnd) {
        let isDown = false;
        let dragged = false;
        let startX = 0;
        let startScroll = 0;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            dragged = false;
            startX = e.pageX;
            startScroll = track.scrollLeft;
            track.classList.add('dragging');
        });

        window.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            track.classList.remove('dragging');
            if (onDragEnd) onDragEnd();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            const delta = e.pageX - startX;
            if (Math.abs(delta) > 5) dragged = true;
            track.scrollLeft = startScroll - delta;
        });

        // Evita que el arrastre dispare un click sobre el contenido de la tarjeta
        track.addEventListener('click', (e) => {
            if (dragged) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    }

    // Ancho de una tarjeta + el espacio (gap) del carril, para avanzar de una en una
    function getCardStep(track) {
        const card = track.firstElementChild;
        if (!card) return 300;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return card.getBoundingClientRect().width + gap;
    }

    /* ---------- CLIENTES LICENCIADOS / CLIENTES DEL CATÁLOGO ---------- */
    function setupInfiniteClientTrack(block) {
        const track = block.querySelector('.logos-grid');
        const controls = block.querySelector('.slider-controls');
        if (!track) return;

        // Duplica el set de tarjetas para poder "loopear" sin corte visible
        const originalCards = Array.from(track.children);
        originalCards.forEach((card) => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.setAttribute('tabindex', '-1');
            track.appendChild(clone);
        });

        let singleWidth = track.scrollWidth / 2;
        window.addEventListener('resize', () => {
            singleWidth = track.scrollWidth / 2;
        });

        // Reubica el scroll sin animación al cruzar el set original o el clon
        function normalize() {
            if (track.scrollLeft >= singleWidth) {
                track.style.scrollBehavior = 'auto';
                track.scrollLeft -= singleWidth;
                track.style.scrollBehavior = '';
            } else if (track.scrollLeft <= 0) {
                track.style.scrollBehavior = 'auto';
                track.scrollLeft += singleWidth;
                track.style.scrollBehavior = '';
            }
        }

        function stepForward() {
            track.scrollBy({ left: getCardStep(track), behavior: 'smooth' });
            setTimeout(normalize, 500);
        }

        function stepBackward() {
            const step = getCardStep(track);
            if (track.scrollLeft - step < 0) {
                // Salta de antemano al set clonado para poder seguir retrocediendo
                track.style.scrollBehavior = 'auto';
                track.scrollLeft += singleWidth;
                track.style.scrollBehavior = '';
            }
            track.scrollBy({ left: -step, behavior: 'smooth' });
        }

        if (controls) {
            const buttons = controls.querySelectorAll('.control-btn');
            if (buttons[0]) buttons[0].addEventListener('click', stepBackward);
            if (buttons[1]) buttons[1].addEventListener('click', stepForward);
        }

        enableDragScroll(track, normalize);

        // Auto-avance cada 1.5s, en pausa mientras el usuario interactúa con el carril
        let paused = false;
        track.addEventListener('mouseenter', () => { paused = true; });
        track.addEventListener('mouseleave', () => { paused = false; });
        track.addEventListener('mousedown', () => { paused = true; });
        window.addEventListener('mouseup', () => { paused = false; });

        setInterval(() => {
            if (!paused) stepForward();
        }, 2500);
    }

    document.querySelectorAll('.clientes-block').forEach(setupInfiniteClientTrack);

    /* ---------- LA HISTORIA DE INPELSA (slider acotado, sin loop) ---------- */
    const historiaTrack = document.querySelector('.timeline-grid');
    const historiaControls = document.querySelector('.historia-controls');

    if (historiaTrack && historiaControls) {
        const [prevBtn, nextBtn] = historiaControls.querySelectorAll('.control-btn');

        function updateHistoriaButtons() {
            const maxScroll = historiaTrack.scrollWidth - historiaTrack.clientWidth;
            if (prevBtn) prevBtn.disabled = historiaTrack.scrollLeft <= 1;
            if (nextBtn) nextBtn.disabled = historiaTrack.scrollLeft >= maxScroll - 1;
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                historiaTrack.scrollBy({ left: -getCardStep(historiaTrack), behavior: 'smooth' });
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                historiaTrack.scrollBy({ left: getCardStep(historiaTrack), behavior: 'smooth' });
            });
        }

        historiaTrack.addEventListener('scroll', updateHistoriaButtons);
        window.addEventListener('resize', updateHistoriaButtons);
        enableDragScroll(historiaTrack, updateHistoriaButtons);
        updateHistoriaButtons();
    }

    /* ---------- Animaciones de aparición al hacer scroll (Sedes y Valores) ---------- */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.sede-card, .valores-grid').forEach((el) => revealObserver.observe(el));
});
