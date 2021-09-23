const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

module.exports = class Room {

  constructor(no_rooms,amenities,price) {
    this.no_rooms=no_rooms;
    this.amenities=amenities;
    this.price=price;
}

  //create new room
  save = () =>{
    const db = getDb();
    return  db.collection('rooms').insertOne(this); 
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


