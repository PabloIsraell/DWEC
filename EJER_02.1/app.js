
// APP.JS
// Ejercicios 2.3, 2.4, 2.5, 2.6 y 2.7

// Importar las funciones de biblioteca.js
import {
    agregarLibro,
    obtenerLibros,
    buscarLibro,
    eliminarLibro,
    calcularTotalPaginas,
    ordenarPorPaginas,
    hayLibrosLargos,
    todosSonLibrosCortosº
} from "./biblioteca.js";


// EJERCICIO 2.3

// Mostrar la colección inicial
console.log(obtenerLibros());

// Crear un nuevo libro
const nuevoLibro = {
    id: 11,
    titulo: "Harry Potter",
    autor: "J.K. Rowling",
    paginas: 500
};

// Añadir el libro
agregarLibro(nuevoLibro);

// Comprobar que se ha añadido
console.log(obtenerLibros());


// EJERCICIO 2.4

// Buscar un libro por ID → find()
console.log(buscarLibro(3));

// Eliminar un libro por ID
eliminarLibro(3);

// Mostrar la colección después de eliminarlo
console.log(obtenerLibros());


// EJERCICIO 2.5

// Calcular la suma de todas las páginas → reduce()
console.log(calcularTotalPaginas());


// EJERCICIO 2.6

// Mostrar libros antes de ordenar
console.log(obtenerLibros());

// Ordenar de menor a mayor número de páginas → sort()
ordenarPorPaginas();

// Mostrar libros después de ordenar
console.log(obtenerLibros());


// EJERCICIO 2.7

// ¿Hay AL MENOS un libro con más de 1000 páginas? → some()
console.log(hayLibrosLargos(1000));

// ¿TODOS tienen menos de 4000 páginas? → every()
console.log(todosSonLibrosCortos(4000));

