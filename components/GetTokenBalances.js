import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

// Define the contract addresses for USDC and WETH on Goerli
const usdcAddress = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F';
const wethAddress = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6';

// Fetch the balance of a token for the connected account
async function GetTokenBalance(tokenAddress, accountAddress) {
   const { address } = useAccount();

   try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
         tokenAddress,
         ['function balanceOf(address) view returns (uint256)'],
         provider
      );

      // Call balanceOf function to get the balance
      const balance = await contract.balanceOf(address);
      return balance.toString();
   } catch (error) {
      console.error(`Error fetching balance for token ${tokenAddress}:`, error);
      throw error;
   }
}

// Display balances
async function displayBalances() {
   try {
      // Fetch balances for USDC and WETH
      const usdcBalance = await GetTokenBalance(
         usdcAddress,
         await signer.getAddress()
      );
      const wethBalance = await GetTokenBalance(
         wethAddress,
         await signer.getAddress()
      );

      // Display balances
      console.log(`USDC Balance: ${usdcBalance}`);
      console.log(`WETH Balance: ${wethBalance}`);
   } catch (error) {
      console.error('Error displaying balances:', error);
   }
}

// Execute the function to display balances
displayBalances();
