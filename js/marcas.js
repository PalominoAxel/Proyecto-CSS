// Página MARCAS: genera las tarjetas desde brands.js, anima su aparición al
// hacer scroll y controla el menú hamburguesa en móvil.
document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Tarjeta vertical (Bloques A y B) ---------- */
    function renderVerticalCard(brand) {
        const article = document.createElement('article');
        article.className = 'brand-card brand-card--vertical';
        article.setAttribute('data-animate', '');

        const paragraphsHtml = brand.paragraphs.map((p) => `<p>${p}</p>`).join('');
        const buttonHtml = brand.button
            ? `<a href="${brand.button.href}" class="btn-conoce-mas">${brand.button.label} <span aria-hidden="true">&rsaquo;</span></a>`
            : '';

        article.innerHTML = `
            <div class="brand-card-top">
                <div class="brand-card-logo">
                    <!-- IMG: ${brand.logo.alt} (${brand.logo.width}x${brand.logo.height}) -->
                    <img src="${brand.logo.src || ''}" alt="${brand.logo.alt}" width="${brand.logo.width}" height="${brand.logo.height}">
                </div>
                <div class="brand-card-copy">
                    ${paragraphsHtml}
                    ${buttonHtml}
                </div>
            </div>
            <div class="brand-card-image">
                <!-- IMG: ${brand.image.alt} (${brand.image.width}x${brand.image.height}) -->
                <img src="${brand.image.src || ''}" alt="${brand.image.alt}" width="${brand.image.width}" height="${brand.image.height}">
            </div>
        `;
        return article;
    }

    /* ---------- Tarjeta horizontal (Bloque C) ---------- */
    function renderHorizontalCard(brand) {
        const article = document.createElement('article');
        article.className = 'brand-card brand-card--horizontal';

        const imageCol = document.createElement('div');
        imageCol.className = 'brand-card-media';
        imageCol.setAttribute('data-animate', '');
        imageCol.innerHTML = `
            <!-- IMG: ${brand.image.alt} (${brand.image.width}x${brand.image.height}) -->
            <img src="${brand.image.src || ''}" alt="${brand.image.alt}" width="${brand.image.width}" height="${brand.image.height}">
            <div class="brand-card-media-overlay"></div>
        `;

        const textCol = document.createElement('div');
        textCol.className = 'brand-card-text';
        textCol.setAttribute('data-animate', '');

        if (brand.type === 'split') {
            textCol.innerHTML = brand.rows.map((row, index) => `
                ${index > 0 ? '<hr class="brand-card-divider">' : ''}
                <div class="brand-card-row">
                    <div class="brand-card-row-circle">
                        <!-- IMG: ${row.circle.alt} (${row.circle.width}x${row.circle.height}) -->
                        <img src="${row.circle.src || ''}" alt="${row.circle.alt}" width="${row.circle.width}" height="${row.circle.height}">
                    </div>
                    <p><span class="brand-card-row-label">${row.label}</span> ${row.text}</p>
                </div>
            `).join('');
        } else {
            textCol.innerHTML = brand.paragraphs.map((p) => `<p>${p}</p>`).join('');
        }

        article.appendChild(imageCol);
        article.appendChild(textCol);
        return article;
    }

    /* ---------- Render de las 3 grillas ---------- */
    const gridA = document.getElementById('brandGridA');
    const gridB = document.getElementById('brandGridB');
    const gridC = document.getElementById('brandGridC');

    if (gridA) BRANDS.importadas.forEach((brand) => gridA.appendChild(renderVerticalCard(brand)));
    if (gridB) BRANDS.exclusivasVerticales.forEach((brand) => gridB.appendChild(renderVerticalCard(brand)));
    if (gridC) BRANDS.exclusivasHorizontales.forEach((brand) => gridC.appendChild(renderHorizontalCard(brand)));

    /* ---------- Fade-in al hacer scroll ---------- */
    const animatedEls = document.querySelectorAll('[data-animate]');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        animatedEls.forEach((el) => el.classList.add('is-visible'));
    } else {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        animatedEls.forEach((el) => observer.observe(el));
    }

    /* ---------- Menú hamburguesa (móvil) ---------- */
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    if (navToggle && mainNav) {
        function closeNav() {
            mainNav.classList.remove('is-open');
            navToggle.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }

        navToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('is-open');
            navToggle.classList.toggle('is-open', isOpen);
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mainNav.classList.contains('is-open')) closeNav();
        });

        document.addEventListener('click', (e) => {
            if (!mainNav.classList.contains('is-open')) return;
            if (mainNav.contains(e.target) || navToggle.contains(e.target)) return;
            closeNav();
        });
    }
});
