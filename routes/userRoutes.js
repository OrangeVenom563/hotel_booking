const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/create-user',userController.createUser)

router.post('/create-booking',userController.createBooking)

module.exports = router