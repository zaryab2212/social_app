const mongoose = require("mongoose");

exports.connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Social_App", {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    });

    console.log("Data Base id connected succesfully");
  } catch (error) {
    console.log("Data Base Connection error");
  }
};
