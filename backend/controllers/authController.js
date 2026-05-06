import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {
    try{
        const {name, email, password, role} = req.body;

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({message: 'User Already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        const payload = {
            user: {
                id: user._id,
                role: user.role
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }catch(error){
        console.error(error.message);
        res.status(500).json({message: 'Server Error'});
    }
}