/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;
const almacenModel = require('./almacen.model');

const proveedorSchema = new Schema({
    idPersona: {
        type: mongoose.Types.ObjectId,
        ref: 'persona',
        required: [true, 'Favor de ingresar un identificador unico de persona.']
    },
    strEmpresa: {
        type: String,
        required: [true, 'Favor de insertar la empresa.']
    },
    strDireccionEmpresa: {
        type: String,
        required: [true, 'Favor de insertar la direccion de la empresa.']
    },
    ajsnAlmacen: [almacenModel.schema],
    
    blnActivo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "proveedor"
});

module.exports = mongoose.model('Proveedor', proveedorSchema);