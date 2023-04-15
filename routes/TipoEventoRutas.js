const { Router } = require('express');
const { check } = require('express-validator');
const {  getTipo, postTipo, putTipo, deleteTipo} = require('../controllers/TipoEventoController');

const router = Router();

router.get('/mostrar', getTipo);

router.post('/agregar', postTipo);

router.delete('/delete/:id', deleteTipo);

router.put('/editar/:id', putTipo)


module.exports = router;