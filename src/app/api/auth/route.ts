import { cookies } from "next/headers"

export async function GET(){

    const userIdentifier = process.env.STRAPI_USER_IDENTIFER
    const userPassword = process.env.STRAPI_USER_PASSWORD

    const res = await fetch('http://localhost:1337/api/auth/local', {
        cache: 'no-store',
        method: 'POST',
        headers: {
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({
                identifier : userIdentifier,
                password : userPassword,
            })
    })


    const data = await res.json()

    cookies().set({
    name: 'das',
    value: await data.jwt,
    httpOnly: true,
    path: '/',
    })

    return Response.json({
        message: 'ok'
    })
}