const express = require('express')
const router = express.Router();
const userController = require("../controllers/userController.js");
// const auth = require('../middlewares/auth');

router.post('/signup',userController.createUser);
router.post('/login',userController.loginUser)
router.delete('/:id',userController.deleteUser);
// router.put('/:id',userController.updateUser);
module.exports = router;