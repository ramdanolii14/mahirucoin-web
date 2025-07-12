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
      className="min-h-screen w-full bg-black text-white flex flex-col items-center p-4 sm:p-8 space-y-10"
      style={{
        backgroundImage: "url('/bg-mahiru.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay blur + dark */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />

      <main className="z-10 w-full max-w-6xl flex flex-col items-center space-y-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-pink-400 drop-shadow-xl">Mahiru Coin ($MHC)</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg">
            Mahiru Coin adalah simbol cinta waifu, komunitas absurd, dan potensi menuju bulan (atau rug total). Tanpa janji. Hanya vibes dan degeneracy.
          </p>
        </motion.div>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {/* Coin Stats */}
          <div className="bg-white/10 border border-pink-500 backdrop-blur-lg rounded-2xl p-6 shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-pink-300">📊 Coin Stats</h2>
            <ul className="text-sm sm:text-base text-gray-200 space-y-1">
              <li><strong>💰 Price:</strong> ${coin.currentPrice.toFixed(6)}</li>
              <li><strong>📉 Market Cap:</strong> ${coin.marketCap.toLocaleString()}</li>
              <li><strong>✅ Volume (24h):</strong> ${coin.volume24h.toLocaleString()}</li>
              <li><strong>🔁 Supply:</strong> {coin.circulatingSupply.toLocaleString()} {coin.symbol}</li>
              <li><strong>👤 Creator:</strong> @{coin.creatorUsername}</li>
            </ul>
          </div>

          {/* Top Holders */}
          <div className="bg-white/10 border border-purple-500 backdrop-blur-lg rounded-2xl p-6 shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-purple-300">👑 Top Holders</h2>
            <ul className="text-sm sm:text-base text-gray-200 space-y-1">
              {holders.slice(0, 3).map(h => (
                <li key={h.rank}>#{h.rank} @{h.username} — {h.percentage.toFixed(2)}%</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Roadmap */}
        <section className="bg-white/10 border border-indigo-400 backdrop-blur-lg rounded-2xl p-6 shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-3">🛣️ Roadmap</h2>
          <ul className="list-disc pl-6 text-gray-200 space-y-1 text-sm sm:text-base">
            <li>Phase 0: Tercipta karena waifu — ✅</li>
            <li>Phase 1: Dominasi supply — ✅</li>
            <li>Phase 2: Narasi proyek Web3 — 🔄</li>
            <li>Phase 3: Janji kolaborasi dan listing — 🔜</li>
            <li>Phase 4: Either rug or moon — 🔥</li>
          </ul>
        </section>

        {/* CTA Button */}
        <motion.a
          href="https://rugplay.com/coin/MHC"
          target="_blank"
          className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-full shadow-xl transition-all"
          whileHover={{ scale: 1.05 }}
        >
          💸 Beli $MHC Sekarang
        </motion.a>
      </main>
    </div>
  )
}
