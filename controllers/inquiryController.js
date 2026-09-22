import Inquiry from "../models/Inquiry.js";
export const createInquiry = async (req, res) => {
    const { name, email, productName } = req.body;
    try{
        const newinquiry = await Inquiry.create({name,email,productName})
        return res.status(201).json({ message: "Inquiry created successfully", inquiry: newinquiry })
    }catch(err){
        return res.status(500).json({ error: err.message })
    }
}
export const getInquiries = async (req, res) => {
    try{
        const inquiries = await Inquiry.find()
        return res.status(200).json({ inquiries })
    }catch(err){
        return res.status(500).json({ error: err.message })
    }
}