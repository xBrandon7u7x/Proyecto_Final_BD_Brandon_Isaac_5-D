/*jshint esversion: 9*/
const tienda2Model = require('../../models/tienda2.model');
const ventaModel = require('../../models/venta.model');
const express = require('express');
const app = express();
const date = new Date();


// http://localhost:3000/api/compra/?idTienda=603e51f51a35a066388f0f28
app.get('/', async(req, res) => {

    try {

        let idVenta = '';

        const idTienda2 = req.query.idTienda2;

        if (req.query.idVenta)
            idVenta = req.query.idVenta;

        let queryFind = {};

        if (idVenta) {
            queryFind = {
                '_id': idTienda2,
                'ajsnVenta._id': idVenta
            };
        } else {
            queryFind = {
                '_id': idTienda2
            };
        }

        if (idTienda2 == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        const tienda2 = await tienda2Model.find(queryFind);

        if (tienda2.length <= 0) {
            res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'No se encontraron ventas en la base de datos.',
                cont: {
                    tienda2
                }
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion obtenida correctamente.',
                cont: {
                    tienda2
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al obtener las ventas.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }


});

// http://localhost:3000/api/compra/?idTienda=603e51f51a35a066388f0f28
app.post('/', async(req, res) => {

    try {
        const idTienda2 = req.query.idTienda2;

        if (idTienda2 == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        const venta = new ventaModel(req.body);
        let err = venta.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al Insertar la venta.',
                cont: {
                    err
                }
            });
        }

        const nuevaVenta = await tienda2Model.findByIdAndUpdate(idTienda2, { $push: { 'ajsnVenta': venta } }, { new: true });

        if (nuevaVenta.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo registrar la venta en la base de datos.',
                cont: 0
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion insertada correctamente.',
                cont: {
                    venta
                }
            });
        }
    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al registrar la venta.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

app.put('/', async(req, res) => {

    try {

        const idTienda2 = req.query.idTienda2;
        const idVenta = req.query.idVenta;

        if (idTienda2 == undefined || idVenta == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        req.body._id = idVenta;

        const venta = new ventaModel(req.body);
        let err = venta.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al actualizar la venta.',
                cont: {
                    err
                }
            });
        }


        const nuevaVenta = await tienda2Model.findOneAndUpdate({ '_id': idTienda2, 'ajsnVenta._id': idVenta }, { $set: { 'ajsVenta.$.idPersona': venta.idPersona, 'ajsnVenta.$.dteFecha': venta.dteFecha, 'ajsnVenta.$.nmbCantidad': venta.nmbCantidad, 'ajsVenta.$.nmbTotalPrecio': venta.nmbTotalPrecio, 'ajsVenta.$.strMetodoPago': venta.strMetodoPago, 'ajsVenta.$.idProducto': venta.idProducto} }, { new: true });

        if (nuevaVenta.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo actualizar la venta en la base de datos.',
                cont: 0
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion actualizada correctamente.',
                cont: {
                    venta
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al actualizar la venta.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

});


app.delete('/', async(req, res) => {

    try {

        const idTienda2 = req.query.idTienda2;
        const idVenta = req.query.idVenta;
        const blnActivo = req.body.blnActivo;

        if (idTienda2 == undefined || idVenta == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }


        const nuevaVenta = await tienda2Model.findOneAndUpdate({ '_id': idTienda2, 'ajsnVenta._id': idVenta }, { $set: { 'ajsnVenta.$.blnActivo': blnActivo } }, { new: true });

        if (nuevaVenta.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo eliminar la venta en la base de datos.',
                cont: 0
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion eliminada correctamente.',
                cont: {
                    nuevaVenta
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al actualizar la venta.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

});

module.exports = app;