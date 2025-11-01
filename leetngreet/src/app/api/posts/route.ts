import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/mongoClient";
import { z } from "zod";

// ✅ Validate incoming post data
const postSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  language: z.string(),
  tags: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    // 🔐 Ensure user is signed in
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Parse and validate request body
    const body = await req.json();
    const validated = postSchema.parse(body);

    // 🧩 Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("leetngreet");
    const posts = db.collection("posts");

    // 📝 Insert the post
    const result = await posts.insertOne({
      ...validated,
      authorId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Post created successfully", postId: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/posts error:", error);
    return NextResponse.json({ error: "Invalid input or server error" }, { status: 500 });
  }
}

// 🧠 Fetch all posts (you can filter later)
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("leetngreet");
    const posts = db.collection("posts");

    const allPosts = await posts
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json(allPosts, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/posts error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
