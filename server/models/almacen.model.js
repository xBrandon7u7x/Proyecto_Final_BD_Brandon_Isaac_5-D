/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
const date = Date();


const almacenSchema = new Schema({
    idProducto: {
        type: mongoose.Types.ObjectId,
        ref: 'producto',
        required: [true, 'Favor de ingresar un identificador unico de producto.']
    },
    nmbCantidad: {
        type: Number
    },
    strCategoria: {
        type: String,
        required: [true, 'Favor de insertar la categoria']
    },
    arrFechaIngreso:[]
    // date: [arrFechaIngreso.push(date)],
    
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "almacen"
});

module.exports = mongoose.model('Almacen', almacenSchema);