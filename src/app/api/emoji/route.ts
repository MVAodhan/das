import sharp from "sharp";
import { Readable } from "stream";
import fs from 'fs'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse){

const body = await req.json()

console.log(body)
//     const image = "https://replicate.delivery/pbxt/4J1D41xEg0oXIFISgbtJri3ffpVLsBzNRoBIsJmG1N5BmaDTA/out.png"

const response = await fetch(body.url, {cache : 'no-store'}) 

if (!response.body) {
    // Handle the case where the body is null or undefined
    console.error('Failed to fetch image');
    return; // Or handle the error differently based on your needs
}

const path = './public/image_emoji.png'
const imageBody = response.body

const readableStream = Readable.fromWeb(imageBody);
const writableStream = fs.createWriteStream(path);

// const writableStream = Writable
const transformer = sharp()
  .resize(128)
readableStream.pipe(transformer).pipe(writableStream);

return NextResponse.json({
    message : 'ok'
})
}