import Product from '../models/Product.js'
import mongoose from 'mongoose'
export const createProduct = async (req, res) => {
  try {
    const { name, price, category, image } = req.body
    if (!name || !price || !category || !image) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const product = await Product.create({ name, price, category, image })
    res.status(201).json(product)
  } catch (err) {
    console.error('Error creating product:', err)
    res.status(500).json({ error: 'An error occurred while creating the product' })
  }
}
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    console.error('Error fetching products:', err)
    res.status(500).json({ error: 'An error occurred while fetching the products' })
  }
}
export const searchProductByName = async (req, res) => {
  try {
    const searchedName = req.params.name
    const product = await Product.find({ name: { $regex: searchedName, $options: 'i' } })
    res.status(200).json(product)
  } catch (err) {
    console.error('Error searching product by name:', err)
    res.status(500).json({ error: 'An error occurred while searching for the product' })
  }
}
export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const { name, price, category, image } = req.body
    if (!name || !price || !category || !image) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, price, category, image }, { new: true })
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json(updatedProduct)
  } catch (err) {
    console.error('Error updating product:', err)
    res.status(500).json({ error: 'An error occurred while updating the product' })
  }
}
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({ error: 'Product not found' })
    }
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (err) {
    console.error('Error fetching product by ID:', err)
    res.status(500).json({ error: 'An error occurred while fetching the product' })
  }
}
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id
    const deletedProduct = await Product.findByIdAndDelete(productId)
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json({ message: 'Product deleted successfully' })
  } catch (err) {
    console.error('Error deleting product:', err)
    res.status(500).json({ error: 'An error occurred while deleting the product' })
  }
}
