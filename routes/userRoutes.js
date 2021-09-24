const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/create-user',userController.createUser)
router.post('/create-booking',userController.createBooking)
router.get('/get-bookings/:u_id',userController.getBookings)
router.post('/checkin',userController.checkin)
router.post('/checkout',userController.checkout)

module.exports = router