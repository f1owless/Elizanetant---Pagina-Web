// --- DATOS DEL TEST (Aquí se definen las 10 preguntas) ---
const preguntasTest = [
    {
        pregunta: "¿Cuál es el blanco molecular principal de Imatinib?",
        opciones: ["Receptor de Estrógeno", "EGFR", "JAK2", "BCR-ABL Tirosina Quinasa"],
        respuestaCorrecta: 3, // La cuarta opción (índice 3)
        explicacion: "Imatinib inhibe selectivamente la tirosina quinasa BCR-ABL, clave en la LMC."
    },
    {
        pregunta: "¿En qué año fue aprobado por la FDA?",
        opciones: ["2005", "1999", "2008", "2001"],
        respuestaCorrecta: 3,
        explicacion: "Fue aprobado en 2001 como tratamiento revolucionario."
    },
    // **AQUÍ DEBES AÑADIR LAS 8 PREGUNTAS RESTANTES**
];

// --- FUNCIONALIDAD DE LAS PESTAÑAS (TABS) ---
function mostrarPestana(id) {
    // 1. Oculta todo el contenido que tenga la clase 'pestana-contenido'
    const pestañas = document.querySelectorAll('.pestana-contenido');
    pestañas.forEach(p => {
        p.classList.remove('activa');
    });

    // 2. Muestra solo la pestaña con el 'id' que se le pasó (ej. 'pestana1')
    const pestanaActiva = document.getElementById(id);
    if (pestanaActiva) {
        pestanaActiva.classList.add('activa');
    }
}

// --- FUNCIONALIDAD DEL TEST ---

function inicializarTest() {
    const contenedor = document.getElementById('contenedor-test');
    if (!contenedor) return; 

    contenedor.innerHTML = ''; 
    
    // Genera el HTML para cada pregunta
    preguntasTest.forEach((item, index) => {
        const preguntaDiv = document.createElement('div');
        preguntaDiv.classList.add('pregunta-item');
        
        let htmlContent = `
            <h3>${index + 1}. ${item.pregunta}</h3>
            <div class="opciones-contenedor">
        `;

        item.opciones.forEach((opcion, i) => {
            // Crea un botón que llama a la función verificarRespuesta al hacer clic
            htmlContent += `
                <button 
                    class="opcion-btn" 
                    onclick="verificarRespuesta(this, ${index}, ${i})">
                    ${String.fromCharCode(65 + i)}. ${opcion}
                </button>
            `;
        });
        
        htmlContent += `</div>
            <p id="feedback-${index}" class="feedback-msg"></p>
        `;
        
        preguntaDiv.innerHTML = htmlContent;
        contenedor.appendChild(preguntaDiv);
    });
}

function verificarRespuesta(botonClickeado, indicePregunta, indiceOpcion) {
    const pregunta = preguntasTest[indicePregunta];
    const feedbackMsg = document.getElementById(`feedback-${indicePregunta}`);
    
    // Desactiva todos los botones de la pregunta para evitar múltiples respuestas
    const botones = botonClickeado.parentNode.querySelectorAll('.opcion-btn');
    botones.forEach(btn => {
        btn.disabled = true;
    });

    // 1. Si es correcta
    if (indiceOpcion === pregunta.respuestaCorrecta) {
        feedbackMsg.innerHTML = '✅ **Correcto!** ' + pregunta.explicacion;
        feedbackMsg.style.backgroundColor = '#d4edda'; // Color de fondo verde claro
        botonClickeado.classList.add('correcta');
    } 
    // 2. Si es incorrecta
    else {
        feedbackMsg.innerHTML = '❌ **Incorrecto.** ' + pregunta.explicacion;
        feedbackMsg.style.backgroundColor = '#f8d7da'; // Color de fondo rojo claro
        botonClickeado.classList.add('incorrecta');
        // Resalta la respuesta correcta
        botones[pregunta.respuestaCorrecta].classList.add('correcta'); 
    }
}

// Inicialización: se ejecuta cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', () => {
    mostrarPestana('pestana1'); // Muestra la primera pestaña al inicio
    inicializarTest(); // Carga las preguntas en la Pestaña 4
});