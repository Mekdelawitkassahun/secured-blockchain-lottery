'use client'

import { useState, useEffect } from 'react'
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from '@/lib/contract'

interface Player {
  address: string
  tickets: number
}

export function PlayersList() {
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // This would typically use wagmi's useReadContract hook
        // For now, we'll simulate the data
        const mockPlayers: Player[] = [
          { address: '0x1234...5678', tickets: 1 },
          { address: '0x2345...6789', tickets: 2 },
          { address: '0x3456...7890', tickets: 1 },
          { address: '0x4567...8901', tickets: 3 },
        ]
        setPlayers(mockPlayers)
      } catch (error) {
        console.error('Error fetching players:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlayers()
  }, [])

  const totalTickets = players.reduce((sum, player) => sum + player.tickets, 0)

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Players</h2>
      
      <div className="mb-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Players</h3>
          <p className="text-2xl font-bold text-primary">{players.length}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mt-3">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Tickets Sold</h3>
          <p className="text-2xl font-bold text-green-600">{totalTickets}</p>
        </div>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-gray-600 mt-2">Loading players...</p>
          </div>
        ) : players.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No players yet. Be the first to buy a ticket!</p>
          </div>
        ) : (
          players.map((player, index) => (
            <div
              key={player.address}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {player.address}
                  </p>
                  <p className="text-xs text-gray-500">
                    {player.tickets} ticket{player.tickets > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(player.tickets, 3) }).map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs"
                  >
                    🎫
                  </div>
                ))}
                {player.tickets > 3 && (
                  <span className="text-xs text-gray-500">+{player.tickets - 3}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
