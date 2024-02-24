const mongoose = require("mongoose");

exports.connection = async () => {
  try {
    // "mongodb+srv://jessiep1232:RuCaCHz0o1llwHAV@blogapp.ysghny1.mongodb.net/?retryWrites=true&w=majority"

    // mongodb+srv://jessiep1232:RuCaCHz0o1llwHAV@socialapp.e8jm7ik.mongodb.net/Social_App?retryWrites=true&w=majority
    ("mongodb+srv://jessiep1232:jO6dUQpXbMGCHtog@socialapp.e8jm7ik.mongodb.net/?retryWrites=true&w=majority");
    //localhost:27017
    await mongoose.connect(
      "mongodb+srv://jessiep1232:jO6dUQpXbMGCHtog@socialapp.e8jm7ik.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,

        useUnifiedTopology: true,
      }
    );

    console.log("Data Base id connected succesfully");
  } catch (error) {
    console.log("Data Base Connection error jessiep1232 jO6dUQpXbMGCHtog ");
  }
};
