import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Token = () => {
   const [selectedNetwork, setSelectedNetwork] = useState('Ethereum');
   const [tokens, setTokens] = useState([]);
   const [filteredTokens, setFilteredTokens] = useState([]);

   // useEffect(() => {
   //    const fetchData = async () => {
   //       try {
   //          const response = await axios.get('/api/hello');
   //          // console.log(response.data);
   //          setTokens(response.data);
   //          setFilteredTokens(response.data);
   //       } catch (error) {
   //          console.error('Error fetching data:', error);
   //       }
   //    };

   //    fetchData();
   // }, []);

   // // Function to handle token filtering based on input valu
   // const handleTokenFilter = (e) => {
   //    const inputValue = e.target.value.toLowerCase();
   //    const filtered = tokens.filter((token) =>
   //       token.name.toLowerCase().includes(inputValue)
   //    );
   //    setFilteredTokens(filtered);
   // };

   //    const filterTokens = (tokenList) => {
   //       const filtered = tokenList.filter(
   //          (token) => token.blockchain === selectedNetwork
   //       );
   //       setFilteredTokens(filtered);
   //    };

   // Function to format volum
   // function formatVolume(volume) {
   //    // Check if volume is in billions
   //    if (volume >= 1e9) {
   //       return (volume / 1e9).toFixed(2) + 'B';
   //    }
   //    // Check if volume is in millions
   //    else if (volume >= 1e6) {
   //       return (volume / 1e6).toFixed(2) + 'M';
   //    }
   //    // Otherwise, return volume as is
   //    else {
   //       return volume.toFixed(2);
   //    }
   // }

   return (
      <>
         <div className="max-w-5xl mx-auto px-4 mt-16">
            <h1 className="text-2xl">Top tokens on Uniswap</h1>

            <div className="flex gap-6 mt-6">
               <div>Ethereum</div>
               <div>1D</div>
               <div>
                  <input
                     className=" bg-[#121212] border rounded-md px-2 "
                     placeholder="Filter Tokens"
                     onChange={handleTokenFilter}
                  />
               </div>
            </div>

            {/* <div className="flex gap-6 mt-6">
               {[
                  'Ethereum',
                  'Arbitrum',
                  'Optimism',
                  'BNB Chain',
                  'Polygon',
                  'Base',
                  'Celo',
                  'Avalanche',
               ].map((network) => (
                  <div
                     key={network}
                     className={`cursor-pointer ${
                        selectedNetwork === network ? 'font-bold' : ''
                     }`}
                     onClick={() => handleNetworkChange(network)}
                  >
                     {network}
                  </div>
               ))}
               <div>1D</div>
               <div>
                  <input
                     className="bg-transparent border rounded-md px-2"
                     placeholder="Filter Tokens"
                     onChange={handleFilterChange}
                  />
               </div>
            </div> */}
            <div className="border border-gray-600 px-4 mb-4 rounded-lg mt-10 py-4 bg-[#121212]">
               <div className="grid grid-flow-col space-x-4 gap-3">
                  <span className="text-sm text-gray-500"># Token name</span>
                  <span className="text-sm text-gray-500">Price</span>
                  <span className="text-sm text-gray-500">Change</span>
                  <span className="text-sm text-gray-500">TVL</span>
                  <span className="text-sm text-gray-500">Volume</span>
               </div>
               {/* 
               <div>
                  {filteredTokens.map(
                     (
                        {
                           id,
                           name,
                           symbol,
                           logo,
                           quote: {
                              USD: { price, percent_change_1h, volume_24h },
                           },
                        },
                        index
                     ) => {
                        // Determine text color based on percent_change_1h

                        const textColor =
                           percent_change_1h >= 0
                              ? 'text-green-500'
                              : 'text-red-500';

                        return (
                           <div
                              key={id}
                              className="grid grid-flow-col mt-8 space-x-4 gap-3"
                           >
                              <span className="flex items-center gap-2 text-sm">
                                 <p className="text-gray-500 text-sm">
                                    {index + 1}
                                 </p>{' '}
                                 <img
                                    src={logo}
                                    width={20}
                                    height={20}
                                    alt="tokens logo"
                                 />
                                 {name}
                                 <p className="text-gray-500">{symbol}</p>
                              </span>

                              <span className="text-sm">
                                 $
                                 {price.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                 })}
                              </span>
                              <span className="text-sm">
                                 {percent_change_1h.toFixed(2)}
                              </span>
                              <span className="text-sm">$2.7B</span>
                              <span className="text-sm">
                                 ${formatVolume(volume_24h)}
                              </span>
                           </div>
                        );
                        //  </div>
                     }
                  )}
               </div> */}
            </div>
         </div>
      </>
   );
};

export default Token;
