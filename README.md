Here's a comprehensive README file for your Decentralized Lottery project:

```markdown
# 🎰 Decentralized Lottery - Advanced Blockchain Lottery System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.19-blue.svg)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black.svg)](https://nextjs.org/)
[![Sepolia](https://img.shields.io/badge/Network-Sepolia-green.svg)](https://sepolia.etherscan.io/)

A fully decentralized, provably fair lottery system built on Ethereum (Sepolia testnet) with multiple ticket tiers, referral rewards, and automated prize distribution.

## 📋 Table of Contents
- [Features](#-features)
- [Architecture](#-architecture)
- [Smart Contract](#-smart-contract)
- [Frontend Application](#-frontend-application)
- [Installation](#-installation)
- [Deployment](#-deployment)
- [Usage Guide](#-usage-guide)
- [Testing](#-testing)
- [Security](#-security)
- [License](#-license)

## ✨ Features

### Smart Contract Features
- **30-Second Rounds**: Fast-paced lottery rounds for quick testing and engagement
- **Multiple Ticket Tiers**:
  - Standard Ticket: 0.01 ETH
  - Premium Ticket: 0.05 ETH  
  - VIP Ticket: 0.1 ETH
- **Referral System**: 5% bonus for referring other players
- **Transparent Winner Selection**: On-chain random number generation using `block.prevrandao`
- **Prize Distribution**:
  - 70% goes to Jackpot
  - 10% Referral Rewards Pool
  - 10% Development Fund
  - 10% Next Round Jackpot
- **Manager Controls**: Only contract owner can select winners and reset rounds
- **Emergency Withdraw**: Safety mechanism for fund recovery

### Frontend Features
- **Web3 Wallet Integration**: MetaMask wallet connection with confirmation prompts
- **Real-time Updates**: Live timer countdown and prize pool updates
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Transaction Status**: Real-time feedback for all blockchain transactions
- **Players Leaderboard**: View all participants and their ticket counts
- **Referral Dashboard**: Track your referral earnings and referrals
- **Recent Winners**: Display of previous round winners

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Decentralized Lottery                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌────────────┐ │
│  │   Next.js    │─────▶│   Smart      │─────▶│  Ethereum  │ │
│  │   Frontend   │      │   Contract   │      │  Sepolia   │ │
│  └──────────────┘      └──────────────┘      └────────────┘ │
│         │                     │                     │        │
│         ▼                     ▼                     ▼        │
│  ┌──────────────┐      ┌──────────────┐      ┌────────────┐ │
│  │   MetaMask   │      │  Lottery     │      │  Block     │ │
│  │   Wallet     │      │  Logic       │      │  Explorer  │ │
│  └──────────────┘      └──────────────┘      └────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## 📝 Smart Contract

### Contract Details
- **Network**: Ethereum Sepolia Testnet
- **Solidity Version**: 0.8.19
- **License**: MIT

### Key Functions

| Function | Description | Access |
|----------|-------------|--------|
| `buyTicket(address referralCode)` | Purchase 1 standard ticket | Public (payable) |
| `buyPremiumTicket(address referralCode)` | Purchase 1 premium ticket | Public (payable) |
| `buyVIPTicket(address referralCode)` | Purchase 1 VIP ticket | Public (payable) |
| `buyMultipleTickets(uint tickets, uint type, address ref)` | Purchase multiple tickets | Public (payable) |
| `selectWinner()` | Select and pay winner | Only Manager |
| `resetLottery()` | Start new round | Only Manager |
| `claimReferralRewards()` | Claim referral earnings | Public |
| `getRemainingTime()` | Check seconds left in round | View |
| `getPrizePool()` | Check current prize pool | View |

### Contract State Variables
```solidity
address public manager;           // Contract owner
address[] public players;         // All participants
mapping(address => uint256) playerTickets;  // User tickets
uint256 public lotteryEndTime;     // Round end timestamp
bool public isActive;              // Round status
address public lastWinner;         // Previous winner
uint256 public lastPrize;          // Previous prize amount
```

## 💻 Frontend Application

### Technology Stack
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: ethers.js v6
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast

### Component Structure
```
src/
├── app/
│   ├── page.tsx                 # Main application
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── WalletModal.tsx          # Wallet connection modal
│   ├── TicketPurchase.tsx       # Ticket buying interface
│   ├── CountdownTimer.tsx       # Round timer
│   ├── WinnersList.tsx          # Previous winners display
│   ├── ReferralSystem.tsx       # Referral dashboard
│   ├── Leaderboard.tsx          # Players ranking
│   └── TransactionStatus.tsx    # Transaction feedback
├── abi/
│   └── AdvancedLottery.json     # Contract ABI
└── utils/
    └── constants.ts             # Configuration constants
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MetaMask browser extension
- Sepolia test ETH (for testing)

