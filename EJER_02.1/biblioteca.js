
// Array de objetos.
// Si piden crear una colección de elementos → array de objetos.
const libros = [
    {
        id: 1,
        titulo: "La Biblia 2",
        autor: "Yo",
        paginas: 3000
    },
    {
        id: 2,
        titulo: "El Señor de los Anillos",
        autor: "J.R.R. Tolkien",
        paginas: 1200
    },
    {
        id: 3,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        paginas: 400
    },
    {
        id: 4,
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        paginas: 96
    },
    {
        id: 5,
        titulo: "El Aleph",
        autor: "Jorge Luis Borges",
        paginas: 320
    },
    {
        id: 6,
        titulo: "La Casa de los Espíritus",
        autor: "Isabel Allende",
        paginas: 500
    },
    {
        id: 7,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        paginas: 400
    },
    {
        id: 8,
        titulo: "El Quijote",
        autor: "Miguel de Cervantes",
        paginas: 1000
    },
    {
        id: 9,
        titulo: "La Biblia 2",
        autor: "Yo",
        paginas: 3000
    },
    {
        id: 10,
        titulo: "El Aleph",
        autor: "Jorge Luis Borges",
        paginas: 320
    }
];

// Añadir un elemento al array → push()
function agregarLibro(nuevoLibro) {
    libros.push(nuevoLibro);
}

// Devolver todo el array
function obtenerLibros() {
    return libros;
}

// Buscar UN elemento → find()
function buscarLibro(id) {
    return libros.find(libro => libro.id === id);
}

// Buscar la posición → findIndex()
// Después eliminar → splice()
function eliminarLibro(id) {
    const index = libros.findIndex(libro => libro.id === id);

    // Si encuentra el libro, lo elimina
    if (index !== -1) {
        libros.splice(index, 1);
    }
}

// Sumar todos los valores → reduce()
function calcularTotalPaginas() {
    return libros.reduce(
        (total, libro) => total + libro.paginas,
        0
    );
}

// Ordenar números de menor a mayor → sort()
function ordenarPorPaginas() {
    libros.sort((a, b) => a.paginas - b.paginas);
}

// ¿Hay AL MENOS UNO que cumpla? → some()
// Devuelve true o false.
function hayLibrosLargos(limitePaginas) {
    return libros.some(libro => libro.paginas > limitePaginas);
}

// ¿TODOS cumplen la condición? → every()
// Devuelve true o false.
function todosSonLibrosCortos(limitePaginas) {
    return libros.every(libro => libro.paginas < limitePaginas);
}

// Exportar las funciones para poder utilizarlas desde app.js

export {
    agregarLibro,
    obtenerLibros,
    buscarLibro,
    eliminarLibro,
    calcularTotalPaginas,
    ordenarPorPaginas,
    hayLibrosLargos,
    todosSonLibrosCortos
};

