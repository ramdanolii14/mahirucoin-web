'use client'

import React, { useEffect, useState } from 'react'

type Coin = {
  currentPrice: number
  marketCap: number
  volume24h: number
  circulatingSupply: number
  symbol: string
  creatorUsername: string
}

type Holder = {
  rank: number
  username: string
  percentage: number
}

export default function Home() {
  const [coin, setCoin] = useState<Coin | null>(null)
  const [holders, setHolders] = useState<Holder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/coin')
        const data = await res.json()

        setCoin(data.coin)
        setHolders(data.holders)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch:', err)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="text-white p-8">Loading...</div>
  if (!coin) return <div className="text-red-500 p-8">Failed to load coin data.</div>

  return (
    <div className="text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Mahiru Coin ($MHC)</h1>
      <ul className="mb-8">
        <li>💰 Price: ${coin.currentPrice}</li>
        <li>📈 Market Cap: ${coin.marketCap}</li>
        <li>💹 Volume 24h: ${coin.volume24h}</li>
        <li>🔄 Circulating Supply: {coin.circulatingSupply} {coin.symbol}</li>
        <li>👤 Creator: @{coin.creatorUsername}</li>
      </ul>
      <h2 className="text-2xl font-semibold">Top 3 Holders</h2>
      <ul>
        {holders.slice(0, 3).map((h) => (
          <li key={h.rank}>
            #{h.rank} @{h.username} — {h.percentage.toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  )
}
