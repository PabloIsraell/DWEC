const producto = {
    nombre: 'Ocarina',
    precio: 20
}

const cliente = {
    nombreCliente: 'Ana',
    esPremium: true
}


const cliente2 = {
    nombreCliente: 'Luis',
    esPremium: false
}

const pedido = {...cliente, ...producto}
console.log(pedido)


