const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailerMiddleware = require("../auth-middlewares/nodemailer");
const gmailerMailerMiddleware = require("../auth-middlewares/GmailNodemailer");
const jwt = require("jsonwebtoken");
///add user on signup
exports.SiginUp = async (req, res) => {
  // Extracting user inputs
  const { name, email, password } = req.body;

  try {
    // Check if user with provided email already exists
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    let Userdata = await user.save();

    res.status(200).json({ message: "User created successfully", Userdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

////Login api
exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    } else if (!password) {
      return res.status(400).json({ message: "Please provide a password" });
    }

    // Check if user with provided email exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found on this  email" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );
    user.token = token;
    await user.save();
    // Send token in response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.DeleteUser = async (req, res) => {
  let id = req.params.id;

  try {
    if (!id) {
      return res.status(400).json({ message: "Please provide an ID" });
    }

    let user = await userModel.findByIdAndDelete(id);
    if (user) {
      return res
        .status(200)
        .json({ message: "User deleted successfully", user });
    } else {
      return res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.UpdateUser = async (req, res) => {
  let id = req.params.id;
  let { name, email, password } = req.body;
  console.log(req.body);

  try {
    if (!id) {
      return res.status(400).json({ message: "Please provide an ID" });
    }

    let user = await userModel.findByIdAndUpdate(
      id,
      {
        name: name,
        email: email,
        password: password,
      },
      { new: true }
    );
    if (user) {
      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    } else {
      return res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.getUser = (req, res) => {
  try {
  } catch (error) {}
};

exports.getall = async (req, res) => {
  try {
    let users = await userModel.find();
    if (!users) {
      return res.status(400).json({ message: "user not founds" });
    }
    res.status(200).json({ message: "all user finds successfully", users });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// AddUserByAdmin API for admin to add users and assign roles
exports.AddUserByAdmin = async (req, res) => {
  // Extracting admin inputs
  const { name, email, password, role } = req.body;

  try {
    // Check if admin is authorized to perform this action
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // Check if user with provided email already exists
    let user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new userModel({
      name,
      email,
      password: hashedPassword,
      role, // Assigning role provided by the admin
    });

    // Save user to database
    let Userdata = await user.save();

    res.status(201).json({ message: "User created successfully", Userdata });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// exports.testController = async (req, res) => {
//   // Extracting admin inputs

// console.log("test contrller function...........................");
//   try {
//     // Check if admin is authorized to perform this action
//     nodemailerMiddleware();

//     res.status(201).json({ message: "User created successfully"});
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
exports.testController = (req, res, next) => {
  const { to, subject, text, html } = req.body;

  const mailOptions = {
    from: '"Waqas Khan" <test@creativerays.com>',
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  nodemailerMiddleware(mailOptions, res);
};

exports.gmailNodemailer = async (req, res) => {
  const { email, sub, text } = req.body;
  const agentEmail = "malaksilyaskhan007@gmail.com";
  const agentText = "Hello zakria hope you are doing well !!!!!";
  const jehadText = "Hello jehad hope you are doing well !!!!!";
  const agentSubject = "Test Email";

  const jehadMailOptions = {
    from: "Waqas Khan", // Replace with your Gmail address
    to: "Tonyjehadali@gmail.com",
    subject: agentSubject,
    text: jehadText,
    html: `<h1>${jehadText}</h1>`, // HTML body for user email
  };
  const mailOptions = {
    from: "Waqas Khan", // Replace with your Gmail address
    to: email,
    subject: sub,
    text: text,
    html: `<h1>${text}</h1>`, // HTML body for user email
  };

  const agentMailOptions = {
    from: "Waqas Khan", // Replace with your Gmail address
    to: agentEmail,
    subject: agentSubject,
    text: agentText,
    html: `<h1>${agentText}</h1>`, // HTML body for agent email
  };

  try {
    // Send user email
    await gmailerMailerMiddleware(mailOptions);

    // Send agent email
    await gmailerMailerMiddleware(agentMailOptions);
    await gmailerMailerMiddleware(jehadMailOptions);

    // Both emails sent successfully
    res.status(200).json({
      message: "emails sent successfully",
    });
  } catch (error) {
    // Handle errors during email sending
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send one or both emails" });
  }
};
