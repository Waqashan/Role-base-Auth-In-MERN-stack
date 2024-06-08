const mongoose = require("mongoose");
const db = () => {
  mongoose
    .connect(process.env.MONGOLAB_URI)
    .then(() => {
      console.log("Mongo DataBase connected successfully");
    })
    .catch((err) => {
      console.log("db is not connetected check connection", err);

    });
};

module.exports=db
