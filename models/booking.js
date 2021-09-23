const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

module.exports = class Booking {

  constructor(u_id, date, s_time, e_time, r_id) {
    this.booking_date = date;
    this.start_time = s_time;
    this.end_time = e_time;
    this.room_id = new mongodb.ObjectId(r_id);
    this.user_id = new mongodb.ObjectId(u_id);
  }

  save() {
    const db = getDb();
    return db
      .collection("bookings")
      .insertOne(this);
  }
};
