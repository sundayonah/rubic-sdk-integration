import React, { useCallback, useEffect, useState } from 'react';
import Modal from '@/components/Modal';

import {
   SDK,
   BLOCKCHAIN_NAME,
   Configuration,
   WalletProvider,
   CHAIN_TYPE,
} from 'rubic-sdk';
import axios from 'axios';

const RubicIntJs = () => {
   const [userInput, setUserInput] = useState('');
   const [result, setResult] = useState('');
   const [initialized, setInitialized] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [outputAmount, setOutputAmount] = useState('');
   const [showMore, setShowMore] = useState(false);

   const [selectedTokenType, setSelectedTokenType] = useState(null);
   const [selectedInputToken, setSelectedInputToken] = useState(null);
   const [selectedOutputToken, setSelectedOutputToken] = useState(null);
   const [tokensSwitched, setTokensSwitched] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   // const [tradeTypes, setTradeTypes] = useState(null);
   // const [tradeTypePrices, setTradeTypePrices] = useState(null);
   // const [tradeAmounts, setTradeAmounts] = useState(null);
   const [tradesData, setTradesData] = useState(null);
   const [onChainTradeData, setOnChainTradeData] = useState([]);

   const openModal = (tokenType) => {
      setSelectedTokenType(tokenType);

      setIsModalOpen(true);
   };

   const closeModal = () => {
      setIsModalOpen(false);
   };

   useEffect(() => {
      async function fetchOnChainTradeData() {
         try {
            const response = await fetch('/api/onChainTradeData');
            if (response.ok) {
               const data = await response.json();

               // console.log(data);
               setOnChainTradeData(data);
            } else {
               throw new Error('Failed to fetch onChainTradeData');
            }
         } catch (error) {
            console.error('Error fetching onChainTradeData:', error);
         }
      }

      fetchOnChainTradeData();
   }, []);

   const initializeRubicSDK = useCallback(async () => {
      const config = {
         rpcProviders: {
            [BLOCKCHAIN_NAME.ETHEREUM]: {
               rpcList: [
                  'https://eth-mainnet.g.alchemy.com/v2/sDAtk9cAWj4JFp6-i9VI-TZQ1YKJWilz',
               ],
               //    rpcList: [],
            },
            // [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
            //    rpcList: ['https://bsc-dataseed.binance.org/'],
            //    //    rpcList: [],
            // },
            // [BLOCKCHAIN_NAME.POLYGON]: {
            //    rpcList: ['https://polygon-rpc.com'],
            // },
            // [BLOCKCHAIN_NAME.SOLANA]: {
            //    rpcList: ['https://api.mainnet-beta.solana.com'],
            // },
            // [BLOCKCHAIN_NAME.NEAR]: {
            //    rpcList: ['https://rpc.mainnet.near.org'],
            // },
            // [BLOCKCHAIN_NAME.BITCOIN]: {
            //    rpcList: ['https://mainnet.bitcoin.org'],
            // },
         },
      };

      // console.log(config);
      // console.log(BLOCKCHAIN_NAME);

      try {
         const sdk = await SDK.createSDK(config);
         // console.log('Rubic SDK initialized:', sdk.onChainManager);

         return sdk;
      } catch (error) {
         console.error('Error initializing Rubic SDK:', error);
         throw error; // Rethrow the error to handle it in the calling code
      }
   }, []);

   useEffect(() => {
      const fetchData = async () => {
         try {
            await initializeRubicSDK();
            // Do something with sdk, if needed
         } catch (error) {
            console.error('Error initializing Rubic SDK:', error);
         }
      };

      fetchData();
   }, [initializeRubicSDK]);

   const handleTokenSelect = useCallback(
      async (selectedToken) => {
         // Check if the required data is available
         // if (!selectedInputToken || !selectedOutputToken || !userInput) {
         //    setIsLoading(false); // Set loading to false if we return early
         //    return;
         // }

         // if (!userInput) {
         //    setIsLoading(false); // Set loading to false if we return early
         //    return;
         // }
         setIsLoading(true);

         try {
            const sdk = await initializeRubicSDK();

            const blockchain = BLOCKCHAIN_NAME.ETHEREUM;

            let fromTokenAddress = '';
            let toTokenAddress = '';
            const fromAmount = parseFloat(userInput);

            if (selectedTokenType === 'input') {
               fromTokenAddress =
                  selectedToken.token || selectedInputToken?.token;
               toTokenAddress = selectedOutputToken?.token;

               console.log(fromTokenAddress, toTokenAddress);

               // Update the selected input token state
               setSelectedInputToken(selectedToken);
            } else if (selectedTokenType === 'output') {
               fromTokenAddress = selectedInputToken?.token;
               toTokenAddress =
                  selectedToken.token || selectedOutputToken?.token;

               // Update the selected output token state
               setSelectedOutputToken(selectedToken);
            }

            if (!fromTokenAddress || !toTokenAddress || !fromAmount) {
               throw new Error('Make sure all the conditions are meet');
            }

            console.log(fromAmount, userInput);
            // Calculate trades only if conditions are met
            if (selectedInputToken && selectedOutputToken && userInput) {
               console.log('execute trades');
               const trades = await sdk.onChainManager.calculateTrade(
                  { blockchain, address: fromTokenAddress },
                  fromAmount,
                  toTokenAddress
               );
               // console.log(trades, 'trades');
               // const bestTrade = trades[0];
               // console.log(bestTrade.type, 'best trade');
               const tradesData = trades.map((trade) => ({
                  type: trade.type,
                  amount:
                     trade.to && trade.to.tokenAmount
                        ? trade.to.tokenAmount.toFormat(7)
                        : 'N/A',
               }));

               setTradesData(tradesData);

               console.log(tradesData);

               // const tradeTypesArray = trades.map((trade) => trade.type);
               // console.log(tradeTypesArray);
               // setTradeTypes(tradeTypesArray.join(', '));

               // const amountsArray = trades.map((trade) =>
               //    trade.to && trade.to.tokenAmount
               //       ? trade.to.tokenAmount.toFormat(3)
               //       : 'N/A'
               // );
               // console.log(amountsArray);
               // setTradeAmounts(amountsArray.join(', '));

               trades.forEach((trade) => {
                  // const tradeType = trade.type;
                  // setTradeTypes(tradeType);
                  // console.log(`trade type: ${tradeType}`);
                  console.log(trade.to);
                  if (trade && trade.to && trade.to.tokenAmount) {
                     console.log(
                        `to amount: ${trade.to.tokenAmount.toFormat(3)}`
                     );
                     setResult(`${trade.to.tokenAmount.toFormat(7)}`);
                     setIsLoading(false);
                  } else if (trade) {
                     console.log(`error: ${trade.error}`);
                  }
               });
            }

            // const trades = await sdk.onChainManager.calculateTrade(
            //    { blockchain, address: fromTokenAddress },
            //    fromAmount,
            //    toTokenAddress
            // );
            // console.log(trades, 'trades');
            // const bestTrade = trades[0];
            // console.log(bestTrade.type, 'best trade');

            // trades.forEach((trade) => {
            //    const tradeType = trade.type;
            //    setTradeTypes(tradeType);
            //    console.log(`trade type: ${tradeType}`);

            //    if (trade && trade.to && trade.to.tokenAmount) {
            //       console.log(`to amount: ${trade.to.tokenAmount.toFormat(3)}`);
            //       setResult(`${trade.to.tokenAmount.toFormat(4)}`);
            //       setIsLoading(false);
            //    } else if (trade) {
            //       console.log(`error: ${trade.error}`);
            //    }
            // });
         } catch (error) {
            console.error('Error handling user input:', error);
         }
      },
      [
         userInput,
         selectedTokenType,
         selectedInputToken,
         selectedOutputToken,
         initializeRubicSDK,
      ]
   );

   // // Effect to handle token selection
   // useEffect(() => {
   //    // Check if both input and output tokens are selected and user input is provided
   //    if (selectedInputToken && selectedOutputToken && userInput !== '') {
   //       handleTokenSelect();
   //       // Set tokensSwitched to true to avoid calling handleTokenSelect multiple times
   //       setTokensSwitched(true);
   //    } else {
   //       // Reset tokensSwitched when any of the conditions is not met
   //       setTokensSwitched(false);
   //    }
   // }, [
   //    selectedInputToken,
   //    selectedOutputToken,
   //    userInput,
   //    handleTokenSelect,
   //    initialized,
   //    tokensSwitched,
   // ]);

   // useEffect(() => {
   //    if (selectedInputToken && userInput !== '') {
   //       handleTokenSelect(selectedInputToken);
   //    } else if (selectedOutputToken && userInput !== '') {
   //       handleTokenSelect(selectedOutputToken);
   //    }
   // }, [selectedInputToken, selectedOutputToken, userInput, handleTokenSelect]);

   useEffect(() => {
      // Check if both input and output tokens are selected and user input is provided
      if (selectedInputToken && selectedOutputToken && userInput !== '') {
         console.log('run');
         handleTokenSelect(selectedInputToken, selectedOutputToken, userInput);
      }
   }, [selectedInputToken, selectedOutputToken, userInput, handleTokenSelect]);

   // console.log(tradeTypes);

   // This function is triggered when the "Swap" button is clicked
   const handleSwapButtonClick = () => {
      setInitialized(true);
   };

   const handleTokenSwitch = () => {
      if (selectedInputToken && selectedOutputToken) {
         // Swap input and output tokens
         setSelectedInputToken(selectedOutputToken);
         setSelectedOutputToken(selectedInputToken);

         // Swap input amount and result
         const tempInput = userInput;
         setUserInput(result);
         setResult(tempInput);

         // Toggle selected token type
         setSelectedTokenType(
            selectedTokenType === 'input' ? 'output' : 'input'
         );
      } else {
         // Handle the case where one of the tokens is not selected
         console.error('Please select both input and output tokens.');
      }
   };

   // const handleTokenSwitch = async () => {
   //    // Swap input and output tokens
   //    if (selectedTokenType === 'input') {
   //       setSelectedInputToken(selectedOutputToken);
   //       setSelectedOutputToken(selectedInputToken);
   //    } else {
   //       setSelectedOutputToken(selectedInputToken);
   //       setSelectedInputToken(selectedOutputToken);
   //    }

   //    // Swap input amount and result
   //    const tempInput = userInput;
   //    setUserInput(result);
   //    setResult(tempInput);

   //    // Toggle selected token type
   //    // setSelectedTokenType((prevType) =>
   //    //    prevType === 'input' ? 'output' : 'input'
   //    // );
   //          setSelectedTokenType(
   //             selectedTokenType === 'input' ? 'output' : 'input'
   //          );

   //    // Set tokensSwitched to true
   //    setTokensSwitched(true);
   //    await handleTokenSelect(selectedInputToken);
   // };

   // console.log(selectedInputToken);
   // console.log(selectedOutputToken);

   return (
      <>
         <div className="mx-auto mt-12">
            <div className=" m-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 ">
               {/* RIGHT SIDE */}
               <div>
                  <div className=" p-6 rounded-2xl shadow-2xl bg-[#3b3d4f]">
                     <div className="flex py-3">
                        <p className="text-gray-300 pr-2">Swap</p>
                        <span className="text-gray-500">Gas</span>
                     </div>
                     <div className="space-y-0.5 relative">
                        <div className="flex justify-between  items-center py-3 px-2 rounded-t-2xl bg-[#222331]">
                           <div className="mb-4">
                              <button
                                 className="w-full py-2 px-4  text-gray-300 rounded-2xl bg-[#3b3d4f] "
                                 onClick={() => openModal('input')}
                                 // value={inputToken}
                                 // onChange={(e) => setInputToken(e.target.value)}
                              >
                                 {selectedInputToken
                                    ? selectedInputToken.symbol
                                    : 'Select Token'}
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
                        {/* Switch Button */}
                        <div className="flex justify-center absolute left-48 bottom-16">
                           <button
                              onClick={handleTokenSwitch}
                              className=" bg-[#3b3d4f] border border-gray-600 rounded-full py-2 px-2 text-white"
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor"
                                 className="w-5 h-5"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                                 />
                              </svg>
                           </button>
                        </div>
                        <div className="flex justify-between  items-center py-3 px-2 rounded-b-2xl bg-[#222331]">
                           <div className="mb-4">
                              <button
                                 className="w-full py-2 px-4   text-gray-300 rounded-2xl bg-[#3b3d4f]"
                                 onClick={() => openModal('output')}
                                 // value={outputToken}
                                 // onChange={(e) => setOutputToken(e.target.value)}
                              >
                                 {selectedOutputToken
                                    ? selectedOutputToken.symbol
                                    : 'Select Token'}
                              </button>
                           </div>
                           {userInput &&
                              selectedOutputToken &&
                              selectedInputToken && (
                                 <div className="flex flex-col">
                                    <span className="text-gray-300 text-end">
                                       {isLoading ? 'Calculating...' : result}
                                    </span>
                                    {/* <span className="text-gray-500">
                                 {isLoading
                                    ? 'Please wait...'
                                    : `1 ${selectedInputToken.symbol} = ${
                                         isLoading ? '...' : result
                                      } ${selectedOutputToken.symbol}`}
                              </span> */}
                                 </div>
                              )}
                        </div>
                     </div>

                     <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        onClick={handleSwapButtonClick}
                     >
                        Swap
                     </button>
                  </div>
               </div>
               {/* LEFT SIDE */}
               {tradesData && (
                  <div className="">
                     <div className=" p-4  rounded-2xl shadow-2xl bg-[#3b3d4f]">
                        <span className="text-white pl-3">Providers List</span>
                        <div className=" overflow-y-scroll h-96 scroll-smooth customScrollbar">
                           <div className="text-gray-300 p-3  bg-[#3b3d4f]">
                              {tradesData.map((data) => (
                                 <div
                                    key={data.type}
                                    className="space-y-0.5 py-1 px-2"
                                 >
                                    <div className=" flex-col flex justify-between  py-1 px-3 rounded-t-2xl bg-[#222331]">
                                       <span>{data.amount}... ...</span>
                                       <span className="text-xs">
                                          {data.type}
                                       </span>
                                    </div>
                                    <div className="flex justify-between  items-center py-2 px-3 rounded-b-2xl bg-[#2c2d3e]">
                                       <span className="text-xs">115.88</span>
                                       <span className="text-xs">1m</span>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
         <Modal
            isOpen={isModalOpen}
            isClose={closeModal}
            onTokenSelect={(selectedToken) => handleTokenSelect(selectedToken)}
            tokens={onChainTradeData}
         />
      </>
   );
};

export default RubicIntJs;

// // Effect to handle token selection
// useEffect(() => {
//    // Check if both input and output tokens are selected and user input is provided
//    if (selectedInputToken && selectedOutputToken && userInput !== '') {
//       // Check if initialized is true and handleTokenSelect has not been called after switching
//       if (initialized && !tokensSwitched) {
//          // Call handleTokenSelect after switching
//          handleTokenSelect();
//          // Set tokensSwitched to true to avoid calling handleTokenSelect multiple times
//          setTokensSwitched(true);
//       }
//    }
// }, [selectedInputToken, selectedOutputToken, userInput, handleTokenSelect, initialized, tokensSwitched]);
