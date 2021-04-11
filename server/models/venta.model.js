/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ventaSchema = new Schema({
    idPersona: {
        type: mongoose.Types.ObjectId,
        ref: 'persona',
        required: [true, 'Favor de ingresar un identificador unico de persona.']
    },
    dteFecha: {
        type: Date,
        required: [true, 'Favor de insertar la fecha']
    },
    nmbCantidad: {
        type: Number,
        required: [true, 'Favor de insertar la cantidad']
    },
    nmbTotalPrecio:{
        type: Number,
        required: [true, 'Favor de insertar el total.']
    },
    strMetodoPago:{
        type: String,
        required: [true, 'Favor de insertar el metodo de pago']
    },
    idProducto:{
        type: mongoose.Types.ObjectId,
        ref: 'producto',
        required: [true, 'Favor de ingresar un identificador unico de producto.']
    } 
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "venta"
});

module.exports = mongoose.model('Venta', ventaSchema);