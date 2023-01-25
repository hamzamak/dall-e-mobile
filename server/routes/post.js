import express from "express";
import Post from '../models/post.js'
import * as dotenv from 'dotenv'
import { v2 as cloudinary } from "cloudinary"
dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
  api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
})

router.post('/', async (req, res) => {
  try {
    const { name, prompt, image } = req.body;
    const photoUrl = await cloudinary.uploader.upload(image); //upload the image to the cloudinary
    const post = await Post.create({
      name,
      prompt,
      image: photoUrl.url
    })

    res.status(200).json({ post })

  } catch (error) {
    res.status(400).json({ error })
  }

}
)


router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find({})
    res.status(200).json({ data : posts })
    
  } catch (error) {
    res.status(400).json({ error })
  }

})

export default router