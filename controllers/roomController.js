const Room = require('../models/roomModel');
const Booking = require('../models/booking');

exports.createNewRoom = (req,res)=>{
    const name = req.body.property_name
    const room_no = req.body.room_no;
    const amenities = req.body.amenities;
    const price = req.body.price;
    const address = req.body.address;

    if(!name||!room_no,!amenities,!price||!address){
        res.send({message:"Add all the field"})
        console.log(name,room_no,amenities,price,address)
        return
    }

    const room = new Room(name,room_no,amenities,price,address);
    room.save()
    .then(_=>res.json({message:"Added successfully"}))
    .catch(err=>{
        console.log(err)
        res.status(422).json({message:"error occured"})
    })
}

exports.getAllRooms = (req,res)=>{
    Room.getAll((result=>res.send({message:result})))
}

exports.getBookings = (req,res)=>{
    const r_id=req.params.r_id;
    Booking.getBookingByRoom(r_id)
    .then(result=>console.log(result))
    .then(result=>res.send({message:result}))
    .catch(err=>res.status(422).send({message:"error occured"}))
}