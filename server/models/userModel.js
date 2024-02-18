import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

const userSchema = new Schema({
    name:{
        type:'String',
        required:[true,"Name is required"],
        minLength:[5,"Name must be contain at least 5 character"],
        maxLength:[40,"Name only contains 50 characters"],
        lowercase:true,
        trim:true
    },
    email:{
        type:'String',
        required:[true,"Email must be required"],
        unique:[true,"Email must be unique"],
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"Password contains atleast 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:'String'
        },
        secure_url:{
            type:'String'
        }
    },
    role:{
        type:'String',
        enum: ['USER','ADMIN'],
        default: 'USER'
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},{
    timestamps:true
})

userSchema.pre('save',async(next) => {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods = {
    generateJwtToken: async() => {
        return await JWT.sign(
            {id:this._id,email:this.email,subscription:this.subscription,role:this.role},
            process.env.SECRET,
            {expiresIn:'24h'}
        )
    }
}

export const User = mongoose.model("User",userSchema);