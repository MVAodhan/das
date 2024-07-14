import sharp from "sharp";

export async function POST(req: Request) {
  const body = await req.json();

  const base64DataUrl = body.file;
  const base64Data = base64DataUrl.split(",")[1];
  const buffer = Buffer.from(base64Data, "base64");

  const data = await sharp(buffer).resize(128, 128).toFormat("png").toBuffer();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
