const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// Add this line to your setup code (where you set up your express app)


function authenticator(req, res, next) {
  const token = req.cookies.jwtToken;
  


  jwt.verify(token, "Priyanshi", (err, decode) => {
    if (err) {
      // If the token is invalid, clear the existing cookie (if any) to force re-login
      res.clearCookie("jwtToken");
      return res.send({
        message: "Token is not valid. Please login",
        status: 2
      });
    }

    if (decode) {
      req.body.user = decode.userId;
      console.log(decode.userId)

      // Set the HttpOnly cookie with the JWT token and make it valid for 30 days
      res.cookie("jwtToken", token, {
        // httpOnly: true,
        
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
        sameSite:"none",
        secure:true
      });

      next();
    } else {
      res.send({
        message: "Token is not valid. Please login",
        status: 2
      });
    }
  });
}

module.exports = {
  authenticator
};
