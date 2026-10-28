// just a script to explain the query plan for a specific query on the Product model learning how to use the explain() method in Mongoose and do indexing to optimize query performance

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Product from '../models/Product.js'

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)
await Product.init() // Ensure indexes are created before running the query 

const result = await Product.find({ category: 'Watches' }).explain('executionStats')

console.log('Stage:', result.queryPlanner.winningPlan.stage)
console.log('Docs examined:', result.executionStats.totalDocsExamined)
console.log('Docs returned:', result.executionStats.nReturned)

await mongoose.disconnect()