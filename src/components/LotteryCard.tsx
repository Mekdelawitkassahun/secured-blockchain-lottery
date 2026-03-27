'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { formatEther } from 'viem'
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from '@/lib/contract'

export function LotteryCard() {
  const { address } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const [ticketPrice, setTicketPrice] = useState<string>('0')
  const [balance, setBalance] = useState<string>('0')
  const [isLoading, setIsLoading] = useState(false)

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        // This would typically use wagmi's useReadContract hooks
        // For now, we'll simulate the data
        setTicketPrice('0.01')
        setBalance('0.5')
      } catch (error) {
        console.error('Error fetching contract data:', error)
      }
    }

    fetchContractData()
  }, [isConfirmed])

  const handleBuyTicket = async () => {
    if (!address) return

    try {
      setIsLoading(true)
      writeContract({
        address: LOTTERY_CONTRACT_ADDRESS as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: 'enterLottery',
        value: BigInt(Math.floor(parseFloat(ticketPrice) * 1e18)),
      })
    } catch (error) {
      console.error('Error buying ticket:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Buy Lottery Ticket</h2>
      
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Ticket Price</h3>
          <p className="text-2xl font-bold text-primary">{ticketPrice} ETH</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Current Prize Pool</h3>
          <p className="text-2xl font-bold text-green-600">{balance} ETH</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Your Address</h3>
          <p className="text-sm font-mono text-blue-600 break-all">
            {address || 'Not connected'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm">Error: {error.message}</p>
          </div>
        )}

        {isConfirmed && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            <p className="text-sm">Transaction confirmed! You're entered in the lottery.</p>
          </div>
        )}

        <button
          onClick={handleBuyTicket}
          disabled={!address || isPending || isLoading}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending || isLoading || isConfirming ? 'Processing...' : 'Buy Ticket'}
        </button>
      </div>
    </div>
  )
}
