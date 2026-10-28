import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
})
productSchema.index({ category: 1 }) // Create a compound index on category field
const Product = mongoose.model("Product", productSchema) //const modelname=mongoose.model(name which is collection name, schema name)
export default Product