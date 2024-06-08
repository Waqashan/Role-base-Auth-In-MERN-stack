const multer = require('multer');
const fs = require('fs'); // Add this line to work with file system

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'upload';  // Update with your desired upload directory
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage })

module.exports =  upload ;