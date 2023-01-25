import mongoose, { Schema } from "mongoose";


const postSchema = new Schema ({
    name : {type :String , required: true},
    prompt : {type :String , required: true},
    image : {type :String , required: true}
})

const Post = mongoose.model('Post',postSchema)

export default Post
