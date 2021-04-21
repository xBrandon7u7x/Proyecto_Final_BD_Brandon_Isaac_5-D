/*jshint esversion: 8*/
const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Favor de insertar el nombre.']
    },
    strApellidos: {
        type: String,
        required: [true, 'Favor de insertar sus apellidos.']
    },
    nmbEdad: {
        type: Number,
        required: [true, 'Favor de insertar su edad.']
    },
    strCorreo: {
        type: String,
        required: [true, 'Favor de insertar su correo.']
    },
    strDireccion: String,
    arrTelefonos: [
        
    ],
    strCurp: String,
    strPais: String,
    
    blnActivo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    collection: "persona"
});

module.exports = mongoose.model('Persona', personSchema);