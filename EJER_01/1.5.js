const estudiantes = [
    { nombre: "Juan", apellidos: "Pérez", calificacion: 8.5, aprobado: true },
    { nombre: "Ana", apellidos: "Gómez", calificacion: 9.0, aprobado: true },
    { nombre: "Luis", apellidos: "López", calificacion: 4.5, aprobado: false },
    { nombre: "María", apellidos: "Martínez", calificacion: 9.5, aprobado: true }
]

const idEstudiantes =  estudiantes.map((estudiante, index) => ({
    ...estudiante,
    id: index +1
}))

const estudiantesAprobados = idEstudiantes.filter(estudiante => estudiante.calificacion >=5)
console.log(estudiantesAprobados)


