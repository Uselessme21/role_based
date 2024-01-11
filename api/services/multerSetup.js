const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(file)
      const relativePath = path.join(__dirname, '../../uploads');
      cb(null, relativePath);
    },
    filename: (req, file, cb) => {
      
      const fileName = `profileImage_${Date.now()}${path.extname(file.originalname)}`;
      cb(null, fileName);
    },
});
  
  const upload = multer({ storage: storage }).single('profileImage');

  module.exports=upload