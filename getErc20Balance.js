const { ethers } = require('ethers');
const fs = require('fs');
const util = require('util');

// Standard ERC-20 ABI for balanceOf and decimals functions
const ERC20_ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// Function to get ERC-20 token balance
async function getErc20Balance(contractAddress, walletAddress, providerUrl) {
    try {
        // Create provider
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);

        // Create contract instance
        const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);

        // Get balance
        const balance = await contract.balanceOf(walletAddress);

        // Get decimals
        const decimals = await contract.decimals();

        // Format balance
        const formattedBalance = ethers.utils.formatUnits(balance, decimals);

        return formattedBalance;
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw error;
    }
}

// Main function to execute
async function main() {
    // Input parameters
    const contractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'; // USDT on Ethereum
    const walletAddress = '0x...'; // Replace with the wallet address
    const providerUrl = 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'; // Replace with your provider URL

    // Get balance
    const balance = await getErc20Balance(contractAddress, walletAddress, providerUrl);

    // Log to console and file
    const logMessage = `User balance: ${balance} USDT`;
    console.log(logMessage);

    // Append to log file
    fs.appendFile('balance_log.txt', logMessage + '\n', (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

// Execute main function
main().catch((error) => {
    console.error('Main execution error:', error);
});
