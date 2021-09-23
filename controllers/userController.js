const User = require('../models/userModel');
const Booking = require('../models/booking');
const Room = require('../models/roomModel');

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

    const bookingData = {
         property_name : req.body.property_name,
         user_name : req.body.user_name,
         room_no : req.body.room_no,
         user_id : req.body.user_id,
         in_date : req.body.in_date,
         in_time : req.body.in_time,
         out_date : req.body.out_date,
         out_time : req.body.out_time,
         room_id : req.body.room_id,
    }

    const hasData = Object.values(bookingData).every(x => x != undefined && x != '');

    if(!hasData){
        res.send({message:"Add all the fields"});
        console.log(bookingData)
        return;
    }

    const booking = new Booking(bookingData)

    const isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
         someDate.getMonth() == today.getMonth() &&
         someDate.getFullYear() == today.getFullYear()
    }

    if(isToday(new Date(bookingData.in_date))){
        bookForNow(booking,res)
    }
    else{
        const duration = `${bookingData.in_date} ${bookingData.out_date}`
        bookForLater(booking,res,duration)
    }
}

const bookForNow = (booking,res)=>{
    booking.save()
    .then(_=>Room.changeStatus(booking.room_id))
    .then(_=>res.json({message:"Booked room successfully"}))
    .catch(_=>res.status(422).json({message:"Error occured"}))
}

const bookForLater = (booking,res,duration)=>{
    booking.save()
    .then(_=>Room.addUpComingBook(booking.room_id,duration))
    .then(_=>res.json({message:"Booked room successfully"}))
    .catch(_=>res.status(422).json({message:"Error occured"}))
}

exports.getBookings = (req,res)=>{

    const u_id = req.params.u_id;

    Booking.getBookingByUser(u_id)
    .then(result=>res.send({message:result}))
    .catch(err=>res.send({message:"error occured"}))
}





