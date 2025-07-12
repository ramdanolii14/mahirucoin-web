'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/coin')
      const data = await res.json()
      setCoin(data.coin)
      setHolders(data.holders)
    }
    fetchData()
  }, [])

  if (!coin) return <div className="text-white p-8">Loading Mahiru Coin data...</div>

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 sm:p-12 space-y-12"
      style={{
        backgroundImage: "url('/bg-mahiru.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center space-y-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-pink-500 drop-shadow-md">Mahiru Coin ($MHC)</h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto drop-shadow">
          Mahiru Coin adalah token cinta waifu yang tak masuk akal — tanpa utility, tanpa roadmap serius. Hanya kekacauan, cinta, dan potensi ke bulan 🚀
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
        <div className="bg-gray-900/80 border border-pink-500 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-pink-300">📈 Coin Stats</h2>
          <ul className="text-gray-200 space-y-1 text-base sm:text-lg">
            <li>💰 <strong>Price:</strong> ${coin.currentPrice.toFixed(6)}</li>
            <li>📉 <strong>Market Cap:</strong> ${coin.marketCap.toLocaleString()}</li>
            <li>✅ <strong>Volume (24h):</strong> ${coin.volume24h.toLocaleString()}</li>
            <li>🔁 <strong>Circulating Supply:</strong> {coin.circulatingSupply.toLocaleString()} {coin.symbol}</li>
            <li>👤 <strong>Creator:</strong> @{coin.creatorUsername}</li>
          </ul>
        </div>

        <div className="bg-gray-900/80 border border-pink-500 rounded-2xl shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-pink-300">👑 Top 3 Holders</h2>
          <ul className="text-gray-200 space-y-1 text-base sm:text-lg">
            {holders.slice(0, 3).map((h) => (
              <li key={h.rank}>#{h.rank} @{h.username} — {h.percentage.toFixed(2)}%</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gray-900/80 border border-pink-500 rounded-2xl shadow-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-semibold text-pink-300 mb-2">🛣️ Roadmap</h2>
        <ul className="list-disc text-gray-200 pl-5 space-y-1">
          {[
            'Phase 0: Tercipta karena waifu — ✅',
            'Phase 1: Dominasi supply — ✅',
            'Phase 2: Narasi proyek Web3 — 🔄',
            'Phase 3: Janji kolaborasi dan listing — 🔜',
            'Phase 4: Either rug or moon — 🔥',
          ].map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>

      <motion.a
        href="https://rugplay.com/coin/MHC"
        target="_blank"
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold text-lg px-6 py-3 rounded-xl shadow-lg transition"
        whileHover={{ scale: 1.05 }}
      >
        💸 Buy MHC Now
      </motion.a>
    </div>
  )
}
