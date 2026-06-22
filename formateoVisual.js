// formateoVisual.js

function formatearMoneda(numero) {
    return `$${numero.toLocaleString("es-AR")}`;
}

function formatearTitulo(texto) {
    return texto.toUpperCase();
}

function separador() {
    return "========================================";
}

module.exports = { formatearMoneda, formatearTitulo, separador };