import express from 'express'
import {createInquiry , getInquiries} from '../controllers/inquiryController.js'
import {authMiddleware , adminonly} from '../middleware/auth.js'
const router = express.Router()

router.post('/',createInquiry);
router.get('/',authMiddleware,adminonly,getInquiries);
export default router;