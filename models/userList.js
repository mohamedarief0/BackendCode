const mongoose = require("mongoose");
//UserList for table
const userListSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  socialHandler: { type: String, required: true },
});

module.exports = mongoose.model("userList", userListSchema);
