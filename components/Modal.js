import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
// import { OnChainTrade } from '@/pages/data/onChainTradeData';

const Modal = ({ isClose, isOpen, onTokenSelect, tokens }) => {
   const { address } = useAccount();

   const [onChainTradeData, setOnChainTradeData] = useState([]);
   // const [onChainTradeDataAndBalance, setOnChainTradeDataAndBalance] = useState(
   //    []
   // );

   const handleTokenClick = (selectedToken) => {
      onTokenSelect(selectedToken);
      isClose();
      // console.log(selectedToken);
   };

   // console.log(tokens);

   // useEffect(() => {
   //    async function fetchOnChainTradeData() {
   //       try {
   //          const response = await fetch('/api/onChainTradeData');
   //          if (response.ok) {
   //             const data = await response.json();

   //             // console.log(data);
   //             setOnChainTradeData(data);
   //          } else {
   //             throw new Error('Failed to fetch onChainTradeData');
   //          }
   //       } catch (error) {
   //          console.error('Error fetching onChainTradeData:', error);
   //       }
   //    }

   //    fetchOnChainTradeData();
   // }, []);

   // // Fetch the balance of a token for the connected account
   // async function GetTokenBalance(tokenAddress) {
   //    try {
   //       const provider = new ethers.BrowserProvider(window.ethereum);
   //       const contract = new ethers.Contract(
   //          tokenAddress,
   //          ['function balanceOf(address) view returns (uint256)'],
   //          provider
   //       );

   //       // Call balanceOf function to get the balance
   //       const balance = await contract.balanceOf(address);
   //       return balance.toString();
   //    } catch (error) {
   //       console.error(
   //          `Error fetching balance for token ${tokenAddress}:`,
   //          error
   //       );
   //       throw error;
   //    }
   // }

   // // Display balances
   // async function DisplayBalances() {
   //    try {
   //       // console.log(onChainTradeData);

   //       // Fetch balances for each token in onChainTradeData
   //       const balances = await Promise.all(
   //          onChainTradeData.map(async (token) => {
   //             const tokenBalance = await GetTokenBalance(token.token);
   //             // console.log(tokenBalance);
   //             return { ...token, balance: tokenBalance };
   //          })
   //       );
   //       setOnChainTradeDataAndBalance(balances);

   //       // console.log('Balances:', balances);

   //    } catch (error) {
   //       console.error('Error displaying balances:', error);
   //    }
   // }

   // // Execute the function to display balances
   // DisplayBalances();

   if (!isOpen) {
      return null;
   }

   return (
      <div className="  ">
         <div className="fixed  bottom-52 z-50 w-full h-full bg-opacity-70 flex justify-center items-center  ">
            {/* left */}
            <div className="bg-[#3b3d4f] p-2 rounded-2xl max-w-lg mx-auto w-[80%] border border-slate-600">
               <div className="flex justify-between items-center py-2 px-4">
                  <span className="text-gray-300">Swap Form</span>
                  <button className="text-gray-300" onClick={isClose}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M6 18L18 6M6 6l12 12"
                        />
                     </svg>
                  </button>
               </div>
               <div className="mb-4">
                  <input
                     type="number"
                     id="inputAmount"
                     name="inputAmount"
                     className="w-full text-gray-200 bg-[#282936]  rounded-lg px-4 py-2 focus:outline-none focus:ring-0"
                     placeholder="Search name or paste address..."
                     // value={inputAmount}
                     // onChange={(e) => setInputAmount(e.target.value)}
                  />
               </div>

               <div className="grid grid-cols-3  space-x-3 m-1">
                  {tokens.map((trade) => (
                     <>
                        <button
                           key={trade.id}
                           onClick={() => handleTokenClick(trade)}
                           // onClick={() => onTokenSelect(trade)}
                           className=" text-gray-300 bg-[#282936] rounded-2xl p-2 mt-2"
                        >
                           {trade.symbol}
                        </button>
                        {/* <span>{trade.balance}</span> */}
                     </>
                  ))}
               </div>
            </div>
         </div>
         {/* right */}
      </div>
   );
};

export default Modal;
