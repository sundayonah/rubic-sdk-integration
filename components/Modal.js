import React, { useEffect } from 'react';
import { OnChainTrade } from '@/pages/address';

const Modal = ({ isClose, isOpen, onTokenSelect }) => {
   const handleTokenClick = (selectedToken) => {
      onTokenSelect(selectedToken);
      isClose();
      console.log(selectedToken);
   };

   // useEffect(() => {
   //    async function fetchExchangeRates() {
   //       try {
   //          const response = await fetch('/api/CurrencyRate');
   //          console.log(response);
   //          if (response.ok) {
   //             const data = await response.json();
   //             console.log(data.rates.NGN);
   //          } else {
   //             throw new Error('Failed to fetch exchange rates');
   //          }
   //       } catch (error) {
   //          console.error('Error fetching exchange rates:', error);
   //       }
   //    }
   //    fetchExchangeRates();
   // }, []);

   if (!isOpen) {
      return null;
   }

   return (
      <div className="  ">
         <div className="fixed  bottom-56 z-50 w-full h-full bg-opacity-70 flex justify-center items-center  ">
            {/* left */}
            <div className="bg-[#3b3d4f] p-2 rounded-2xl max-w-lg mx-auto w-[80%] border border-slate-500">
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
                  {OnChainTrade.map((trade) => (
                     <button
                        key={trade.id}
                        onClick={() => handleTokenClick(trade)}
                        // onClick={() => onTokenSelect(trade)}
                        className=" text-gray-300 bg-[#282936] rounded-2xl p-2 mt-2"
                     >
                        {trade.symbol}
                     </button>
                  ))}
               </div>
            </div>
         </div>
         {/* right */}
      </div>
   );
};

export default Modal;
