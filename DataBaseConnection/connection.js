const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.Data_base_url);
    console.log("Database connected");
  } catch (err) {
    console.error(err);
  }
};
module.exports = connection;
