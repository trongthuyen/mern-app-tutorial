import dotenv from 'dotenv'
import * as argon2 from "argon2";
import jwt from 'jsonwebtoken'
import { UserModel as User } from '../models/UserModel.js'
import crypto from 'crypto'

dotenv.config()
export const register = async (req, res) => {
    const { username, password, email } = req.body
        
    // Simple validation
    if(!username || !password) {
        return res
            .status(400)
            .json({
                success: false,
                message: 'Missing username or password'
            })
    }
    try {
        const user = await User.findOne({ username })
        
        if(user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: 'User name already existed'
                })
        }

        // All good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
        })
        await newUser.save()

        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)

        return res
            .status(200)
            .json({
                success: true,
                message: "Registed successfully",
                accessToken
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body

    // Simple validation
    if(!username || !password) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Missing username or password",
            })
    }
    try {
        // Check for existing user
        const user = await User.findOne({ username })
        if(!user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Incorrect username or password",
                })
        }

        // Username found
        const passwordValid = await argon2.verify(user.password, password)
        if(!passwordValid) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Incorrect username or password",
                })
        }

        // All good
        // Return token
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)

        return res
            .status(200)
            .json({
                success: true,
                message: "Logged in successfully",
                accessToken
            })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

export const checkLoggedin = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if(!user) return res.status(400).json({ success: false, message: "User not found" })
        res.json({success: true, user})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

// export const forgotPassword = async(req,res)=>{
//     try{
//         const user= await User.findOne({username:req.body.username});
//         if(!user){
//             res.status(404).json({
//                 status:'fail',
//                 message:"User can not be found"
//             })

//         }
//         const token= crypto.randomBytes(32).toString("hex");
//         user.passwordResetToken= crypto.createHash("sha256").update(token).digest("hex");

//         user.passwordExpired= new Date(Date.now() + 5*60*1000);
//         user.save({validateBeforeSave:false});
        
//         //Send token to user
//         const currentUrl=`${req.protocol}://${req.get('host')}/resetPassword/${token}`;

//         req.status(200).json({
//             status:"success",
//             resetLink: currentUrl
//         })
//     } catch(err){

//     }

// }

// export const resetPassword = async(req,res,next)=>{
//     try{
//         const user= await User.findOne({email:req.body.email});
//         if(!user){
//             res.status(404).json({
//                 status:'fail',
//                 message:"Email can not be found"
//             })

//         }
//         const token= crypto.randomBytes(32).toString("hex");
//         user.passwordResetToken= crypto.createHash("sha256").update(token).digest("hex");

//         user.passwordExpired= new Date(Date.now() + 5*60*1000);
//         user.save({validateBeforeSave:false});
        
//         //Send token to user
//         const currentUrl=`${req.protocol}://${req.get('host')}/user`
        
//     } catch(err){

//     }

// }