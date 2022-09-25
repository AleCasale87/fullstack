import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import { Sanitizer } from "sanitize";

export const getUsers = async(req, res) => {
    try {
        const users = await User.findAll(
            {attributes:['id','username','email', 'subscription']}
        );
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 
export const Register = async(req, res) => {
    const sanitizer = new Sanitizer()
    const { username, email, password, confPassword, subscription } = req.body;
    if(username === "") return res.status(400).json({msg: "Username cannot be null"});
    const sanited_username = sanitizer.str(username)
    if(email === "") return res.status(400).json({msg: "Email cannot be null"});
    const sanited_email = sanitizer.email(email)
    if(password === "") return res.status(400).json({msg: "Password cannot be null"});
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            username: sanited_username,
            email: sanited_email,
            password: hashPassword,
            subscription: subscription
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error.original.sqlMessage);
        res.status(404).json({msg:error});
    }
}
 
export const Login = async(req, res) => {
    try {
        const user = await User.findAll({
            where: Sequelize.or({email: req.body.email},{username:req.body.email})
        });

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, username, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, username, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await User.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
}
 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}