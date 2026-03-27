'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ConnectButton } from '@/components/ConnectButton'
import { LotteryCard } from '@/components/LotteryCard'
import { PlayersList } from '@/components/PlayersList'
import { WinnerAnnouncement } from '@/components/WinnerAnnouncement'

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🎰 Decentralized Lottery
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Buy tickets for a chance to win the prize pool!
          </p>
          <ConnectButton />
        </header>

        {isConnected ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <LotteryCard />
              <WinnerAnnouncement />
            </div>
            <div className="space-y-8">
              <PlayersList />
            </div>
          </div>
        ) : (
          <div className="text-center mt-16">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600">
                Please connect your wallet to participate in the lottery.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
