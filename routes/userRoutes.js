import express from 'express';
import {
    deleteUser,
    getAllUsers,
    getUserProfile,
    loginUser,
    registerUser,
    updateUserProfile
} from "../app/controllers/userController.js";

import authenticate from'../app/middlewares/authMiddlewares.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser)
router.get('/profile/:id',authenticate,getUserProfile)
router.get('/getAllUsers',authenticate,getAllUsers)
router.put('/profile',authenticate,updateUserProfile)
router.delete('/delete',authenticate,deleteUser)


export default router;