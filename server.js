import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import  connectDB  from './app/config/db.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

//Initialize app
const app = express();
const PORT = process.env.PORT || 3000;


//Middleware
app.use (express.json())
app.use(cookieParser())

// Database connection
connectDB()


//Routes
app.use('/api/users',userRoutes)

//Start Server
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));