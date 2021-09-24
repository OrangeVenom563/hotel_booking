const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

module.exports = class Room {
  constructor(name, room_no, amenities, price, address) {
    this.property_name = name;
    this.room_no = room_no;
    this.amenities = amenities;
    this.price = price;
    this.address = address;
    this.upcoming_bookings=[];
    this.status = "available";
  }

  //create new room
  save = () => {
    const db = getDb();
    return db.collection("rooms").insertOne(this);
  };

  //change current status of a room
  static changeStatus(r_id){
    const db = getDb();
    return db
      .collection("rooms")
      .updateOne({_id:new mongodb.ObjectId(r_id)},{$set:{status:"Booked"}})
      .then(_=>_)
  }

  static changeStatusFree(r_id){
    const db = getDb();
    return db
      .collection("rooms")
      .updateOne({_id:new mongodb.ObjectId(r_id)},{$set:{status:"Available"}})
      .then(_=>_)
  }

  //add future bookings made for room
  static addUpComingBook(r_id,booking){
    const db = getDb();
    return db
    .collection("rooms")
    .updateOne({_id:new mongodb.ObjectId(r_id)},{$push:{upcoming_bookings:booking}})
    .then(_=>_)
  }

  //gets all the rooms with booking
  static getAll(cb) {
    const db = getDb();
    return db
      .collection("rooms")
      .find()
      .toArray()
      .then(result=>{
        const updated_result= result.map(room=>{
          if(room.upcoming_bookings.length==0){
            return room
          }
          else {
            room.upcoming_bookings.map(date=>{
              const indate = date.split(' ');
              const isToday = (someDate) => {
                const today = new Date()
                return someDate.getDate() == today.getDate() &&
                 someDate.getMonth() == today.getMonth() &&
                 someDate.getFullYear() == today.getFullYear()
            }
            if(isToday(new Date(indate[0]))){
              room.status="Booked"
              Room.changeStatus(room._id)
            }
            })
            return room
          }
        })
        return updated_result
      })
      .then((rooms) => cb(rooms))
      .catch((err) => {
        console.log(err);
        cb("error occured");
      });
  }

};
