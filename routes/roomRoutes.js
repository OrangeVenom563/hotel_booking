const router = require('express').Router();
const roomController = require('../controllers/roomController')

router.post('/create-room',roomController.createNewRoom)
router.get('/all-rooms', roomController.getAllRooms)
router.get('/get-bookings/:r_id', roomController.getBookings)

module.exports = router;