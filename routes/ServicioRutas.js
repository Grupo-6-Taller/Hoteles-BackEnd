const { Router } = require('express');
const { check } = require('express-validator');
const { GetSerevicio, DeleteSerevicio, PostSerevicio, PutSerevicio} = require('../controllers/ServicioController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { esAdminRole } = require('../middlewares/validar-roles');
const { IdServicio } = require('../helpers/db-validators');

const router = Router();

router.get('/mostrar', GetSerevicio);

router.post('/agregar',[
    validarJWT,
    esAdminRole,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('precio', 'el precio es obligatorio para agregar').not().isEmpty(),
    validarCampos
] , PostSerevicio);

router.delete('/delete/:id',[
    validarJWT,
    esAdminRole,
    check('id', "id de mongo no existe").isMongoId(),
    check('id').custom(IdServicio),
    validarCampos
], DeleteSerevicio);

router.put('/editar/:id',[
    validarJWT,
    esAdminRole,
    check('nombre', 'el nombre es obligatorio para agregar').not().isEmpty(),
    check('precio', 'el precio es obligatorio para agregar').not().isEmpty(),
    check('id', "id de mongo no existe").isMongoId(),
    check('id').custom(IdServicio),
    validarCampos
] , PutSerevicio)


module.exports = router;