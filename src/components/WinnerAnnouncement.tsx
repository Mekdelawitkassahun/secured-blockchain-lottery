'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from '@/lib/contract'

export function WinnerAnnouncement() {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const [winner, setWinner] = useState<string>('')
  const [isOwner, setIsOwner] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    const fetchWinnerData = async () => {
      try {
        // Check if current user is owner
        if (address) {
          // This would typically use wagmi's useReadContract hook
          // For now, we'll simulate the data
          setIsOwner(address === '0x1234567890123456789012345678901234567890') // Replace with actual owner check
        }

        // Fetch current winner (if any)
        setWinner('0x0000000000000000000000000000000000000000') // No winner yet
      } catch (error) {
        console.error('Error fetching winner data:', error)
      }
    }

    fetchWinnerData()
  }, [address, isConfirmed])

  const handlePickWinner = async () => {
    if (!address || !isOwner) return

    try {
      setIsLoading(true)
      writeContract({
        address: LOTTERY_CONTRACT_ADDRESS as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: 'pickWinner',
      })
    } catch (error) {
      console.error('Error picking winner:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Winner Announcement</h2>
      
      <div className="space-y-4">
        {winner && winner !== '0x0000000000000000000000000000000000000000' ? (
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Lottery Winner!
            </h3>
            <p className="text-sm font-mono text-green-600 break-all">
              {winner}
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-center">
            <div className="text-4xl mb-4">⏳</div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              No Winner Yet
            </h3>
            <p className="text-sm text-yellow-600">
              Waiting for the lottery draw...
            </p>
          </div>
        )}

        {isOwner && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Owner Controls</h3>
            <p className="text-xs text-blue-600 mb-3">
              Only the contract owner can pick a winner.
            </p>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-3">
                <p className="text-xs">Error: {error.message}</p>
              </div>
            )}

            {isConfirmed && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded mb-3">
                <p className="text-xs">Winner selected successfully!</p>
              </div>
            )}

            <button
              onClick={handlePickWinner}
              disabled={isPending || isLoading || isConfirming}
              className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending || isLoading || isConfirming ? 'Drawing...' : 'Pick Winner'}
            </button>
          </div>
        )}

        {!isOwner && isConnected && (
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Information</h3>
            <p className="text-xs text-gray-600">
              The contract owner will draw the winner when the lottery ends.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
