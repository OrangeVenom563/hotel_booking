const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

module.exports = class Booking {
    
  constructor(u_name,age,gender,ph_no,address) {
    this.name=u_name;
    this.age=age;
    this.gender=gender;
    this.phone_number=ph_no;
    this.address=address;
  }

  save() {
    const db = getDb();
    return db.collection("users").insert(this)
  }
};
