// index.js
const productos = require("./baseDeDatosSimulada");
const { sumarSubtotales, calcularIVA, aplicarDescuento, restarStock } = require("./calculosMatematicos");
const { formatearMoneda, formatearTitulo, separador } = require("./formateoVisual");

// 1. MOSTRAR INVENTARIO INICIAL
console.log(separador());
console.log(formatearTitulo("inventario inicial"));
console.log(separador());
productos.forEach(p => {
    console.log(`ID: ${p.id} | ${p.nombre} | Precio: ${formatearMoneda(p.precio)} | Stock: ${p.stock}`);
});

// 2. SIMULAR UNA VENTA (3 artículos del catálogo)
const carrito = [
    { id: 1, cantidad: 2 }, // 2 Remeras Oversize
    { id: 3, cantidad: 1 }, // 1 Buzo canguro
    { id: 4, cantidad: 1 }, // 1 Campera deportiva
];

// Armar los items con precio incluido para el cálculo
const itemsConPrecio = carrito.map(item => {
    const producto = productos.find(p => p.id === item.id);
    return { ...item, precio: producto.precio, nombre: producto.nombre };
});

console.log("\n" + separador());
console.log(formatearTitulo("detalle de la venta"));
console.log(separador());
itemsConPrecio.forEach(item => {
    console.log(`${item.nombre} x${item.cantidad} = ${formatearMoneda(item.precio * item.cantidad)}`);
});

// 3. APLICAR REGLAS DE NEGOCIO
const subtotal = sumarSubtotales(itemsConPrecio);
const descuento = aplicarDescuento(subtotal);
const baseConDescuento = subtotal - descuento;
const iva = calcularIVA(baseConDescuento);
const total = baseConDescuento + iva;

console.log("\n" + separador());
console.log(formatearTitulo("resumen del presupuesto"));
console.log(separador());
console.log(`Subtotal:   ${formatearMoneda(subtotal)}`);
console.log(`Descuento:  -${formatearMoneda(descuento)}`);
console.log(`IVA (21%):  +${formatearMoneda(iva)}`);
console.log(`TOTAL:      ${formatearMoneda(total)}`);

// 4. ACTUALIZAR STOCK
restarStock(productos, carrito);

console.log("\n" + separador());
console.log(formatearTitulo("stock actualizado"));
console.log(separador());
productos.forEach(p => {
    console.log(`ID: ${p.id} | ${p.nombre} | Stock restante: ${p.stock}`);
});