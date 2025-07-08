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
  blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org']
};

export const addCeloTestnet = async () => {
  try {
    // Check if window.ethereum is available
    if (!window.ethereum) {
      throw new Error('No Ethereum provider found. Please install MetaMask or another Web3 wallet.');
    }

    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [CELO_TESTNET_CONFIG]
    });
  } catch (error) {
    console.error('Error adding Celo testnet:', error);
    throw error; // Re-throw to allow calling code to handle the error
  }
};