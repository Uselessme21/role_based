const express = require('express');
require('dotenv').config()
const authRoutes = require('./api/routes/authRoutes');
const adminRoutes = require('./api/routes/adminRoutes');
const userRoutes = require('./api/routes/userRoutes');
const connection = require('./config');
const app = express();


// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));


// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes); 


// Error handling middleware


app.listen(process.env.PORT || 3000, async () => {
  await connection
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
