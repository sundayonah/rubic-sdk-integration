import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';

import {
   SDK,
   BLOCKCHAIN_NAME,
   Configuration,
   WalletProvider,
   CHAIN_TYPE,
} from 'rubic-sdk';

const RubicIntJs = () => {
   const [inputToken, setInputToken] = useState(''); // Default input token
   const [outputToken, setOutputToken] = useState(''); // Default output token
   const [userInput, setUserInput] = useState('');
   const [result, setResult] = useState('');
   const [initialized, setInitialized] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [outputAmount, setOutputAmount] = useState('');
   const [showMore, setShowMore] = useState(false);
   const [selectedBlockchain, setSelectedBlockchain] = useState(null);

   const openModal = () => {
      setIsModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   // const handleTokenSwap = async () => {
   //    try {
   //       const sdk = await initializeRubicSDK();

   //       // Get token addresses based on user selections
   //       const fromTokenAddress = getTokenAddress(inputToken);
   //       const toTokenAddress = getTokenAddress(outputToken);

   //       const fromAmount = parseFloat(userInput); // Convert user input to a number

   //       // Perform token swap calculation or trade execution using Rubic SDK
   //       // ...

   //       // Update result based on the trade information obtained
   //       // ...
   //    } catch (error) {
   //       setResult(`Error: ${error.message}`);
   //    }
   // };

   // // This function fetches token addresses based on token symbols
   // const getTokenAddress = (tokenSymbol) => {
   //    // Logic to fetch the token address for the provided symbol from a data source or mapping
   //    // Example: Ethereum - ETH, USDT - Token address for USDT
   //    // ...

   //    return 'Token Address'; // Return the token address corresponding to the symbol
   // };

   async function initializeRubicSDK() {
      const config = {
         rpcProviders: {
            [BLOCKCHAIN_NAME.ETHEREUM]: {
               rpcList: [
                  'https://eth-mainnet.g.alchemy.com/v2/sDAtk9cAWj4JFp6-i9VI-TZQ1YKJWilz',
               ],
               //    rpcList: [],
            },
            [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
               rpcList: ['https://bsc-dataseed.binance.org/'],
               //    rpcList: [],
            },
            [BLOCKCHAIN_NAME.POLYGON]: {
               rpcList: ['https://polygon-rpc.com'],
            },
            [BLOCKCHAIN_NAME.SOLANA]: {
               rpcList: ['https://api.mainnet-beta.solana.com'],
            },
            [BLOCKCHAIN_NAME.NEAR]: {
               rpcList: ['https://rpc.mainnet.near.org'],
            },
            [BLOCKCHAIN_NAME.BITCOIN]: {
               rpcList: ['https://mainnet.bitcoin.org'],
            },
         },
      };

      console.log(config);
      console.log(BLOCKCHAIN_NAME);

      try {
         const sdk = await SDK.createSDK(config);
         console.log('Rubic SDK initialized:', sdk.onChainManager);

         return sdk;
      } catch (error) {
         console.error('Error initializing Rubic SDK:', error);
         throw error; // Rethrow the error to handle it in the calling code
      }
   }

   const handleTokenSelect = useCallback(async () => {
      try {
         const sdk = await initializeRubicSDK();

         // const blockchain = BLOCKCHAIN_NAME.ETHEREUM;
         const blockchain = selectedBlockchain || BLOCKCHAIN_NAME.ETHEREUM;

         console.log(blockchain);
         const fromTokenAddress = '0x0000000000000000000000000000000000000000';
         const fromAmount = parseFloat(userInput); // Convert user input to a number
         const toTokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

         console.log(fromAmount);

         const trades = await sdk.onChainManager.calculateTrade(
            { blockchain, address: fromTokenAddress },
            fromAmount,
            toTokenAddress
         );
         console.log(trades, 'trades');
         const bestTrade = trades[0];
         console.log(bestTrade, 'best trade');

         trades.forEach((trade) => {
            const tradeType = trade.type;
            console.log(`trade type: ${tradeType}`);

            if (trade && trade.to && trade.to.tokenAmount) {
               console.log(`to amount: ${trade.to.tokenAmount.toFormat(3)}`);
               setResult(`${trade.to.tokenAmount.toFormat(3)}`);
            } else if (trade) {
               console.log(`error: ${trade.error}`);
            }
         });
      } catch (error) {
         console.error('Error handling user input:', error);
         // Handle error if needed
      }
   }, [selectedBlockchain, userInput]);

   useEffect(() => {
      if (userInput && initialized) {
         handleTokenSelect();
         // handleTokenSwap();
      }
   }, [userInput, initialized, handleTokenSelect]);

   // This function is triggered when the "Swap" button is clicked
   const handleSwapButtonClick = () => {
      setInitialized(true); // Signal that the user wants to execute the swap
   };

   const handleButtonClick = () => {
      setInitialized(true);
   };

   const handleBlockchainSelect = (blockchain) => {
      setSelectedBlockchain(blockchain);
      closeModal(); // Close the modal after selecting a blockchain
   };

   const visibleTokens = showMore
      ? Object.entries(BLOCKCHAIN_NAME)
      : Object.entries(BLOCKCHAIN_NAME).slice(0, 11);

   return (
      <>
         <div className="max-w-2xl mx-auto p-3 rounded-2xl shadow-lg bg-[#3b3d4f]">
            <div className="flex py-3">
               <p className="text-gray-300 pr-2">Swap</p>
               <span className="text-gray-500">Gas</span>
            </div>
            <div className="space-y-0.5">
               <div className="flex justify-between  items-center py-3 px-2 rounded-t-2xl bg-[#222331]">
                  <div className="mb-4">
                     <button
                        className="w-full p-2  text-gray-300 rounded-2xl bg-[#3b3d4f] "
                        onClick={openModal}
                        value={inputToken}
                        onChange={(e) => setInputToken(e.target.value)}
                     >
                        {BLOCKCHAIN_NAME[inputToken] || 'Select Token'}
                     </button>
                  </div>

                  <div className="mb-4">
                     <input
                        type="number"
                        id="inputAmount"
                        name="inputAmount"
                        className="quantity text-gray-200 text-right bg-transparent rounded-md px-4 py-2 focus:outline-none focus:ring-0 border-none"
                        placeholder="Enter amount"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                     />
                  </div>
               </div>
               <div className="flex justify-between  items-center py-3 px-2 rounded-b-2xl bg-[#222331]">
                  <div className="mb-4">
                     <button
                        className="w-full p-2  text-gray-300 rounded-2xl bg-[#3b3d4f]"
                        onClick={openModal}
                        value={outputToken}
                        onChange={(e) => setOutputToken(e.target.value)}
                     >
                        {BLOCKCHAIN_NAME[outputToken] || 'Select Token'}
                     </button>
                  </div>
                  {userInput ? (
                     <div className="flex flex-col ">
                        <span className="text-gray-300">{result}</span>
                        <span className="text-gray-500">
                           1 {inputToken} = {result} {outputToken}
                        </span>
                     </div>
                  ) : (
                     ''
                  )}
               </div>
            </div>

            <button
               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
               onClick={handleSwapButtonClick}
            >
               Swap
            </button>
            <div>
               <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="Select Token Modal"
                  className="Modal"
                  overlayClassName="Overlay"
               >
                  <div className="fixed top-0 left-0 z-50 w-full h-full bg-opacity-70 flex justify-center items-center  ">
                     {/* left */}
                     <div className="bg-[#3b3d4f] p-2 rounded-2xl max-w-6xl mx-auto w-[70%]">
                        <span>Swap Form</span>
                        <button onClick={closeModal} className="pl-5">
                           close modal
                        </button>
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
                        <div className="w-[35%] p-4 rounded-md max-w-5xl grid grid-cols-2 gap-4">
                           {visibleTokens.map(([key, value]) => (
                              <div
                                 key={key}
                                 value={key}
                                 className="rounded-2xl text-xs p-2 bg-[#282936] flex flex-col justify-center items-center text-white"
                              >
                                 <img
                                    src="/myFavicon.png"
                                    width={20}
                                    height={20}
                                 />
                                 <button
                                    className="text-xs font-light "
                                    onClick={() => handleBlockchainSelect(key)}
                                 >
                                    {value}
                                 </button>
                              </div>
                           ))}
                           {Object.entries(BLOCKCHAIN_NAME).length > 11 && (
                              <div
                                 key="showMore"
                                 value="showMore"
                                 className="rounded-2xl text-xs p-2 bg-[#282936] flex flex-col justify-center items-center text-white"
                              >
                                 <button
                                    className="rounded-2xl text-xs p-2 bg-[#282936] w-30"
                                    onClick={() => setShowMore(!showMore)}
                                 >
                                    {showMore
                                       ? 'Show Less'
                                       : `+${
                                            Object.entries(BLOCKCHAIN_NAME)
                                               .length - 11
                                         } `}
                                 </button>
                              </div>
                           )}
                        </div>
                     </div>
                     {/* right */}
                  </div>
               </Modal>
            </div>
         </div>
      </>
   );
};

export default RubicIntJs;
