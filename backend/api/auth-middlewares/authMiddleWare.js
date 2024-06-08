const jwt = require("jsonwebtoken");

exports.authVerify = async (req, res, next) => {
  let token = req.headers["authorization"];

  try {
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token." });
      } else {
       
        // Pass the decoded token to the next middleware or route handler
        req.user = decoded;
        // console.log(req.user,"reqqqqqqqqqqqqqqqqqqqqq.user");
        next();
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.isAdmin = (req, res, next) => {
    // Access the decoded user information from req.user
    const { user } = req;
    ;
  

    // Check if the user exists and their role is "user"
    if (user && user.role === "admin") {
        console.log(".....The Role is ==> :",user.role,);
        // If user is a regular user, allow the request to proceed
        next();
    } else {
        // If not a regular user, return a response indicating unauthorized access
        console.log(".....The Role is ==> :",user.role,);
        return res.status(403).json({ message: 'Only admin can perform this operation.' });
    }
};
