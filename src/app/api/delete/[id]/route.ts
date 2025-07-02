import { client } from '@/lib/client'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const {id} = params

    const res = await client.delete({
      index: 'movies',
      id,
    })

    return NextResponse.json({ message: `Filme ${id} excluído.`, result: res }, { status: 200 })
  } catch (error: any) {
    console.error(error)

    if (error.meta?.statusCode === 404) {
      return NextResponse.json({ error: 'Filme não encontrado.' }, { status: 404 })
    }

    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