### Clone Repository
```bash
git clone https://github.com/yourusername/decentralized-lottery.git
cd decentralized-lottery
```

### Install Dependencies
```bash
npm install
```

### Environment Configuration
Create a `.env.local` file:
```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/your-project-id
```

### Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## 🔧 Deployment

### Smart Contract Deployment (Remix)

1. **Open Remix IDE**: https://remix.ethereum.org/
2. **Create new file**: `AdvancedLottery.sol`
3. **Copy contract code** from this repository
4. **Compile** with Solidity 0.8.19
5. **Deploy**:
   - Environment: Injected Provider (MetaMask)
   - Network: Sepolia
   - Ticket Price: `10000000000000000` (0.01 ETH)
   - Click "Deploy"
6. **Confirm** transaction in MetaMask

### Smart Contract Deployment (Hardhat)

```bash
# Install Hardhat
npm install --save-dev hardhat

# Create deployment script
npx hardhat run scripts/deploy.js --network sepolia
```

### Frontend Deployment (Vercel)

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy
```

## 📖 Usage Guide

### For Players

1. **Connect Wallet**
   - Click "Connect Wallet" button
   - Select MetaMask
   - Approve connection

2. **Buy Tickets**
   - Select ticket type (Standard/Premium/VIP)
   - Choose number of tickets (1-10)
   - Enter referral address (optional)
   - Confirm transaction in MetaMask

3. **Check Status**
   - View timer countdown
   - Monitor prize pool growth
   - See your tickets in "Your Tickets"

4. **Claim Rewards**
   - Claim referral bonuses
   - Collect winnings after rounds end

### For Manager

1. **Start New Round**
   - Call `resetLottery()` after previous round ends

2. **Select Winner**
   - Wait for timer to reach 0
   - Call `selectWinner()`
   - Winner receives prize automatically

3. **Withdraw Funds**
   - Call `withdrawDevelopmentFund()` for dev fees
   - Use `emergencyWithdraw()` for emergencies

## 🧪 Testing

### Run Contract Tests
```bash
npx hardhat test
```

### Test Scenarios
```javascript
// Test ticket purchase
describe("Ticket Purchase", () => {
  it("Should allow ticket purchase", async () => {
    await lottery.buyTicket(zeroAddress, { value: ticketPrice });
    expect(await lottery.getPlayerTicketCount(owner.address)).to.equal(1);
  });
});
```

## 🔒 Security Features

- **Reentrancy Guard**: Prevents reentrancy attacks
- **Pausable**: Emergency pause functionality
- **Only Manager**: Critical functions restricted
- **No Direct ETH**: `receive()` function rejects direct payments
- **Gas Efficient**: Optimized for minimal gas usage

## 📊 Contract Statistics

| Metric | Value |
|--------|-------|
| **Max Tickets per Transaction** | 10 |
| **Round Duration** | 30 seconds |
| **Referral Bonus** | 5% |
| **Development Fee** | 10% |
| **Standard Ticket Price** | 0.01 ETH |
| **Premium Ticket Price** | 0.05 ETH |
| **VIP Ticket Price** | 0.1 ETH |

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Transaction failing | Check `isActive()` and call `resetLottery()` |
| MetaMask warning | Click "Continue" - contract is safe |
| Timer at 0 | Call `resetLottery()` to start new round |
| Gas limit too high | Set manual gas limit to 150,000-200,000 |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- OpenZeppelin for security patterns
- Ethereum Foundation for blockchain infrastructure
- Remix IDE for smart contract development
- MetaMask for wallet integration

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/decentralized-lottery/issues)
- **Contract Address**: `0xD95C0dDa842AC8F4ae2f40f42dFA1F81763D863e`
- **Network**: Sepolia Testnet

---

## 🔗 Quick Links

- [Smart Contract on Etherscan](https://sepolia.etherscan.io/address/0xD95C0dDa842AC8F4ae2f40f42dFA1F81763D863e)
- [Live Demo](https://your-demo-url.vercel.app)
- [Video Tutorial](https://youtu.be/your-video-url)

---

<div align="center">
Made with ❤️ for the Web3 Community
</div>
```

This README provides:
- Complete project overview
- Installation instructions
- Deployment guides
- Usage documentation
- Troubleshooting tips
- Security features
- License information

Would you like me to add or modify any sections?
