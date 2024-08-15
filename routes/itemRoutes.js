const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemControllers');
const auth = require('../middlewares/auth');

router.get('/',itemController.getItems);
router.post('/',auth,itemController.createItem)
router.put('/:id',auth,itemController.updateItem);
router.delete('/',auth,itemController.deleteItem);

module.exports = router;