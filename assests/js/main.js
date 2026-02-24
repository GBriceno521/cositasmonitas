document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');

    // Cargamos el archivo JSON
    fetch('assets/data/products.json')
        .then(response => response.json())
        .then(data => {
            if(data.length === 0) {
                grid.innerHTML = "<p>Próximamente más cositas monitas...</p>";
                return;
            }

            data.forEach(product => {
                const card = `
                    <article class="card">
                        <img src="${product.img}" alt="${product.name}" loading="lazy">
                        <div class="card-info">
                            <h3>${product.name}</h3>
                            <p class="price">${product.price}</p>
                            <p>${product.desc}</p>
                            <a href="https://wa.me/584126515714?text=Hola! Me interesa el producto: ${product.name}" 
                               class="ws-btn" target="_blank">
                               Consultar Disponibilidad
                            </a>
                        </div>
                    </article>
                `;
                grid.innerHTML += card;
            });
        })
        .catch(err => console.error("Error cargando el catálogo:", err));
});