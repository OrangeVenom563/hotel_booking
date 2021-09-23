const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

module.exports = class Booking {
  constructor({property_name, user_name, room_no, user_id, in_date, in_time, out_date, out_time, room_id}) {
    this.property_name = property_name;
    this.user_name = user_name;
    this.room_no = room_no;
    this.user_id = new mongodb.ObjectId(user_id);
    this.checkin = `${in_date} ${in_time}`;
    this.checkout = `${out_date} ${out_time}`
    this.room_id = new mongodb.ObjectId(room_id);
  }

  save() {
    const db = getDb();
    return db.collection("bookings").insertOne(this)
    .then(_=>_);
  }

  static getBookingByUser(u_id) {
    const db = getDb();
    return db
      .collection("bookings")
      .find({ user_id: new mongodb.ObjectId(u_id)})
      .project({user_id:0,room_id:0})
      .toArray()
      .then((_) => _)
  }

  static getBookingByRoom(r_id) {
    const db = getDb();
    return db
      .collection("bookings")
      .find({ room_id: new mongodb.ObjectId(r_id)})
      .project({user_id:0,room_id:0})
      .toArray()
      .then((_) => _)
  }
};
