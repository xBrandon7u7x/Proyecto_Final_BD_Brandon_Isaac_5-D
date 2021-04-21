/*jshint esversion: 8*/
const express = require('express');
const app = express();

// app.use('/usuario', require('./usuario/usuario'));
// app.use('/mascota', require('./mascota/mascota'));
// app.use('/tienda', require('./tienda/tienda'));
// app.use('/compra', require('./tienda/compra'));
app.use('/persona', require('./persona/persona'));
app.use('/almacen', require('./proveedor/almacen'));
app.use('/inventario', require('./tienda2/inventario'));
app.use('/producto', require('./producto/producto'));
app.use('/proveedor', require('./proveedor/proveedor'));
app.use('/tienda2', require('./tienda2/tienda2'));
app.use('/venta', require('./tienda2/venta'));


module.exports = app;