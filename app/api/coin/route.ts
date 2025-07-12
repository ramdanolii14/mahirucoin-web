// app/api/coin/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const API_KEY = process.env.RUGPLAY_API_KEY
  const SYMBOL = 'MHC'

  if (!API_KEY) {
    return NextResponse.json({ error: 'API key not set' }, { status: 500 })
  }

  try {
    const [coinRes, holdersRes] = await Promise.all([
      fetch(`https://rugplay.com/api/v1/coin/${SYMBOL}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }),
      fetch(`https://rugplay.com/api/v1/holders/${SYMBOL}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      }),
    ])

    const coinData = await coinRes.json()
    const holdersData = await holdersRes.json()

    return NextResponse.json({
      coin: coinData.coin,
      holders: holdersData.holders,
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
