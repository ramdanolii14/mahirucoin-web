// app/api/coin/route.ts
import { NextResponse } from 'next/server'

const API_KEY = process.env.NEXT_PUBLIC_RUGPLAY_API_KEY
const SYMBOL = 'MHC'

export async function GET() {
  try {
    const coinRes = await fetch(`https://rugplay.com/api/v1/coin/${SYMBOL}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      cache: 'no-store',
    })
    const holdersRes = await fetch(`https://rugplay.com/api/v1/holders/${SYMBOL}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      cache: 'no-store',
    })

    if (!coinRes.ok || !holdersRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }

    const coinData = await coinRes.json()
    const holdersData = await holdersRes.json()

    return NextResponse.json({
      coin: coinData.coin,
      holders: holdersData.holders,
    })
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
