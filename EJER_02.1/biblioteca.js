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
]

function agregarLibro(nuevoLibro){
    libros.push(nuevoLibro)
}


function agregarLibros(libros){
    const nuevoLibro= {
        id: libros.length +1,
        titulo: "Nuevo libro",
        autor: "No sé jaja",
        paginas: 100
    }
    libros.push(nuevoLibro);
}

function obtenerLibros(){
    return libros;
}

export { agregarLibro, obtenerLibros, agregarLibros };

function buscarLibro(id){
    return libros.find(libro => libro.id == id);
}


function eliminarLibro(id){
    return
}