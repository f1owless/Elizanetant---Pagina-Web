// --- DATOS DEL TEST (10 Preguntas sobre Elinzanetant) ---
const preguntasTest = [
    {
        pregunta: "1. ¿Cuál es la principal indicación terapéutica de Elinzanetant?",
        opciones: ["Diabetes Tipo 2", "Artritis Reumatoide", "Dolor neuropático", "Síntomas Vasomotores (VMS) de la menopausia"],
        respuestaCorrecta: 3, 
        explicacion: "Elinzanetant está diseñado para tratar específicamente los sofocos y sudores nocturnos (VMS)."
    },
    {
        pregunta: "2. ¿Cuál es la clasificación farmacológica de Elinzanetant?",
        opciones: ["Agonista de Receptor de Estrógeno", "Inhibidor de Tirosina Quinasa", "Antagonista Selectivo NK3", "Antagonista Doble de Receptores NK1 y NK3"],
        respuestaCorrecta: 3,
        explicacion: "Su mecanismo de acción se basa en el antagonismo dual de los receptores NK1 y NK3."
    },
    {
        pregunta: "3. ¿Cuál es la proteína que regula el centro termorregulador que Elinzanetant busca estabilizar?",
        opciones: ["Receptores PPAR", "Citoquina IL-6", "Neuronas KNDy", "Canal Iónico de Calcio"],
        respuestaCorrecta: 2,
        explicacion: "Elinzanetant actúa sobre las neuronas KNDy (Kisspeptina/Neurokinina B/Dinorfina) en el hipotálamo."
    },
    {
        pregunta: "4. ¿En qué etapa de desarrollo regulatorio se encuentra Elinzanetant (respecto a su aprobación FDA)?",
        opciones: ["Aprobado en 2023", "En Fase I (Seguridad)", "Retirado del mercado", "En Fase III (Ensayos a gran escala)"],
        respuestaCorrecta: 3,
        explicacion: "Elinzanetant se encuentra actualmente en Fase III, con resultados positivos reportados en estudios como OASIS."
    },
    {
        pregunta: "5. ¿Qué otro fármaco similar (pero con diferente mecanismo) se utiliza para VMS?",
        opciones: ["Imatinib", "Sertralina", "Terapia Hormonal (TH)", "Metformina"],
        respuestaCorrecta: 2,
        explicacion: "La Terapia Hormonal (TH) y los NK3-antagonistas selectivos (como Fezolinetant) son otras opciones de tratamiento para VMS."
    },
    {
        pregunta: "6. ¿Qué sustancia natural es el ligando principal del receptor NK3 que Elinzanetant bloquea?",
        opciones: ["Dopamina", "Acetilcolina", "Neurokinina B (NKB)", "Serotonina"],
        respuestaCorrecta: 2,
        explicacion: "El receptor NK3 es activado principalmente por la Neurokinina B (NKB)."
    },
    {
        pregunta: "7. La etiología de los sofocos menopáusicos se relaciona con:",
        opciones: ["Producción excesiva de testosterona", "Disminución de la sensibilidad a la insulina", "Disminución del rango de la Zona Termoneutral", "Hiperactividad del eje Hipotálamo-Hipófisis-Adrenal"],
        respuestaCorrecta: 2,
        explicacion: "El desequilibrio hormonal (falta de estrógeno) estrecha la Zona Termoneutral, volviendo al cuerpo hipersensible a los cambios de temperatura."
    },
    {
        pregunta: "8. ¿Qué tipo de molécula es Elinzanetant?",
        opciones: ["Anticuerpo Monoclonal", "Proteína de Fusión", "Peptídica, de gran tamaño", "Molécula pequeña no peptídica"],
        respuestaCorrecta: 3,
        explicacion: "Elinzanetant es un antagonista de molécula pequeña que puede atravesar la barrera hematoencefálica para actuar en el hipotálamo."
    },
    {
        pregunta: "9. ¿Cuál de los siguientes no es un blanco molecular de Elinzanetant?",
        opciones: ["Receptor NK1", "Receptor NK3", "Receptor de Estrógeno", "Neuronas KNDy"],
        respuestaCorrecta: 2,
        explicacion: "Elinzanetant no tiene interacción directa con el receptor de Estrógeno, por lo que se considera una alternativa no hormonal."
    },
    {
        pregunta: "10. ¿Cuál es un efecto bioquímico directo del bloqueo dual NK1/NK3?",
        opciones: ["Aumento de la producción de insulina", "Activación del sistema Renina-Angiotensina", "Normalización de la señalización hipotalámica", "Inhibición de la enzima COX-2"],
        respuestaCorrecta: 2,
        explicacion: "El bloqueo de la vía de señalización hiperactiva en el hipotálamo normaliza la respuesta termorreguladora."
    }
];

// --- FUNCIONALIDAD DE LAS PESTAÑAS (TABS) ---
function mostrarPestana(id) {
    // 1. Oculta todo el contenido
    const pestañas = document.querySelectorAll('.pestana-contenido');
    pestañas.forEach(p => {
        p.classList.remove('activa');
    });

    // 2. Muestra solo la pestaña seleccionada
    const pestanaActiva = document.getElementById(id);
    if (pestanaActiva) {
        pestanaActiva.classList.add('activa');
    }
}

// --- LÓGICA DEL TEST ---

function inicializarTest() {
    const contenedor = document.getElementById('contenedor-test');
    if (!contenedor) return; 

    contenedor.innerHTML = ''; 
    
    preguntasTest.forEach((item, index) => {
        const preguntaDiv = document.createElement('div');
        preguntaDiv.classList.add('pregunta-item');
        
        let htmlContent = `
            <h3>${item.pregunta}</h3>
            <div id="opciones-${index}" class="opciones-contenedor">
        `;

        item.opciones.forEach((opcion, i) => {
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
    
    // Desactiva todos los botones de la pregunta
    const botones = document.getElementById(`opciones-${indicePregunta}`).querySelectorAll('.opcion-btn');
    botones.forEach(btn => {
        btn.disabled = true;
    });

    // 1. Si es correcta
    if (indiceOpcion === pregunta.respuestaCorrecta) {
        feedbackMsg.innerHTML = '✅ **Correcto!** ' + pregunta.explicacion;
        feedbackMsg.style.backgroundColor = '#d4edda'; 
        botonClickeado.classList.add('correcta');
    } 
    // 2. Si es incorrecta
    else {
        feedbackMsg.innerHTML = '❌ **Incorrecto.** ' + pregunta.explicacion;
        feedbackMsg.style.backgroundColor = '#f8d7da'; 
        botonClickeado.classList.add('incorrecta');
        
        // Resalta visualmente la respuesta correcta después del error
        botones[pregunta.respuestaCorrecta].classList.add('correcta');
    }
}

// Inicialización: se ejecuta cuando la página termina de cargar
document.addEventListener('DOMContentLoaded', () => {
    mostrarPestana('pestana1'); // Muestra la primera pestaña al inicio
    inicializarTest(); // Carga las preguntas en la Pestaña 4
});