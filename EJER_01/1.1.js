const nombre = 'Pablo'
let edad = 20
const tieneMascota =true
if(tieneMascota==true){
    mensaje= 'tiene mascota'
}
else {
     mensaje='no tiene mascota'
}

edad = 21

const tieneMascota2 = false
if(tieneMascota2==true){
    mensaje2= 'tiene mascota'
}
else {
     mensaje2='no tiene mascota'
}

console.log('Mi nombre es:' + nombre +'--tipo--'+ typeof nombre)
console.log('Tengo:' + edad +'--tipo--'+ typeof edad)
console.log('Tiene mascota:' + tieneMascota +'--tipo--'+ typeof tieneMascota)


const frase= (`${nombre} tiene ${edad} años y ${mensaje2}`)
console.log(frase)