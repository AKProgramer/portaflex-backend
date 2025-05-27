const multer = require('multer');
const folderPath = process.env.IMAGE_FOLDER;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderPath);
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({ storage: storage });
module.exports = upload;
