import express from "express";
import * as  dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai"

dotenv.config(); //Loads .env file contents into process.env.
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,

})

const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: 'b64_json'
    });
    const image = response.data.data[0].b64_json;
    res.status(200).json({ image })

  } catch (error) {
    res.status(400).json({ error })
  }

}
)

export default router