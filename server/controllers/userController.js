import { User } from "../models/userModel.js";

export const register = async(req,res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:'All field must be required'
        })
    }
    const userExits = await User.findOne({email});
    if(userExits){
        res.status(400).json({
            success:false,
            message:'User already exits'
        })
    }
    try {
        const user = await User.insertOne({
            name,
            email,
            password,
            avatar:{
                public_id:email,
                secure_url:"xyz"
            }
        });
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User registration failed,Please try again"
            })
        }
        // Tood upload url
        await user.save();
        res.status(200).json({
            success:true,
            data:user
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const login = () => {

}

export const logout = () => {

}

export const getUser = () => {

}