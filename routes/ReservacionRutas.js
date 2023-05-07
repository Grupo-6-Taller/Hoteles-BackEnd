const { Router } = require('express');
const { check } = require('express-validator');
const { GetReservacion, DeleteReservacion, PostReservacion, PutReservacion, PostServicio} = require('../controllers/ReservacionController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { IdServicio, esRoleValido, existIdOfUser, idHotel, idHabitacion, idReservacion } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', GetReservacion);

router.post('/agregar',[
    validarJWT,
    check('dias', 'los dias son obligatorio para agregar').not().isEmpty(),
    check('habitacion').custom(idHabitacion),
    validarCampos
], PostReservacion);

router.post('/agregarServicio/:_id',[
    validarJWT,
    check('servicio').custom(IdServicio),
    validarCampos
] ,PostServicio);

router.delete('/delete/:id',[
    validarJWT,
    check('id').custom(idReservacion),
    validarCampos
],  DeleteReservacion);

router.put('/editar/:id',[
    validarJWT,
    check('dias', 'los dias son obligatorio para agregar').not().isEmpty(),
    check('habitacion').custom(idHabitacion),
    validarCampos
],  PutReservacion)


module.exports = router;