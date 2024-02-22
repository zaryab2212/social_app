const jwt = require("jsonwebtoken");
const JWT_SECRET = "KDFJKDJFKDJ";

exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    // console.log(token);

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verfied = await jwt.verify(token, JWT_SECRET);
    req.user = verfied;
    next();
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
      message: "Erroe ocour in verify the autorization please try again",
    });
  }
};
