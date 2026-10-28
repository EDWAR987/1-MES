/* =====================================================
   NAVEGACIÓN ENTRE PANTALLAS
===================================================== */

function irA(id) {

    const pantallas = document.querySelectorAll(".pantalla");

    pantallas.forEach(function(pantalla) {
        pantalla.classList.remove("activa");
    });

    const destino = document.getElementById(id);

    if (destino) {
        destino.classList.add("activa");
        window.scrollTo(0, 0);
    }
}


/* =====================================================
   REINICIAR
===================================================== */

function reiniciar() {

    irA("inicio");

    puntos = 0;

    const puntosElemento = document.getElementById("puntos");

    if (puntosElemento) {
        puntosElemento.textContent = "0";
    }

    const mensajeJuego = document.getElementById("mensajeJuego");

    if (mensajeJuego) {
        mensajeJuego.textContent = "";
    }

    const btnCarta = document.getElementById("btnCarta");

    if (btnCarta) {
        btnCarta.classList.add("oculto");
    }

    const corazonJuego = document.getElementById("corazonJuego");

    if (corazonJuego) {
        corazonJuego.style.display = "block";
        moverCorazon();
    }
}


/* =====================================================
   CORAZONES FLOTANTES
===================================================== */

function crearCorazon() {

    const contenedor = document.getElementById("corazones");

    if (!contenedor) {
        return;
    }

    const corazon = document.createElement("div");

    corazon.className = "corazon-flotante";

    const emojis = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💘",
        "💞",
        "🌸",
        "✨"
    ];

    corazon.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];

    corazon.style.left =
        Math.random() * 100 + "%";

    corazon.style.fontSize =
        12 + Math.random() * 22 + "px";

    const duracion =
        5 + Math.random() * 6;

    corazon.style.animationDuration =
        duracion + "s";

    contenedor.appendChild(corazon);

    setTimeout(function() {
        corazon.remove();
    }, duracion * 1000);
}

setInterval(crearCorazon, 600);


/* =====================================================
   GALERÍA DE FOTOS
===================================================== */

let fotoActual = 0;

let fotos = [];


/* =====================================================
   CARGAR LAS 23 FOTOS
===================================================== */

function cargarFotos() {

    fotos = Array.from(
        document.querySelectorAll(".galeria .foto img")
    );

    return fotos;
}


/* =====================================================
   ABRIR FOTO
===================================================== */

function abrirFoto(elemento) {

    cargarFotos();

    if (fotos.length === 0) {
        return;
    }

    const imagen = elemento.querySelector("img");

    if (!imagen) {
        return;
    }

    fotoActual = fotos.indexOf(imagen);

    if (fotoActual === -1) {
        fotoActual = 0;
    }

    mostrarFoto();

    const visor = document.getElementById("visor");

    if (visor) {
        visor.classList.add("mostrar");
    }

    document.body.classList.add("visor-abierto");
}


/* =====================================================
   MOSTRAR FOTO ACTUAL
===================================================== */

function mostrarFoto() {

    cargarFotos();

    const visor = document.getElementById("visor");

    const fotoGrande =
        document.getElementById("fotoGrande");

    const numeroFoto =
        document.getElementById("numeroFoto");

    if (!fotoGrande || fotos.length === 0) {
        return;
    }

    const imagenActual = fotos[fotoActual];

    if (!imagenActual) {
        return;
    }

    /*
       IMPORTANTE:
       Tomamos exactamente la misma ruta
       que utiliza la miniatura.
    */

    const ruta = imagenActual.getAttribute("src");

    fotoGrande.src = ruta;

    fotoGrande.alt =
        imagenActual.getAttribute("alt") ||
        "Nuestro recuerdo";

    if (numeroFoto) {
        numeroFoto.textContent =
            (fotoActual + 1) + " / " + fotos.length;
    }

    /*
       Si por alguna razón la imagen no existe,
       mostramos un mensaje en consola.
    */

    fotoGrande.onerror = function() {

        console.error(
            "No se encontró la imagen:",
            ruta
        );
    };
}


/* =====================================================
   FOTO ANTERIOR
===================================================== */

