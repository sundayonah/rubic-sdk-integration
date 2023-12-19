// import React from 'react';
// import { useEffect } from 'react';
// import { BLOCKCHAIN_NAME, PriceToken, PriceTokenAmount, SDK } from 'rubic-sdk';

// const Exploring = () => {
//    const fromBlockchain = BLOCKCHAIN_NAME.ETHEREUM;
//    const fromTokenAddress = '0x0000000000000000000000000000000000000000'; // ETH
//    const fromAmount = 1;
//    const toBlockchain = BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;
//    const toTokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56'; // BUSD

//    const Explore = async () => {
//       const configuration = {
//          rpcProviders: {
//             [BLOCKCHAIN_NAME.ETHEREUM]: {
//                rpcList: [
//                   'https://eth-mainnet.g.alchemy.com/v2/sDAtk9cAWj4JFp6-i9VI-TZQ1YKJWilz',
//                ],
//                //    rpcList: [],
//             },
//             [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
//                rpcList: ['https://bsc-dataseed.binance.org/'],
//                //    rpcList: [],
//             },
//             // [BLOCKCHAIN_NAME.POLYGON]: {
//             //    rpcList: ['https://polygon-rpc.com'],
//             // },
//             //  [BLOCKCHAIN_NAME.SOLANA]: {
//             //     rpcList: ['https://api.mainnet-beta.solana.com'],
//             //  },
//             //  [BLOCKCHAIN_NAME.GOERLI]: {
//             //     rpcList: [
//             //        'https://eth-goerli.g.alchemy.com/v2/yl554fd8p2xFr3naNTl0LfsyoxA-lidx',
//             //     ],
//             //  },
//             // [BLOCKCHAIN_NAME.BITCOIN]: {
//             //    rpcList: ['https://mainnet.bitcoin.org'],
//             // },
//          },
//       };

//       const token = await PriceToken.createToken({
//          blockchain: BLOCKCHAIN_NAME.ETHEREUM,
//          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
//       });
//       console.log(token.price);

//       const tokenAmount = await PriceTokenAmount.createToken({
//          blockchain: BLOCKCHAIN_NAME.ETHEREUM,
//          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
//          tokenAmount: 2,
//       });

//       console.log(tokenAmount.weiAmount);

//       const sdk = await SDK.createSDK(configuration);

//       const wrappedTrades = await sdk.crossChainManager.calculateTrade(
//          { blockchain: fromBlockchain, address: fromTokenAddress },
//          fromAmount,
//          { blockchain: toBlockchain, address: toTokenAddress }
//       );

//       wrappedTrades.forEach((wrappedTrade) => {
//          const tradeType = wrappedTrade.type;
//          console.log(`trade type: ${tradeType}`);

//          if (wrappedTrade.error) {
//             console.log(`error: ${wrappedTrade.error}`);
//          } else {
//             const trade = wrappedTrade.trade;
//             console.log(`to amount: ${trade.to.tokenAmount.toFormat(3)}`);

//             // explore trades info
//             if (trade) {
//                console.log(trade.gasData);
//             }
//          }
//       });
//    };

//    useEffect(() => {
//       Explore();
//    }, []);
//    return <div>Exploring</div>;
// };

// export default Exploring;
