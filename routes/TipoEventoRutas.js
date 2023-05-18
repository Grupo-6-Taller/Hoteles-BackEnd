const { Router } = require('express');
const { check } = require('express-validator');
const {  getTipo, postTipo, putTipo, deleteTipo} = require('../controllers/TipoEventoController');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminHotel } = require('../middlewares/validar-roles');
const { idTipo } = require('../helpers/db-validators');


const router = Router();

router.get('/mostrar' ,getTipo);

router.post('/agregar',[
    validarJWT,
    esAdminHotel,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    validarCampos
], postTipo);

router.delete('/delete/:id',[
    validarJWT,
    esAdminHotel,
    check('id', "id de mongo no existe").isMongoId(),
    check('id').custom(idTipo),
    validarCampos
] ,deleteTipo);

router.put('/editar/:id',[
    validarJWT,
    esAdminHotel,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('id').custom(idTipo),
    check('id', "id de mongo no existe").isMongoId(),
    validarCampos
],putTipo)


module.exports = router;