function fotoAnterior(event) {

    if (event) {
        event.stopPropagation();
    }

    cargarFotos();

    if (fotos.length === 0) {
        return;
    }

    fotoActual--;

    if (fotoActual < 0) {
        fotoActual = fotos.length - 1;
    }

    mostrarFoto();
}


/* =====================================================
   FOTO SIGUIENTE
===================================================== */

function fotoSiguiente(event) {

    if (event) {
        event.stopPropagation();
    }

    cargarFotos();

    if (fotos.length === 0) {
        return;
    }

    fotoActual++;

    if (fotoActual >= fotos.length) {
        fotoActual = 0;
    }

    mostrarFoto();
}


/* =====================================================
   CERRAR VISOR
===================================================== */

function cerrarFoto(event) {

    if (event) {
        event.stopPropagation();
    }

    const visor = document.getElementById("visor");

    if (visor) {
        visor.classList.remove("mostrar");
    }

    document.body.classList.remove("visor-abierto");
}


/* =====================================================
   CERRAR AL HACER CLICK EN EL FONDO
===================================================== */

document.addEventListener("click", function(event) {

    const visor = document.getElementById("visor");

    if (!visor) {
        return;
    }

    if (!visor.classList.contains("mostrar")) {
        return;
    }

    if (event.target === visor) {
        cerrarFoto();
    }
});


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener("keydown", function(event) {

    const visor = document.getElementById("visor");

    if (!visor) {
        return;
    }

    if (!visor.classList.contains("mostrar")) {
        return;
    }

    if (event.key === "Escape") {
        cerrarFoto();
    }

    if (event.key === "ArrowLeft") {
        fotoAnterior();
    }

    if (event.key === "ArrowRight") {
        fotoSiguiente();
    }
});


/* =====================================================
   JUEGO
===================================================== */

let puntos = 0;

const corazonJuego =
    document.getElementById("corazonJuego");

const zonaJuego =
    document.getElementById("zonaJuego");


function moverCorazon() {

    if (!corazonJuego || !zonaJuego) {
        return;
    }

    const anchoMaximo =
        zonaJuego.clientWidth -
        corazonJuego.offsetWidth;

    const altoMaximo =
        zonaJuego.clientHeight -
        corazonJuego.offsetHeight;

    const x =
        Math.max(
            0,
            Math.random() * anchoMaximo
        );

    const y =
        Math.max(
            0,
            Math.random() * altoMaximo
        );

    corazonJuego.style.left = x + "px";

    corazonJuego.style.top = y + "px";
}


if (corazonJuego) {

    corazonJuego.addEventListener("click", function(event) {

        event.stopPropagation();

        puntos++;

        const puntosElemento =
            document.getElementById("puntos");

        if (puntosElemento) {
            puntosElemento.textContent = puntos;
        }

        if (puntos >= 5) {

            const mensaje =
                document.getElementById("mensajeJuego");

            if (mensaje) {
                mensaje.textContent =
                    "¡Lo lograste! Sabía que encontrarías todos ❤️";
            }

            const btnCarta =
                document.getElementById("btnCarta");

            if (btnCarta) {
                btnCarta.classList.remove("oculto");
            }

            corazonJuego.style.display = "none";

        } else {

            moverCorazon();
        }
    });
}


/* =====================================================
   MÚSICA
===================================================== */

const musica =
    document.getElementById("musica");

let reproduciendo = false;


function controlarMusica() {

    if (!musica) {
        return;
    }

    if (reproduciendo) {

        musica.pause();

        reproduciendo = false;

    } else {

        musica.play()
            .then(function() {

                reproduciendo = true;

            })
            .catch(function() {

                alert(
                    "No se pudo reproducir la música. Revisa que el archivo exista."
                );

            });
    }
}


/* =====================================================
   CARGAR TODO AL INICIAR
===================================================== */

document.addEventListener("DOMContentLoaded", function() {

    cargarFotos();

    if (corazonJuego) {
        moverCorazon();
    }

});


/* =====================================================
   AJUSTAR JUEGO AL CAMBIAR TAMAÑO
===================================================== */

window.addEventListener("resize", function() {

    if (
        corazonJuego &&
        corazonJuego.style.display !== "none"
    ) {

        moverCorazon();
    }

});