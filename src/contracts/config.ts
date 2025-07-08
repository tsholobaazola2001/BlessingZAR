// Replace these with your actual deployed contract addresses
export const CONTRACTS = {
  BLESSING_ZAR: '0x0000000000000000000000000000000000000000', // Replace with actual BlessingZAR contract address
  COMMUNITY_LENDING: '0x0000000000000000000000000000000000000000' // Replace with actual CommunityLending contract address
};

export const CELO_TESTNET_CONFIG = {
  chainId: '0xAEF3', // 44787 in hex
  chainName: 'Celo Alfajores Testnet',
  nativeCurrency: {
    name: 'Celo',
    symbol: 'CELO',
    decimals: 18
  },
  rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
  blockExplorerUrls: ['https://explorer.celo.org/alfajores']
};
