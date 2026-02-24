fetch('assests/data/products.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('product-container');
        data.forEach(p => {
            container.innerHTML += `
                <div class="card">
                    <img src="${p.img}" alt="${p.name}">
                    <div class="card-info">
                        <h3>${p.name}</h3>
                        <p class="price">${p.price}</p>
                        <p>${p.desc}</p>
                        <a href="https://wa.me/584126515714?text=Hola! Quiero info de: ${p.name}" class="ws-btn">Preguntar por WhatsApp</a>
                    </div>
                </div>
            `;
        });
    });