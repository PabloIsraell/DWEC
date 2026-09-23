const producto = {
    nombre: 'Ocarina',
    precio: 20
}

const cliente = {
    nombreCliente: 'Ana',
    esPremium: true
}


const cliente2 = {
    nombre: 'Luis',
}

const pedido = {...cliente, ...producto}
console.log(pedido)

const pedido2 = { ...cliente2, ...producto}
console.log(pedido2)

const pedido3 = {...producto, ...cliente2}
console.log(pedido3)