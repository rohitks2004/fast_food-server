const express= require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')
const auth= require('../middlewares/auth');

router.post('/',auth,orderController.createOrder);
router.get('/',auth,orderController.showOrder);
router.put('/',auth,orderController.updateStatus);


module.exports = router
