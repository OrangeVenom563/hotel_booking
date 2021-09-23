const Room = require('../models/roomModel');

exports.createNewRoom = (req,res)=>{
    const no_rooms = req.body.no_rooms;
    const amenities = req.body.amenities;
    const price = req.body.price;

    if(!no_rooms,!amenities,!price){
        res.send({message:"Add all the field"})
        console.log(no_rooms,amenities,price)
        return
    }

    const room = new Room(no_rooms,amenities,price);
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