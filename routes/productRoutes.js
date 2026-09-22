import express from 'express'
import { createProduct , getProducts , searchProductByName , updateProduct , getProductById , deleteProduct } from '../controllers/productController.js'
import {authMiddleware} from '../middleware/auth.js'
const router = express.Router()

router.post('/', authMiddleware , createProduct)
router.get('/', getProducts)
router.get('/search/:name', searchProductByName)
router.get('/:id', getProductById)
router.put('/:id', authMiddleware , updateProduct)
router.delete('/:id', authMiddleware , deleteProduct)
export default router