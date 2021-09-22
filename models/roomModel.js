const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

module.exports = class Room {
  constructor(no_rooms,amenities,price) {
    this.no_rooms=no_rooms,
    this.amenities=amenities,
    this.price=price
}

  //create new room
  save = () =>{
    const db = getDb();
    return  db.collection('rooms').insertOne(this); 
  }

  //booking a room 
  static createBooking(u_name,date,s_time,e_time,r_id) {
      const booking={
        user_name:u_name,
        booking_date:date,
        start_time:s_time,
        end_time:e_time,
        room_id:new mongodb.ObjectId(r_id),
        booking_id:new mongodb.ObjectId()
      }
  
    const db = getDb();
    return db.collection('rooms')
      .updateOne({_id:booking.room_id}, { $addToSet: { bookings: booking } })
  }

  
   //gets all the rooms with booking
  static getAll(cb){
    const db = getDb();
    return db.collection('rooms')
      .find()
      .toArray()
      .then(rooms => cb(rooms))
      .catch(err => {
        console.log(err);
        cb('error occured')
      });
 }
};


