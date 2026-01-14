import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  console.log("End of try part.")


  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }


  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  console.log("Bytes Variable: ", bytes)
  console.log("Buffer Object: ", buffer)


  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "posts" },
      (err, res) => {
        if (err) reject(err);
        resolve(res);
      }
    ).end(buffer);
  });

  console.log("Result Object: ", result)


  return NextResponse.json({
    url: result.secure_url,
  });
}
