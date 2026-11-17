// Nombre y apellidos: ______________________________

import { tareasIniciales } from './datos.js';

// ============================================================
// Constantes y elementos de la página (ya definidos: no los cambies)
// ============================================================
const ESTADOS = ['porhacer', 'encurso', 'hecha'];
const LIMITE_HORAS = 40;

const formularioTarea = document.querySelector('#formulario-tarea');
const campoHoras = formularioTarea.elements.horas;
const mensajeFormulario = document.querySelector('#mensaje-formulario');
const buscador = document.querySelector('#buscador');
const botonArchivar = document.querySelector('#boton-archivar');
const tablero = document.querySelector('#tablero');
const listaHoras = document.querySelector('#horas-asignatura');
const progreso = document.querySelector('#progreso');

const columnas = {
  porhacer: document.querySelector('#col-porhacer'),
  encurso: document.querySelector('#col-encurso'),
  hecha: document.querySelector('#col-hecha')
};
const contadores = {
  porhacer: document.querySelector('#num-porhacer'),
  encurso: document.querySelector('#num-encurso'),
  hecha: document.querySelector('#num-hecha')
};

// Se desactiva la validación del navegador: los mensajes los muestras tú (apartado 1)
formularioTarea.noValidate = true;

// Tareas del tablero. Es una copia: los datos originales no se tocan
let tareas = tareasIniciales.map((tarea) => ({ ...tarea }));

// Repinta todo a partir del array de tareas (ya hecha: la usarás en el apartado 4)
const repintar = () => {
  pintarTablero(buscarTareas(tareas, buscador.value));
  pintarResumen(tareas);
};


// ============================================================
// APARTADO 1 · Formulario y validación
// ============================================================

// 1.1 · Devuelve el texto del error de un campo según su `validity` ('' si es válido)
const mensajeDeError = (campo) => {
if (campo.validity.valueMissing) {
  return 'Este campo es obligatorio';
}
if (campo.validity.tooShort) {
  return 'Escribe al menos 3 caracteres';
}
if (campo.validity.rangeUnderflow || campo.validity.rangeOverflow){
  return 'Debe estar entre ' + campo.min + ' y ' + campo.max;
}
if (campo.validity.customError){
  return campo.validationMessage;
}
else {
  return '';
}
};

// 1.2 · Muestra u oculta el error de un campo y devuelve si es válido
const validarCampo = (campo) => {
const mensaje = mensajeDeError(campo);

campo.nextElementSibling.textContent = mensaje;

if (mensaje) {
  campo.classList.add('invalido');
} else {
  campo.classList.remove('invalido');
}
return mensaje === '';
};

// 1.3 · Aplica (o quita) el error personalizado de #horas según el límite de horas pendientes
const comprobarHoras = () => {
const pendientes = tareas.filter(tarea => tarea.estado !== 'hecha');

    const horasPendientes = pendientes.reduce((total, tarea) => {
        return total + tarea.horas;
    }, 0);

    const horasNuevas = Number(campoHoras.value) || 0;

    if (horasPendientes + horasNuevas > LIMITE_HORAS) {
        campoHoras.setCustomValidity(
            `Superas el límite de 40 h pendientes (ahora hay ${horasPendientes} h)`
        );
    } else {
        campoHoras.setCustomValidity('');
    }
 
};

// 1.4 · Deja el formulario como recién cargado
const limpiarFormulario = () => {
 formularioTarea.reset();

    formularioTarea.querySelectorAll('input, select, textarea').forEach((campo) => {
        campo.nextElementSibling.textContent = '';
        campo.classList.remove('invalido');
    });

    campoHoras.setCustomValidity('');

};

// 1.5 · Eventos del formulario (change, input y keydown)
formularioTarea.addEventListener('change', (evento) => {
    comprobarHoras();
    validarCampo(evento.target);
});

formularioTarea.addEventListener('input', (evento) => {
    if (evento.target.classList.contains('invalido')) {
        comprobarHoras();
        validarCampo(evento.target);
    }
});

formularioTarea.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') {
        limpiarFormulario();
    }
});

// ============================================================
// APARTADO 2 · Cálculos con los datos (funciones puras)
// ============================================================

// 2.1 · Tareas cuyo título o asignatura contienen el texto buscado
const buscarTareas = (lista, texto) => {
const busqueda = texto.trim().toLowerCase();

    return lista.filter((tarea) => {
        return tarea.titulo.toLowerCase().includes(busqueda) ||
               tarea.asignatura.toLowerCase().includes(busqueda);
    });
  };

