import { client } from '@/lib/client' 
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params

  try {
    const updates : itemType = await req.json()

    const result = await client.update({
      index: 'movies',
      id,
      doc: updates,
    })

    return NextResponse.json({ message: 'Filme atualizado!', result }, { status: 200 })
  } catch (error: any) {
    console.error(error)

    if (error.meta?.statusCode === 404) {
      return NextResponse.json({ error: 'Filme não encontrado.' }, { status: 404 })
    }

    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
