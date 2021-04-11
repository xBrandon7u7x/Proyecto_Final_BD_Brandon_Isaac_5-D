/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
const date = Date();


const inventarioSchema = new Schema({
    idProducto:{
        type: mongoose.Types.ObjectId,
        ref: 'producto',
        required: [true, 'Favor de ingresar un identificador unico de producto.']
    },
    nmbCantidad: {
        type: Number,
        required: [true, 'Favor de insertar la cantidad']
    },
    strCategoria: {
        type: String,
        required: [true, 'Favor de insertar la categoria']
    },

    arrFechaIngreso:[]
        
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "inventario"
});

module.exports = mongoose.model('Inventario', inventarioSchema);