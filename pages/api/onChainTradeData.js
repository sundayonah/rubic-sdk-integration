// // api/onChainTradeData.js
// ETHEREUM
// const onChainTradeData = [
//    {
//       id: 1,
//       token: '0x3330BFb7332cA23cd071631837dC289B09C33333',
//       symbol: 'ETH',
//       name: '',
//    },
//    {
//       id: 2,
//       token: '0xdac17f958d2ee523a2206206994597c13d831ec7',
//       symbol: 'USDT',
//    },
//    {
//       id: 3,
//       token: '0x514910771af9ca656af840dff83e8264ecf986ca',
//       symbol: 'LINK',
//       name: '',
//    },
//    {
//       id: 4,
//       token: '0xd38bb40815d2b0c2d2c866e0c72c5728ffc76dd9',
//       symbol: 'SIS',
//       name: '',
//    },
//    {
//       id: 5,
//       token: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
//       symbol: 'AAVA',
//       name: '',
//    },
//    {
//       id: 6,
//       token: '0xb8c77482e45f1f44de1745f52c74426c631bdd52',
//       symbol: 'BNB',
//       name: '',
//    },
// ];

// export default function handler(req, res) {
//    res.status(200).json(onChainTradeData);
// }

// BINANCE SMART CHAIN

// const onChainTradeData = [
//    {
//       id: 1,
//       token: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
//       symbol: 'WBNB',
//       name: '',
//    },
//    {
//       id: 2,
//       token: '0x55d398326f99059ff775485246999027b3197955',
//       symbol: 'USDT',
//    },
//    {
//       id: 3,
//       token: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd',
//       symbol: 'LINK',
//       name: '',
//    },
//    {
//       id: 4,
//       token: '0xf98b660adf2ed7d9d9d9daacc2fb0cace4f21835',
//       symbol: 'SIS',
//       name: '',
//    },
//    {
//       id: 5,
//       token: '0xfb6115445bff7b52feb98650c87f44907e58f802',
//       symbol: 'AAVE',
//       name: '',
//    },
//    {
//       id: 6,
//       token: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
//       symbol: 'ETH',
//       name: '',
//    },
// ];

// export default function handler(req, res) {
//    res.status(200).json(onChainTradeData);
// }

// GOERLI TESTNET

const onChainTradeData = [
   // {
   //    id: 1,
   //    token: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
   //    symbol: 'WETH',
   //    name: '',
   // },
   // {
   //    id: 2,
   //    token: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
   //    symbol: 'USDC',
   //    name: '',
   // },
   {
      id: 3,
      token: '"0xD04254F39086545F92A3dcdaaAB45e115d9f7197"',
      symbol: 'MATIC',
      name: '',
   },

   {
      id: 4,
      token: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      symbol: 'USDT',
      name: '',
   },
];
// 0xc2132D05D31c914a87C6611C10748AEb04B58e8F
// 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
// const onChainTradeData = [
//    {
//       id: 1,
//       token: '0xfff9976782d46cc05630d1f6ebab18b2324d6b14',
//       symbol: 'WETH',
//       name: '',
//    },
//    {
//       id: 2,
//       token: '0x75F94f04d2144cB6056CCd0CFF1771573d838974',
//       symbol: 'HORSE',
//       name: '',
//    },
//    {
//       id: 2,
//       token: '0x75F94f04d2144cB6056CCd0CFF1771573d838974',
//       symbol: 'HORSE',
//       name: '',
//    },
// ];

export default function handler(req, res) {
   res.status(200).json(onChainTradeData);
}