// 2.2 · Reparte las tareas en un objeto con una lista por cada estado
const agruparPorEstado = (lista) => {
    const grupos = {
        porhacer: [],
        encurso: [],
        hecha: []
    };

    lista.forEach((tarea) => {
        grupos[tarea.estado].push(tarea);
    });

    return grupos;
};

// 2.3 · Suma las horas de cada asignatura, de más a menos horas
const horasPorAsignatura = (lista) => {
    const totales = lista.reduce((acumulado, tarea) => {
        acumulado[tarea.asignatura] = (acumulado[tarea.asignatura] || 0) + tarea.horas;
        return acumulado;
    }, {});

    return Object.entries(totales)
        .map(([asignatura, horas]) => ({ asignatura, horas }))
        .sort((a, b) => b.horas - a.horas || a.asignatura.localeCompare(b.asignatura));
};



// ============================================================
// APARTADO 3 · Pintar la página
// ============================================================

// 3.1 · Devuelve (sin insertarla) la tarjeta <li> de una tarea
const crearTarjeta = (tarea) => {
    // Creamos el elemento principal de la tarjeta
    const tarjeta = document.createElement('li');

    // Le ponemos las clases CSS según su prioridad
    tarjeta.className = `tarjeta prioridad-${tarea.prioridad}`;

    // Guardamos el ID de la tarea en el HTML
    tarjeta.dataset.id = tarea.id;

    // Creamos el título
    const titulo = document.createElement('strong');
    titulo.className = 'titulo';
    titulo.textContent = tarea.titulo;

    // Creamos la información de la tarea
    const meta = document.createElement('span');
    meta.className = 'meta';
    meta.textContent = `${tarea.asignatura} · ${tarea.horas} h`;

    // Averiguamos la posición de la tarea entre los tres estados
    const posicion = ESTADOS.indexOf(tarea.estado);

    // Creamos el botón para retroceder
    const retroceder = document.createElement('button');
    retroceder.type = 'button';
    retroceder.dataset.accion = 'retroceder';
    retroceder.textContent = '←';

    // Creamos el botón para avanzar
    const avanzar = document.createElement('button');
    avanzar.type = 'button';
    avanzar.dataset.accion = 'avanzar';
    avanzar.textContent = '→';

    // Desactivamos los botones cuando no se puede avanzar o retroceder
    retroceder.disabled = posicion === 0;
    avanzar.disabled = posicion === ESTADOS.length - 1;

    // Metemos todos los elementos dentro de la tarjeta
    tarjeta.append(titulo, meta, retroceder, avanzar);

    // Devolvemos la tarjeta terminada
    return tarjeta;
};

// 3.2 · Reparte las tarjetas de lista en las tres columnas y actualiza los contadores
const pintarTablero = (lista) => {
    // Separamos las tareas según su estado
    const grupos = agruparPorEstado(lista);

    // Recorremos los tres estados
    ESTADOS.forEach((estado) => {

        // Vaciamos la columna antes de volver a pintarla
        columnas[estado].replaceChildren();

        // Recorremos las tareas de ese estado
        grupos[estado].forEach((tarea) => {

            // Creamos su tarjeta y la metemos en la columna
            columnas[estado].append(crearTarjeta(tarea));
        });

        // Actualizamos el contador de esa columna
        contadores[estado].textContent = grupos[estado].length;
    });
};

// 3.3 · Pinta el resumen: horas por asignatura y progreso
const pintarResumen = (lista) => {
    // Vaciamos la lista de horas por asignatura
    listaHoras.replaceChildren();

    // Calculamos las horas de cada asignatura
    const resumen = horasPorAsignatura(lista);

    // Creamos un elemento de lista para cada asignatura
    resumen.forEach((dato) => {
        const elemento = document.createElement('li');

        elemento.textContent = `${dato.asignatura} — ${dato.horas} h`;

        listaHoras.append(elemento);
    });

    // Contamos cuántas tareas están terminadas
    const hechas = lista.filter(tarea => tarea.estado === 'hecha').length;

    // Calculamos el total de tareas
    const total = lista.length;

    // Calculamos el porcentaje, evitando dividir entre cero
    const porcentaje = total === 0 ? 0 : Math.round((hechas / total) * 100);

    // Escribimos el progreso
    progreso.textContent = `Hechas: ${hechas} de ${total} (${porcentaje} %)`;
};

// ============================================================
// APARTADO 4 · Interacción
// ============================================================

