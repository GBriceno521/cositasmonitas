<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cositas Monitas | Regalos y Detalles Personalizados</title>
    <meta name="description" content="En Cositas Monitas creamos recuerdos hermosos con manualidades, arreglos y decoración personalizada.">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<header>
    <img src="assets/img/logo.png" alt="Cositas Monitas Logo" class="logo">
    <h1>Cositas Monitas</h1>
    <p>Te ayudo a construir recuerdos hermosos ✨</p>
</header>

<main>
    <section class="gallery">
        <?php
        // Simulación de base de datos de productos
        $productos = [
            [
                "nombre" => "Arreglo Floral Candy",
                "descripcion" => "Hermoso detalle con dulces y flores.",
                "img" => "manualidad1.jpg"
            ],
            [
                "nombre" => "Caja de Recuerdos",
                "descripcion" => "Personalizada con fotos y mensajes.",
                "img" => "manualidad2.jpg"
            ]
        ];

        foreach ($productos as $item) {
            echo '
            <article class="card">
                <img src="assets/img/'.$item['img'].'" alt="'.$item['nombre'].'" loading="lazy">
                <div class="card-content">
                    <h3>'.$item['nombre'].'</h3>
                    <p>'.$item['descripcion'].'</p>
                    <a href="https://wa.me/TU_NUMERO?text=Hola! Quiero info de: '.$item['nombre'].'" class="btn-whatsapp" target="_blank">WhatsApp</a>
                    <a href="https://instagram.com/cositas.monitas" class="btn-insta" target="_blank">Instagram</a>
                </div>
            </article>';
        }
        ?>
    </section>
</main>

<script src="assets/js/script.js"></script>
</body>
</html>