import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import { Readable } from "stream";
import fs from 'fs'
const sharp = require("sharp");

export async function POST(req : NextRequest, res : NextResponse){

// const replicate = new Replicate({
//     auth: process.env.REPLICATE_API_KEY
// });

const body = await req.json()



const image = "https://replicate.delivery/pbxt/4J1D41xEg0oXIFISgbtJri3ffpVLsBzNRoBIsJmG1N5BmaDTA/out.png"


// const output = await replicate.run("cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003", { input: 
//     {
//         image: body.image }
//     }
// )
// const rezied = await sharp(output)
//       // Resize the image
//      .resize(128, 128)
//       // Change the format to JPEG and compress
//      .toFormat('jpeg', { mozjpeg: true })
const data = {
    message : "ok",
    image: image
}

return NextResponse.json({
    data
})

}