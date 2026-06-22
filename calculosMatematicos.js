// calculosMatematicos.js

function sumarSubtotales(productos) {
    let subtotal = 0;
    productos.forEach(item => {
        subtotal += item.precio * item.cantidad;
    });
    return subtotal;
}

function calcularIVA(subtotal) {
    return subtotal * 0.21; // IVA del 21%
}

function aplicarDescuento(subtotal) {
    if (subtotal > 50000) {
        return subtotal * 0.10; // 10% de descuento
    }
    return 0;
}

function restarStock(productos, carrito) {
    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        if (producto) {
            producto.stock -= item.cantidad;
        }
    });
}

module.exports = { sumarSubtotales, calcularIVA, aplicarDescuento, restarStock };