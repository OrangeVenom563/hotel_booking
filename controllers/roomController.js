const e = require('express');
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

exports.createBooking = (req,res)=>{
    const u_name = req.body.username;
    const date = req.body.booking_date;
    const s_time = req.body.entry_time;
    const e_time = req.body.exit_time;
    const r_id = req.body.room_id;

    if(!u_name||!date||!s_time||!e_time||!r_id){
        res.send({message:"Add all the fields"})
    }

    Room.createBooking(u_name,date,s_time,e_time,r_id)
    .then(result=>res.json({message:result}))
    .catch(_=>res.status(422).json({message:"Error occured"}))
}

exports.getAllRooms = (req,res)=>{
    Room.getAll((result=>res.send({message:result})))
}