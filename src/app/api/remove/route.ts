import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
export async function POST(req : NextRequest, response : NextResponse){

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY
});


const body = await req.json()

const output = await replicate.run("cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003", { input: 
    {
        image: body.image }
   })

const data = {
    message : "ok",
    image: output
}

return Response.json({
    data
})
}