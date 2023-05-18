const { Router } = require('express');
const { check } = require('express-validator');
const { GetHabitacion, PostHabitacion, PutHabitacion, DeleteHabitacion} = require('../controllers/HabitacionController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { esAdminHotel } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', GetHabitacion);

router.post('/agregar',[
    validarJWT,
    esAdminHotel,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('precio', 'el precio es obligatorio').isNumeric().not().isEmpty(),
    validarCampos
] , PostHabitacion);

router.delete('/delete/:id', [
    validarJWT,
    esAdminHotel
] , DeleteHabitacion);

router.put('/editar/:id',[
    validarJWT,
    esAdminHotel,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('precio', 'el precio es obligatorio').isNumeric(),
    validarCampos
], PutHabitacion)


module.exports = router;