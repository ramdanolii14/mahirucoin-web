'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const API_KEY = process.env.NEXT_PUBLIC_RUGPLAY_API_KEY
const SYMBOL = 'MHC'

export default function Home() {
  const [coin, setCoin] = useState<any>(null)
  const [holders, setHolders] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const coinRes = await fetch(`https://rugplay.com/api/v1/coin/${SYMBOL}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      const coinData = await coinRes.json()
      setCoin(coinData.coin)

      const holdersRes = await fetch(`https://rugplay.com/api/v1/holders/${SYMBOL}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      })
      const holdersData = await holdersRes.json()
      setHolders(holdersData.holders)
    }
    fetchData()
  }, [])

  if (!coin) return <div className="text-white p-8">Loading Mahiru Coin data...</div>

  return (
    <div
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 space-y-12"
      style={{
        backgroundImage: "url('/bg-mahiru.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center space-y-4">
        <h1 className="text-6xl font-extrabold text-pink-500">Mahiru Coin</h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          Mahiru Coin ($MHC) adalah simbol dari cinta kepada waifu, semangat komunitas, dan absurditas dunia crypto. Tanpa janji palsu, hanya kekacauan dan potensi menuju bulan — atau terbakar bersama.
        </p>
      </motion.div>

      <div className="bg-gray-900 bg-opacity-90 border border-pink-400 rounded-2xl shadow-lg p-6 w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-semibold text-pink-300">📈 Coin Stats</h2>
        <ul className="text-gray-200 space-y-1">
          <li><strong>Current Price:</strong> ${coin.currentPrice.toFixed(4)}</li>
          <li><strong>Market Cap:</strong> ${coin.marketCap.toLocaleString()}</li>
          <li><strong>Volume (24h):</strong> ${coin.volume24h.toLocaleString()}</li>
          <li><strong>Circulating Supply:</strong> {coin.circulatingSupply.toLocaleString()} {coin.symbol}</li>
          <li><strong>Creator:</strong> @{coin.creatorUsername}</li>
        </ul>
      </div>

      <div className="bg-gray-900 bg-opacity-90 border border-pink-400 rounded-2xl shadow-lg p-6 w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-semibold text-pink-300">🛣️ Roadmap</h2>
        <ul className="list-disc text-gray-200 pl-6">
          {[
            'Phase 0: Tercipta karena waifu — ✅',
            'Phase 1: Dominasi supply — ✅',
            'Phase 2: Narasi proyek Web3 — 🔄',
            'Phase 3: Janji kolaborasi dan listing — 🔜',
            'Phase 4: Either rug or moon — 🔥',
          ].map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-900 bg-opacity-90 border border-pink-400 rounded-2xl shadow-lg p-6 w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-semibold text-pink-300">👑 Top Holders</h2>
        <ul className="text-gray-200">
          {holders.slice(0, 3).map((h, i) => (
            <li key={i}>
              #{h.rank} @{h.username} — {h.percentage.toFixed(2)}%
            </li>
          ))}
        </ul>
      </div>

      <motion.a
        href="https://rugplay.com/coin/MHC"
        target="_blank"
        className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-xl"
        whileHover={{ scale: 1.05 }}
      >
        Buy MHC Now
      </motion.a>
    </div>
  )
}
