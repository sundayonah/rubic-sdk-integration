import React from 'react';
import SDK, { BLOCKCHAIN_NAME, Configuration, WalletProvider } from 'rubic-sdk';

const RubicInt = () => {
   async function initializeRubicSDK(): Promise<any> {
      const config: Configuration = {
         rpcProviders: {
            [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
               mainRpc: 'https://bsc-dataseed.binance.org/',
            } 
            [BLOCKCHAIN_NAME.POLYGON]: {
               mainRpc: 'https://polygon-rpc.com',
               rpcList: [],
            } as RpcProvider<string>,
            [BLOCKCHAIN_NAME.POLYGON]: {
               mainRpc: 'https://polygon-rpc.com',
               rpcList: [],

               spareRpc: 'https://rpc-mainnet.maticvigil.com ',
               mainRpcTimeout: 5000,
               healthCheckTimeout: 5000,
            } as RpcProvider<string>,
         },
      };

      try {
         const rubicSDK = await SDK.createSDK(config);
         console.log('Rubic SDK initialized:', rubicSDK);

         const fromToken = {
            blockchain: BLOCKCHAIN_NAME.ETHEREUM,
            address: '0x0000000000000000000000000000000000000000',
         };
         const fromAmount = 1;
         const toTokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';

         // calculate trades
         const trades = await rubicSDK.instantTrades.calculateTrade(
            fromToken,
            fromAmount,
            toTokenAddress
         );
         const bestTrade = trades[0];
         console.log(bestTrade);

         return rubicSDK;
      } catch (error) {
         console.error('Error initializing Rubic SDK:', error);
         throw error; // Rethrow the error to handle it in the calling code
      }
   }
   initializeRubicSDK();

   return <div>RubicInt</div>;
};

export default RubicInt;