// 4.1 · Mueve una tarea `paso` columnas (+1 avanza, -1 retrocede)
const moverTarea = (id, paso) => {
    // Buscamos la tarea que tenga ese ID
    const tarea = tareas.find(tarea => tarea.id === id);

    // Si no existe, terminamos la función
    if (!tarea) return;

    // Averiguamos en qué posición está
    const posicion = ESTADOS.indexOf(tarea.estado);

    // Calculamos su nueva posición
    const nuevaPosicion = posicion + paso;

    // Comprobamos que no salga de las tres columnas
    if (nuevaPosicion < 0 || nuevaPosicion >= ESTADOS.length) return;

    // Cambiamos su estado
    tarea.estado = ESTADOS[nuevaPosicion];
};

// 4.2 · Añade una tarea nueva al array y la devuelve
const anadirTarea = (datos) => {
    // Calculamos el siguiente ID
    // Si no hay tareas, empezamos por el 1
    const siguienteId = tareas.length === 0
        ? 1
        : Math.max(...tareas.map(tarea => tarea.id)) + 1;

    // Creamos la nueva tarea
    const nuevaTarea = {
        id: siguienteId,
        titulo: datos.titulo,
        asignatura: datos.asignatura,
        horas: datos.horas,
        estado: 'porhacer',
        prioridad: datos.prioridad
    };

    // La añadimos al array principal
    tareas.push(nuevaTarea);

    // Devolvemos la tarea creada
    return nuevaTarea;
};

// 4.3 · Elimina del array las tareas hechas y devuelve cuántas eran
const archivarHechas = () => {
    // Guardamos cuántas tareas había antes de archivar
    const cantidadAntes = tareas.length;

    // Creamos un nuevo array sin las tareas terminadas
    tareas = tareas.filter(tarea => tarea.estado !== 'hecha');

    // Devolvemos cuántas hemos eliminado
    return cantidadAntes - tareas.length;
};

// 4.4 · Eventos del tablero, del buscador y del botón «Archivar hechas», y primer pintado
// Escuchamos los clics que se produzcan dentro del tablero
tablero.addEventListener('click', (evento) => {

    // Buscamos si se ha pulsado un botón de acción
    const boton = evento.target.closest('button[data-accion]');

    // Si no se ha pulsado uno, no hacemos nada
    if (!boton) return;

    // Buscamos la tarjeta a la que pertenece ese botón
    const tarjeta = boton.closest('li[data-id]');

    if (!tarjeta) return;

    // Obtenemos el ID y lo convertimos de texto a número
    const id = Number(tarjeta.dataset.id);

    // Avanzar significa +1; retroceder significa -1
    const paso = boton.dataset.accion === 'avanzar' ? 1 : -1;

    // Movemos la tarea y actualizamos la página
    moverTarea(id, paso);
    repintar();
});

// Cuando escribimos en el buscador, repintamos el tablero
buscador.addEventListener('input', repintar);

// Cuando pulsamos archivar, eliminamos las tareas hechas
botonArchivar.addEventListener('click', () => {
    archivarHechas();
    repintar();
});

// Primer pintado al cargar la página
repintar();
// 4.5 · Envío del formulario
formularioTarea.addEventListener('submit', (evento) => {

    // Evitamos que la página se recargue al enviar
    evento.preventDefault();

    // Comprobamos el límite de horas pendientes
    comprobarHoras();

    // Guardamos todos los campos que tenemos que validar
    const campos = [
        formularioTarea.elements.titulo,
        formularioTarea.elements.asignatura,
        campoHoras,
        formularioTarea.elements.prioridad
    ];

    // Validamos todos los campos y guardamos los resultados
    const resultados = campos.map(campo => validarCampo(campo));

    // Buscamos la posición del primer campo inválido
    const primerInvalido = resultados.indexOf(false);

    // Si encontramos algún campo inválido...
    if (primerInvalido !== -1) {

        // Ponemos el cursor en el primer campo incorrecto
        campos[primerInvalido].focus();

        // Terminamos sin añadir la tarea
        return;
    }

    // Recogemos los datos del formulario
    const datos = {
        titulo: formularioTarea.elements.titulo.value.trim(),
        asignatura: formularioTarea.elements.asignatura.value,
        horas: Number(campoHoras.value),
        prioridad: formularioTarea.elements.prioridad.value
    };

    // Añadimos la tarea al array
    const nuevaTarea = anadirTarea(datos);

    // Limpiamos el formulario
    limpiarFormulario();

    // Actualizamos el tablero y el resumen
    repintar();

    // Mostramos el mensaje de confirmación
    mensajeFormulario.textContent = `Tarea añadida: ${nuevaTarea.titulo}`;
});