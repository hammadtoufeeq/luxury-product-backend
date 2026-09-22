import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ name: name, email: email, password: hashedPassword })
        res.status(201).json({ user: { name: result.name, email: result.email }, message: "User created successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await User.findOne({ email: email })
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Wrong password" })
        }
        const accessToken = jwt.sign({ id: existingUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
        const refreshToken = jwt.sign({ id: existingUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
        res.cookie("accessToken", accessToken,{
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({ user: { name: existingUser.name, email: existingUser.email }, message: "Login successful" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
export const refresh = async (req, res) => {
    try{
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        return res.status(401).json({ message: "No refresh token provided" })  
    }
    const decoded=jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    const accessToken =jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
    res.cookie("accessToken", accessToken,{
        httpOnly: true,
        maxAge: 15 * 60 * 1000
    })
    return res.status(200).json({ message: "Access token refreshed" })

}
catch(err){
        res.status(403).json({ error: err.message })
    }  
}
export const logout = (req, res) => {
  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")
  res.status(200).json({ message: "Logged out successfully" })
}