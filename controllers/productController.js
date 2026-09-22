import Product from '../models/Product.js'

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
export const searchProductByName = async (req, res) => {
  try {
    const searchedName = req.params.name
    const product = await Product.find({ name: { $regex: searchedName, $options: 'i' } })
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
export const updateProduct = async (req, res) => {
  try{
    const productId = req.params.id
    const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true })
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
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
    res.status(500).json({ error: err.message })
  }
}
