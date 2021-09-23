const User = require('../models/userModel');
const Booking = require('../models/booking');

exports.createUser = (req,res)=>{
    const u_name = req.body.u_name;
    const age = req.body.age;
    const gender = req.body.gender;
    const ph_no = req.body.ph_no;
    const address = req.body.address;

    if(!u_name||!age||!gender||!ph_no||!address)
    {
        res.send({message:"Add all the fields"})
        return
    }
    const user = new User(u_name,age,gender,ph_no,address)
    user.save()
    .then(_=>res.json({message:"Created User Successfully"}))
    .catch(err=>{
        console.log(err)
        res.status(422).json({message:"Error occured"})
    })
}

//user creating new booking
exports.createBooking = (req,res)=>{
    const u_id = req.body.user_id;
    const date = req.body.booking_date;
    const s_time = req.body.entry_time;
    const e_time = req.body.exit_time;
    const r_id = req.body.room_id;

    if(!u_id||!date||!s_time||!e_time||!r_id){
        res.send({message:"Add all the fields"})
    }

    const booking = new Booking(u_id,date,s_time,e_time,r_id)
    booking.save()
    .then(result=>res.json({message:result}))
    .catch(_=>res.status(422).json({message:"Error occured"}))
}

