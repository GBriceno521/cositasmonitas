document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('product-grid');

  renderWelcomeBanner();

  fetch('assests/data/products.json')
    .then((response) => response.json())
    .then((products) => {
      if (!Array.isArray(products) || products.length === 0) {
        grid.innerHTML = '<p class="empty-state">Próximamente más cositas monitas...</p>';
        return;
      }

      grid.innerHTML = products.map((product, index) => createProductCard(product, index)).join('');
      bindCarouselControls();
    })
    .catch((err) => {
      console.error('Error cargando el catálogo:', err);
      grid.innerHTML = '<p class="empty-state">No pudimos cargar el catálogo en este momento.</p>';
    });
});

function createProductCard(product, index) {
  const images = Array.isArray(product.images) && product.images.length > 0 ? product.images : ['https://via.placeholder.com/900x600?text=Sin+Imagen'];
  const slides = images
    .map(
      (img, imgIndex) => `
        <div class="carousel-slide ${imgIndex === 0 ? 'active' : ''}">
          <img src="${img}" alt="${product.name} - imagen ${imgIndex + 1}" loading="lazy">
        </div>
      `
    )
    .join('');

  const dots = images
    .map(
      (_, dotIndex) =>
        `<button class="carousel-dot ${dotIndex === 0 ? 'active' : ''}" type="button" aria-label="Ir a imagen ${dotIndex + 1}" data-dot-index="${dotIndex}"></button>`
    )
    .join('');

  const whatsappText = encodeURIComponent(`Hola, me interesa obtener información del producto: ${product.name}`);
  const whatsappUrl = `https://wa.me/584126515714?text=${whatsappText}`;
  const instagramUrl = product.instagram || 'https://instagram.com/cositas.monitas';

  return `
    <article class="card" data-card-index="${index}">
      <div class="carousel" data-carousel-index="${index}">
        <div class="carousel-track">
          ${slides}
        </div>
        ${images.length > 1 ? '<button class="carousel-btn prev" type="button" aria-label="Imagen anterior">❮</button>' : ''}
        ${images.length > 1 ? '<button class="carousel-btn next" type="button" aria-label="Imagen siguiente">❯</button>' : ''}
        ${images.length > 1 ? `<div class="carousel-dots">${dots}</div>` : ''}
      </div>

      <div class="card-info">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
        <p class="description">${product.desc || ''}</p>
        <div class="card-actions">
          <a href="${whatsappUrl}" class="ws-btn" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="${instagramUrl}" class="ig-btn" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </article>
  `;
}

function bindCarouselControls() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dots = carousel.querySelectorAll('.carousel-dot');

    if (slides.length <= 1) return;

    let currentIndex = 0;

    const updateSlides = (nextIndex) => {
      slides[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');
      currentIndex = nextIndex;
      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    };

    prevBtn.addEventListener('click', () => {
      const nextIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlides(nextIndex);
    });

    nextBtn.addEventListener('click', () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      updateSlides(nextIndex);
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const nextIndex = Number(dot.dataset.dotIndex);
        if (!Number.isNaN(nextIndex)) updateSlides(nextIndex);
      });
    });
  });
}

function renderWelcomeBanner() {
  const banner = document.createElement('div');
  banner.className = 'welcome-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');

  banner.innerHTML = `
    <div class="welcome-card">
      <p class="welcome-tag">¡Bienvenida/o!</p>
      <h2>Catálogo Cositas Monitas ✨</h2>
      <p>Descubre regalos personalizados y detalles únicos hechos con amor.</p>
      <button type="button" class="welcome-close">Ver catálogo</button>
    </div>
  `;

  document.body.appendChild(banner);

  const closeBtn = banner.querySelector('.welcome-close');
  const closeBanner = () => {
    banner.classList.add('hide');
    window.setTimeout(() => banner.remove(), 350);
  };

  closeBtn.addEventListener('click', closeBanner);
  window.setTimeout(closeBanner, 4200);
}
