const coche = {
    marca : 'Ferrari',
    modelo : 'A1',
    año : 2006,
    estaDisponible : false 
}

console.table(coche)

const{marca, modelo} = coche
console.log(marca)
console.log(modelo)

coche.estaDisponible = true
coche.color = 'Azul'
delete coche.año
console.log(coche)
