document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');

    // 1. Configuración del Observador de Animación
    // 'threshold: 0.2' significa: dispara la animación cuando el 20% de la tarjeta sea visible.
    const opcionesOpciones = {
        root: null, // usa el viewport del navegador
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px" // Un pequeño margen para que active un poco antes de llegar abajo
    };

    const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            // Si el elemento entra en pantalla (es "intersecting")
            if (entrada.isIntersecting) {
                // Le añadimos la clase que activa el CSS
                entrada.target.classList.add('aparecer');
                // Dejamos de observar este elemento (para que no se anime de nuevo al subir)
                observador.unobserve(entrada.target);
            }
        });
    }, opcionesOpciones);


    // 2. Carga de Datos y Creación de Tarjetas
    fetch('assets/data/products.json')
        .then(res => {
            if (!res.ok) throw new Error('Error al cargar el JSON');
            return res.json();
        })
        .then(data => {
            // Si no hay productos, mostramos un mensaje
            if(data.length === 0) {
                grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Próximamente más cositas monitas...</p>';
                return;
            }

            // Generamos el HTML de cada tarjeta
            data.forEach(prod => {
                // Nota: No le ponemos la clase 'aparecer' aquí. Eso lo hará el observador.
                const cardHTML = `
                    <article class="card">
                        <img src="${prod.img}" alt="${prod.name}" loading="lazy">
                        <div class="card-content">
                            <h3>${prod.name}</h3>
                            <p style="color: #F06292; font-weight: bold; margin: 10px 0;">${prod.price}</p>
                            <p style="font-size: 0.9rem;">${prod.desc}</p>
                            <a href="https://wa.me/584126515714?text=Hola! Estoy interesada en: ${prod.name}" 
                               class="btn-wa" target="_blank">Consultar por WhatsApp</a>
                        </div>
                    </article>
                `;
                grid.insertAdjacentHTML('beforeend', cardHTML);
            });

            // 3. Activar el Observador
            // Seleccionamos todas las tarjetas recién creadas
            const nuevasTarjetas = document.querySelectorAll('.card');
            // Le decimos al observador que vigile a cada una
            nuevasTarjetas.forEach(tarjeta => {
                observador.observe(tarjeta);
            });

        })
        .catch(err => {
            console.error("Error:", err);
            grid.innerHTML = '<p style="text-align:center; color: red;">Hubo un problema cargando el catálogo.</p>';
        });
});