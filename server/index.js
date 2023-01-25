import express  from "express";
import cors from 'cors'
import postRoutes from "./routes/post.js"
import dalleRoutes from "./routes/dalle.js" 
import mongoose from "mongoose";
import * as  dotenv from 'dotenv'
dotenv.config(); //Loads .env file contents into process.env.
const app = express();
app.use(cors()); 
app.use(express.json({limit : '50mb'}))

app.use('/api/post',postRoutes)
app.use('/api/dalle',dalleRoutes)

const PORT = 9000;
mongoose.set('strictQuery' , true); // usefull when working with search functionality
mongoose.connect(process.env.MONGODB_URL).then(()=> app.listen(PORT, ()=> console.log(`Server Running from port ${PORT}`)))
.catch((err)=> console.log(err.message) ) 