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
   try{
       // Extract user ID from the route parameter
       const userId = req.params.id;
       // Fetch user from the database (excluding the password)
       const user = await User.findById(userId).select('-password');
       if (!user) {
           return res.status(401).json({ message: 'User not found' });
       }
       // Return the user's profile
       res.status(200).json({message: 'Single User Profile', user});
   }
    catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
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
        const userId = req.params.id;
        // Find the user by ID and apply the updates
        const updatedUser  = await User.findByIdAndUpdate(
            userId,
            {$set:updates},
            { new: true,runValidators: true }
        ).select('-password');

    if(!updatedUser ){
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({message: 'User updated successfully', user:updatedUser });
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//Delete User
export const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.user._id).select('-password');
        res.json({message:'Deleted successfully',user});
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}
