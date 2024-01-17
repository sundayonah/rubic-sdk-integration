import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import gameAbi from '../Contract/dAppGame.json';

// const RubicWidget = () => {
//    useEffect(() => {
//       const connectWallet = async () => {
//          try {
//             // Request access to the user's Ethereum accounts
//             const accounts = await window.ethereum.request({
//                method: 'eth_requestAccounts',
//             });
//             console.log('Connected:', accounts);
//          } catch (error) {
//             console.error('Error connecting wallet:', error.message);
//          }
//       };
//       // describe widget configuration
//       const configuration = {
//          from: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
//          to: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
//          fromChain: 'GOERLI',
//          toChain: 'GOERLI',
//          // from: 'ETH',
//          // to: 'BNB',
//          // fromChain: 'BNB',
//          // toChain: 'ETH',

//          iframe: false,
//          hideSelectionFrom: false,
//          hideSelectionTo: false,
//          theme: 'dark',
//          background: '#293451',
//          // injectTokens: {
//          //    weth: [
//          //       '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6', // WETH on Goerli Testnet
//          //    ],
//          //    eth: ['0x3330BFb7332cA23cd071631837dC289B09C33333'],
//          //    usdc: [
//          //       '0x07865c6E87B9F70255377e024ace6630C1Eaa37F', // USDT on Goerli Testnet
//          //    ],
//          // },
//          slippagePercent: {
//             instantTrades: 17,
//             crossChain: 19,
//          },
//          chainId: 5, // Goerli Testnet chain ID
//       };
//       // console.log(configuration);

//       // prevent accidental changes to the object, for example, when re-creating a widget for another theme

//       // Connect Wallet button click handler
//       // const connectWalletHandler = () => {
//       connectWallet();
//       // };

//       // // prevent accidental changes to the object
//       Object.freeze(configuration);
//       // create widget

//       // initialize Rubic widget
//       window.rubicWidget.init(configuration);
//       console.clear();

//       // cleanup function (optional)
//       return () => {
//          // Perform cleanup if needed
//       };
//    }, []); // empty dependency array ensures the effect runs only once on mount

//    // return (
//    //    <div>

//    //    </div>
//    // );
// };

const SDK = () => {
   const contractAddress = '0x18c5f2E47406fa86d2A3c7be49DfB3De4b5c8FdE';

   const { address, account } = useAccount();

   const [library, setLibrary] = useState(null);

   const PrivateKey = process.env.REACT_APP_PRIVATE_KEY;

   // Assuming you are setting the library using some initialization logic
   useEffect(() => {
      // Example: Initialize library here, perhaps from a web3 provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setLibrary(provider);
   }, []);

   const onMetamaskSignClicked = async () => {
      if (!library) {
         console.error('Library is not initialized.');
         return;
      }
      console.log(address);

      const message = ethers.utils.solidityKeccak256(
         ['address', 'address'],
         [
            '0xD1B77d01db213Baba117f1c8Da6aF097c58E06De', // contract Addfess.
            address, // wallet Address
         ]
      );
      console.log(message);
      const arrayifyMessage = ethers.utils.arrayify(message);
      console.log(arrayifyMessage);
      const flatSignature = await library
         .getSigner()
         .signMessage(arrayifyMessage);
      console.log(flatSignature);
   };

   const onPrivateKeySignClicked = async () => {
      if (!PrivateKey) {
         console.error('REACT_APP_PRIVATE_KEY is not defined');
         return;
      }
      console.log(PrivateKey);

      const message = ethers.utils.solidityKeccak256(
         ['address', 'address'],
         ['0xD1B77d01db213Baba117f1c8Da6aF097c58E06De', address]
      );
      console.log(message);
      const arrayifyMessage = ethers.utils.arrayify(message);
      console.log(arrayifyMessage);
      const flatSignature = await new ethers.Wallet(PrivateKey).signMessage(
         arrayifyMessage
      );
      console.log(flatSignature);
   };

   return (
      <div className="">
         <div id="rubic-widget-root"></div>
         <h1 className="text-white">Rubic SDK Integration</h1>
         {/* Include Rubic SDK script outside of the Head component */}
         <Script
            src="https://widgets.rubic.exchange/iframe/bundle.new-app.min.js"
            strategy="beforeInteractive"
         />

         {/* Other page content */}
         {/* <RubicWidget /> */}

         <button
            onClick={onMetamaskSignClicked}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         >
            Sign with metamask
         </button>

         <button
            onClick={onPrivateKeySignClicked}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         >
            Sign with PrivateKey
         </button>
      </div>
   );
};

export default SDK;
