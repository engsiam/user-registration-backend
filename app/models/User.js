import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    NIDNumber: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    bloodGroup: { type: String, required: true },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    console.log('Pre-save middleware triggered');

    if (!this.isModified('password')) {
        console.log('Password not modified. Skipping hashing.');
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        console.log('Salt generated:', salt);
        this.password = await bcrypt.hash(this.password, salt);
        console.log('Hashed password:', this.password);
        next();
    } catch (error) {
        console.error('Error during password hashing:', error.message);
        next(error);
    }
});


// Add comparePassword method for password verification
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
