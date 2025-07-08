import React from 'react';
import { Settings, AlertTriangle, Copy, ExternalLink } from 'lucide-react';
import { CONTRACTS } from '../contracts/config';

export const ContractSetup: React.FC = () => {
  const [copied, setCopied] = React.useState<string>('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const contractsNotSet = CONTRACTS.BLESSING_ZAR === '0x0000000000000000000000000000000000000000';

  const blessingZARCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BlessingZAR is ERC20 {
    address public admin;

    constructor(uint256 initialSupply) ERC20("BlessingZAR", "BZAR") {
        admin = msg.sender;
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == admin, "Only admin can mint");
        _mint(to, amount);
    }
}`;

  const communityLendingCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BlessingZAR.sol";

contract CommunityLending {
    BlessingZAR public token;
    uint256 public interestRate = 5; // 5%

    struct Loan {
        uint256 principal;
        uint256 due;
        bool active;
    }

    mapping(address => Loan) public loans;

    constructor(address tokenAddress) {
        token = BlessingZAR(tokenAddress);
    }

    function lend(uint256 amount) external {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }

    function borrow(uint256 amount) external {
        require(!loans[msg.sender].active, "Existing loan");
        uint256 dueAmount = amount + (amount * interestRate / 100);
        loans[msg.sender] = Loan(amount, dueAmount, true);
        require(token.transfer(msg.sender, amount), "Borrow failed");
    }

    function repay() external {
        Loan storage loan = loans[msg.sender];
        require(loan.active, "No loan");
        require(token.transferFrom(msg.sender, address(this), loan.due), "Repay failed");
        loan.active = false;
    }

    function poolBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}`;

  if (!contractsNotSet) {
    return null;
  }

  return (
    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6 mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <Settings className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-semibold text-white">Contract Setup Required</h3>
      </div>

      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <p className="text-gray-300 mb-4">
              To use this application, you need to deploy the smart contracts and update the configuration.
            </p>
            
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
              <h4 className="text-blue-300 font-semibold mb-2">Quick Setup Instructions:</h4>
              <ol className="text-sm text-gray-300 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                  <span>Open <a href="https://remix.ethereum.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Remix IDE</a></span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                  <span>Create and deploy BlessingZAR.sol (copy code below)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                  <span>Deploy CommunityLending.sol with BlessingZAR address</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                  <span>Update contract addresses in <code className="bg-gray-700 px-2 py-1 rounded">src/contracts/config.ts</code></span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">5</span>
                  <span>Connect MetaMask to Celo Alfajores Testnet</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold">BlessingZAR.sol</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(blessingZARCode, 'blessing')}
                  className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">{copied === 'blessing' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
            <pre className="text-xs text-gray-300 bg-gray-900 p-3 rounded overflow-x-auto max-h-40">
              <code>{blessingZARCode}</code>
            </pre>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold">CommunityLending.sol</h4>
              <div className="flex space-x-2">
                <button
                  onClick={() => copyToClipboard(communityLendingCode, 'lending')}
                  className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">{copied === 'lending' ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
            <pre className="text-xs text-gray-300 bg-gray-900 p-3 rounded overflow-x-auto max-h-40">
              <code>{communityLendingCode}</code>
            </pre>
          </div>
        </div>

        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
          <h4 className="text-green-300 font-semibold mb-2">Helpful Links:</h4>
          <div className="space-y-2">
            <a 
              href="https://remix.ethereum.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Remix IDE (Deploy Contracts)</span>
            </a>
            <a 
              href="https://faucet.celo.org/alfajores" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Celo Alfajores Faucet (Get Test CELO)</span>
            </a>
            <a 
              href="https://alfajores-blockscout.celo-testnet.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Celo Alfajores Explorer</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};