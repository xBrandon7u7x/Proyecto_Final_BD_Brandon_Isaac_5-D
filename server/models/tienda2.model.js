/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ventaModel = require('./venta.model');
const inventarioModel = require('./inventario.model');

const tienda2Schema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Favor de insertar el nombre de la tienda.']
    },
    strDireccion: {
        type: String,
        required: [true, 'Favor de insertar la dirección de la tienda.']
    },
    strTelefono: String,
    strUrlWeb: String,
    arrSucursales: [

    ], 
    ajsnVenta: [ventaModel.schema], //Creación de un Array de Json
    ajsnInventario: [inventarioModel.schema],
    arrProveedores:[{
        type: mongoose.Types.ObjectId,
        ref: 'proveedor'
    }],
    blnActivo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "tienda2"
});

module.exports = mongoose.model('Tienda2', tienda2Schema);