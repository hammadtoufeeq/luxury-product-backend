import express from 'express'
import { createProduct , getProducts , searchProductByName , updateProduct , getProductById , deleteProduct } from '../controllers/productController.js'
import {authMiddleware , adminonly} from '../middleware/auth.js'
const router = express.Router()

router.post('/', authMiddleware , adminonly , createProduct)
router.get('/', getProducts)
router.get('/search/:name', searchProductByName)
router.get('/:id', getProductById)
router.put('/:id', authMiddleware , adminonly , updateProduct)
router.delete('/:id', authMiddleware , adminonly , deleteProduct)
export default router