const express = require('express')
const router = express.Router();
const cartController = require('../controllers/cartController.js');
const auth = require('../middlewares/auth');


router.get('/',auth,cartController.showCart);
router.post('/',auth,cartController.addToCart);
router.put('/',auth,cartController.editCart);
router.delete('/:id',auth,cartController.removeFromCart);


module.exports = router