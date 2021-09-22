const router = require('express').Router();
const roomController = require('../controllers/roomController')

router.post('/create-room',roomController.createNewRoom)

router.post('/create-booking',roomController.createBooking)

router.get('/all-rooms', roomController.getAllRooms)

module.exports = router;