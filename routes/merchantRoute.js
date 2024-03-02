const express = require('express');
const merchantController = require('../controllers/merchantController');
const {authMiddleware} = require('../middlewares/auth');
const router = express.Router();

router.post('/create', authMiddleware, merchantController.create);
router.get('/list', authMiddleware, merchantController.list);
router.get('/:id', authMiddleware, merchantController.retrieve);
router.put('/:id', authMiddleware, merchantController.update);
router.delete('/:id', authMiddleware, merchantController.destroy);

module.exports = router;