import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/client'

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    if (!data.id || !data.title) {
      return NextResponse.json({ error: 'ID e título são obrigatórios.' }, { status: 400 })
    }

    const res = await client.index({
      index: 'movies',
      document: data,
    })

    return NextResponse.json({ message: 'Filme adicionado!', result: res }, { status: 201 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
