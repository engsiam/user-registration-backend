import User from '../models/user.js';
import jwt from 'jsonwebtoken';


//generate jwt token
const generateToken  = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

// User Registration
export const registerUser = async (req, res) => {
    const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } = req.body;
    try {
        const user = new User({ firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//user login
export const loginUser = async (req, res) => {
    const { NIDNumber, password } = req.body;

    try {
        const user = await User.findOne({ NIDNumber });
        if (!user) {
            console.log('User not found for NIDNumber:', NIDNumber);
            return res.status(400).json({ error: 'User not found' });
        }

        console.log('User found:', user);

        const isMatch = await user.comparePassword(password);
        console.log('Password Match:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const token = generateToken(user._id);
        res.cookie('access_token', token, { httpOnly: true }).json({
            message: 'Login successfully',
            token,
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(400).json({ error: error.message });
    }
};


// Get Single User Profile
export const getUserProfile = async (req, res) => {
    res.json(req.user);
}

// Get All Users
export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().select('-password');
        res.json(users);
    }
    catch (error){
        res.status(400).json({error:error.message})
    }
}
// Update User Profile
export const updateUserProfile = async (req, res) => {
    try{
        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.user._id,{new:true}).select('-password');
        res.json({message:'Updated successfully',user});

    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//Delete User
export const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.user._id);
        res.json({message:'Deleted successfully',user});
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}