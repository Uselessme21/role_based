const express = require('express');
const multer = require('multer');
require('dotenv').config()
const authRoutes = require('./api/routes/authRoutes');
const adminRoutes = require('./api/routes/adminRoutes'); // Add this line
const userRoutes = require('./api/routes/userRoutes');
// const validationMiddleware = require('./api/middlewares/validationMiddleware');
const connection = require('./config')
const app = express();
const PORT = process.env.PORT || 3000;



// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));
// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes); 


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, async () => {
  await connection
  console.log(`Server is running on port ${PORT}`);
});
