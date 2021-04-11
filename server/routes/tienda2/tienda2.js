/*jshint esversion: 9*/
const tienda2Model = require('../../models/tienda2.model');
const Helper = require("../../libraries/helper");
const express = require('express');
const app = express();

// http://localhost:3000/api/tienda/
app.get('/', async(req, res) => {
    try {
        if (req.query.idTienda2) req.queryMatch._id = req.query.idTienda2;
        if (req.query.termino) req.queryMatch.$or = Helper(["strNombre", "strDireccion", "strUrlWeb"], req.query.termino);

        const tienda2 = await tienda2Model.aggregate();

        if (tienda2.length <= 0) {
            res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'No se encontraron tiendas en la base de datos.',
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
            msg: 'Error al obtener las tiendas.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

// http://localhost:3000/api/tienda/
app.post('/', async(req, res) => {

    try {
        const tienda2 = new tienda2Model(req.body);

        let err = tienda2.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al Insertar la tienda.',
                cont: {
                    err
                }
            });
        }

        const tienda2Encontrada = await tienda2Model.findOne({ strDireccion: { $regex: `^${tienda2.strDireccion}$`, $options: 'i' } });
        if (tienda2Encontrada) return res.status(400).json({
            ok: false,
            resp: 400,
            msg: `La tienda que se desea insertar con la direccion ${tienda2.strDireccion} ya se encuentra registrada en la base de datos.`,
            cont: 0
        });

        const nuevaTienda2 = await tienda2.save();
        if (nuevaTienda2.length <= 0) {
            res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'No se pudo registrar la tienda en la base de datos.',
                cont: {
                    nuevaTienda2
                }
            });
        } else {
            res.status(200).send({
                estatus: '200',
                err: false,
                msg: 'Informacion insertada correctamente.',
                cont: {
                    nuevaTienda2
                }
            });
        }
    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error al registrar la tienda.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

// http://localhost:3000/api/tienda/?idTienda=603e51f51a35a066388f0f28
app.put('/', async(req, res) => {
    try {

        const idTienda2 = req.query.idTienda2;

        if (idTienda2 == '') {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        req.body._id = idTienda2;

        const tienda2Encontrada = await tienda2Model.findById(idTienda2);

        if (!tienda2Encontrada)
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro la tienda en la base de datos.',
                cont: tienda2Encontrada
            });

        const newTienda2 = new tienda2Model(req.body);

        let err = newTienda2.validateSync();

        if (err) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Error al actualizar la tienda.',
                cont: {
                    err
                }
            });
        }

        const tienda2Actualizada = await tienda2Model.findByIdAndUpdate(idTienda2, { $set: newTienda2 }, { new: true });

        if (!tienda2Actualizada) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Al intentar actualizar la tienda.',
                cont: 0
            });
        } else {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: 'Success: Se actualizo la tienda correctamente.',
                cont: {
                    tienda2Actualizada
                }
            });
        }

    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al actualizar la tienda.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }
});

// http://localhost:3000/api/tienda/?idTienda=603e51f51a35a066388f0f28
app.delete('/', async(req, res) => {

    try {

        if (req.query.idTienda2 == '') {
            return res.status(400).send({
                estatus: '400',
                err: true,
                msg: 'Error: No se envio un id valido.',
                cont: 0
            });
        }

        idTienda2 = req.query.idTienda2;
        blnActivo = req.body.blnActivo;

        const tienda2Encontrada = await tienda2Model.findById(idTienda2);

        if (!tienda2Encontrada)
            return res.status(404).send({
                estatus: '404',
                err: true,
                msg: 'Error: No se encontro la tienda en la base de datos.',
                cont: tienda2Encontrada
            });

        const tienda2Actualizada = await tienda2Model.findByIdAndUpdate(idTienda2, { $set: { blnActivo } }, { new: true });

        if (!tienda2Actualizada) {
            return res.status(400).json({
                ok: false,
                resp: 400,
                msg: 'Error: Al intentar eliminar la tienda.',
                cont: 0
            });
        } else {
            return res.status(200).json({
                ok: true,
                resp: 200,
                msg: `Success: Se a ${blnActivo === 'true'? 'activado': 'desactivado'} la tienda correctamente.`,
                cont: {
                    tienda2Actualizada
                }
            });
        }


    } catch (err) {
        res.status(500).send({
            estatus: '500',
            err: true,
            msg: 'Error: Error al eliminar a la tienda.',
            cont: {
                err: Object.keys(err).length === 0 ? err.message : err
            }
        });
    }

});


module.exports = app;