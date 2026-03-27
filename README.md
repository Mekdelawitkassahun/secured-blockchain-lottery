# Lottery DApp Frontend

A complete Next.js frontend for interacting with your deployed lottery smart contract.

## Contract Address
```
0x1631ae8A44291EC079BB93e28613b312D6EA7D1d
```

## Features

- ✅ Wallet connection with RainbowKit
- ✅ Buy lottery tickets
- ✅ View current players and prize pool
- ✅ Winner announcement system
- ✅ Owner controls for drawing winners
- ✅ Responsive design with Tailwind CSS
- ✅ Real-time contract interactions

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contract Integration

The frontend is configured to work with your lottery contract at `0x1631ae8A44291EC079BB93e28613b312D6EA7D1d`.

Make sure the contract ABI in `src/lib/contract.ts` matches your actual deployed contract ABI.

## Components

- **ConnectButton**: Wallet connection using RainbowKit
- **LotteryCard**: Buy tickets and view prize pool
- **PlayersList**: Display current participants
- **WinnerAnnouncement**: Show winner and owner controls

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Wagmi for Web3 integration
- RainbowKit for wallet UI
- Viem for Ethereum utilities

## Important Notes

- Update the WalletConnect project ID in `src/lib/wagmi.ts`
- Verify the contract ABI matches your deployed contract
- The contract owner address needs to be updated in the WinnerAnnouncement component
- Test on a testnet before using on mainnet
