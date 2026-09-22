import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import productRoutes from './routes/productRoutes.js'
import inquiryRoutes from './routes/inquiryRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB")
}).catch((err)=>{
    console.log(err)

})
app.use(cookieParser())
app.use(express.json())
app.use('/products',productRoutes)
app.use('/users',userRoutes) 
app.use('/inquiries',inquiryRoutes)  
app.get('/',(req,res)=>{
    res.send("Backend is running")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
