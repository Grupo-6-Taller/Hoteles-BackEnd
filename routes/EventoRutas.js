const { Router } = require('express');
const { check } = require('express-validator');
const { getEvento, postEvento, putEvento, deleteEvento, getEventoId} = require('../controllers/EventoController');

const router = Router();

router.get('/mostrar', getEvento);

router.post('/agregar', postEvento);

router.delete('/delete/:id', deleteEvento);

router.put('/editar/:id', putEvento)


module.exports = router;