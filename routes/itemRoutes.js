const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemControllers')

router.post('/',itemController.createItem)
router.get('/',itemController.getItems);
router.put('/:id',itemController.updateItem);
router.delete('/',itemController.deleteItem);

module.exports = router;