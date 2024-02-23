const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const path = require("path");
const app = express();
const multer = require("multer");
const { connection } = require("./Database/Db");
const { registerUser } = require("./Controllers/Auth");
const authRouter = require("./Routes/Auth");
const UserRouter = require("./Routes/User");
const PostRouter = require("./Routes/Post");
const { createPost } = require("./Controllers/Post");

//Middleware
app.use(express.json());
app.use(cors());
// app.use(morgan());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use("/assets", express.static(__dirname + "/public/assets"));
// app.use(express.static(path.join(__dirname, "public/assets")));
app.use(express.static(path.resolve(__dirname, "build")));
// app.use("/assets", express.static(path.resolve(__dirname, "public/assets")));
//Multer File Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Routes
app.post("/auth/register/", upload.single("picture"), registerUser);
app.post("/post/create/", upload.single("picture"), createPost);
app.use("/auth", authRouter);
app.use("/user", UserRouter);
app.use("/post", PostRouter);

// Data base connection
connection();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server in running on the port ${port}`);
});
