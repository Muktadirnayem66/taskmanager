import express  from 'express';
import connectDB from './src/config/mongodb.js';
import cors from 'cors'
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize'
import rateLimit from 'express-rate-limit';

import 'dotenv/config'
import router from './src/routes/api.js';

const app = express()
connectDB()


app.use(express.json())
app.use(cors())

app.use(helmet())
app.use(mongoSanitize())




const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 100,	
})


app.use(limiter)



app.use("/api/v1", router)

app.get("/api/v1", (req,res)=>{
    res.send("Api working")
})

export default app


