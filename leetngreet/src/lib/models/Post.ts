import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    authorId: { type: String, required: true }, // from session.user.id
    title: { type: String, required: true, maxlength: 100 },
    content: { type: String, required: true },
    language: { type: String, required: true },
    tags: [{ type: String }],
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = models.Post || model("Post", PostSchema);
export default Post;
