import { NextRequest } from 'next/server';
import { client } from '@/lib/client';


// 🎯 API para busca
export async function GET(
  request: NextRequest
) {
  const searchParams = request.nextUrl.searchParams

  const q = searchParams.get("q");
  console.log(q)

  if (!q || typeof q !== 'string') {
    return Response.json({ message: 'Query param "q" is required' }, { status: 400 });
  }

  try {
    const result = await client.search({
      index: 'movies', // 🔍 Nome do seu índice no Elasticsearch
      query: {
        multi_match: {
          query: q,
        }
      }
    });

    const hits = result.hits.hits.map((hit: any) => ({
      _id: hit._id,
      ...hit._source,
    }))

    return Response.json({ results: hits });
  } catch (error: any) {
    console.log("ERROR")
    console.error(error);
    console.log("-----")
    return Response.json({ message: 'Erro na busca', error: error.message }, { status: 500 });
  }
}
