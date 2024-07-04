import { cookies } from "next/headers"

export async function GET(req: Request){

    const cookie = await cookies().get('das')

    
    const res = await fetch('http://localhost:1337/api/articles', {cache: 'no-store', headers: {
        Authorization: `Bearer ${cookie?.value}`,
      },})

    const articles = await res.json()

    if (articles.error){
        return Response.json({
            message: 'error getting articles',
            error: articles.error
        })
    }else{
        console.log(articles.data)
    }

    return Response.json({
        message: 'ok',
        articles: articles.data
    })
}