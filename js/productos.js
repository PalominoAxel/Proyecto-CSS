// Página PRODUCTOS: modal de detalle con la variedad de cortes de cada tarjeta.
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Listado de variedades por producto (clave = data-product) ---------- */
    const PRODUCT_VARIETIES = {
        bovina: [
            'Lomo fino',
            'Costillar de res',
            'Asado de tira con hueso',
            'Osobuco',
            'Sancochado de pecho',
            'Carne molida',
            'Bola de lomo',
            'Churrasco',
            'Guiso de res',
            'Corazón de cuadril',
            'Y más...'
        ],
        porcino: [
            'Pierna de cerdo',
            'Panceta',
            'Chuleta',
            'Costilla de cerdo',
            'Lomo de cerdo',
            'Pernil',
            'Papada',
            'Y más...'
        ],
        'importada-congelada': [
            'Ribeye importado',
            'Bife angosto',
            'T-Bone',
            'Picaña importada',
            'Asado de tira importado',
            'Y más...'
        ],
        'importada-refrigerada': [
            'Bife de chorizo',
            'Entraña',
            'Matambre',
            'Colita de cuadril',
            'Y más...'
        ],
        ave: [
            'Pechuga de pollo',
            'Muslo de pollo',
            'Alitas',
            'Piernas',
            'Pollo entero',
            'Y más...'
        ],
        hamburguesa: [
            'Hamburguesa clásica de res',
            'Hamburguesa Certified Angus Beef',
            'Hamburguesa mixta (res + cerdo)',
            'Hamburguesa Taylor made',
            'Y más...'
        ],
        menudencia: [
            'Hígado',
            'Corazón',
            'Mondongo',
            'Lengua',
            'Riñón',
            'Y más...'
        ]
    };

    /* ---------- Elementos del modal ---------- */
    const modal = document.getElementById('productModal');
    if (!modal) return;

    const modalImg = document.getElementById('productModalImg');
    const modalTitle = document.getElementById('productModalTitle');
    const modalList = document.getElementById('productModalList');
    let lastFocusedEl = null;

    function openModal(card) {
        const img = card.querySelector('img');
        const title = card.querySelector('h3');
        const key = card.dataset.product;
        const varieties = PRODUCT_VARIETIES[key] || [];

        modalImg.src = img ? img.src : '';
        modalImg.alt = img ? img.alt : '';
        modalTitle.textContent = title ? title.textContent : '';
        modalList.innerHTML = varieties.map((item) => `<li>${item}</li>`).join('');

        lastFocusedEl = document.activeElement;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        modal.querySelector('.product-modal-close').focus();
    }

    function closeModal() {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (lastFocusedEl) lastFocusedEl.focus();
    }

    /* ---------- Apertura desde cada tarjeta ---------- */
    document.querySelectorAll('.product-card').forEach((card) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => openModal(card));
    });

    /* ---------- Cierre: botón "X", clic fuera y tecla Escape ---------- */
    modal.querySelectorAll('[data-modal-close]').forEach((el) => {
        el.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
});
