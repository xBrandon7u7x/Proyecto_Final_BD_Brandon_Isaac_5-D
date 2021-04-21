/*jshint esversion: 9*/
const tienda2Model = require('../../models/tienda2.model');
const inventarioModel = require('../../models/inventario.model');
const express = require('express');
const app = express();
const date = new Date();


// http://localhost:3000/api/compra/?idTienda=603e51f51a35a066388f0f28
app.get('/', async(req, res) => {

    try {

        let idInventario = '';

        const idTienda2 = req.query.idTienda2;

        if (req.query.idInventario)
            idInventario = req.query.idInventario;

        let queryFind = {};

        if (idInventario) {
            queryFind = {
                '_id': idTienda2,
                'ajsnInventario._id': idInventario
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
                msg: 'No se encontraron inventarios en la base de datos.',
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
            msg: 'Error al obtener los inventarios.',
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

        const inventario = new inventarioModel(req.body);
        let err = inventario.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al Insertar el inventario.',
                cont: {
                    err
                }
            });
        }


        const nuevoInventario = await tienda2Model.findByIdAndUpdate(idTienda2, { $push: { 'ajsnInventario': inventario } }, { new: true });

        if (nuevoInventario.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo registrar el inventario en la base de datos.',
                cont: 0
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion insertada correctamente.',
                cont: {
                    inventario
                }
            });
        }
    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al registrar el inventario.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

app.put('/', async(req, res) => {

    try {

        const idTienda2 = req.query.idTienda2;
        const idInventario = req.query.idInventario;

        if (idTienda2 == undefined || idInventario == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        req.body._id = idInventario;

        const inventario = new inventarioModel(req.body);
        let err = inventario.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al actualizar el inventario.',
                cont: {
                    err
                }
            });
        }


        const nuevoInventario = await tienda2Model.findOneAndUpdate({ '_id': idTienda2, 'ajsnInventario._id': idInventario }, { $set: { 'ajsInventario.$.nmbCantidad': inventario.nmbCantidad, 'ajsnInventario.$.idProducto': inventario.idProducto, 'ajsnInventario.$.strCategoria': inventario.strCategoria, 'ajsnInventario.$.date': inventario.arrFechaIngreso.push(date)} }, { new: true });

        if (nuevoInventario.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo actualizar el inventario en la base de datos.',
                cont: 0
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion actualizada correctamente.',
                cont: {
                    inventario
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al actualizar el inventario.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

});


app.delete('/', async(req, res) => {

    try {

        const idTienda2 = req.query.idTienda2;
        const idInventario = req.query.idInventario;
        const blnActivo = req.body.blnActivo;

        if (idTienda2 == undefined || idInventario == undefined) {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }


        const nuevoInventario = await tienda2Model.findOneAndUpdate({ '_id': idTienda2, 'ajsnInventario._id': idInventario }, { $set: { 'ajsnInventario.$.blnActivo': blnActivo } }, { new: true });

        if (nuevoInventario.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo eliminar el inventario en la base de datos.',
                cont: 0
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion eliminada correctamente.',
                cont: {
                    nuevoInventario
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al actualizar el inventario.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

});

module.exports = app;