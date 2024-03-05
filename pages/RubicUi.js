import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
// import gameAbi from '../Contract/dAppGame.json';

const RubicWidget = () => {
   useEffect(() => {
      const configuration = {
         from: '',
         to: '',
         fromChain: '',
         toChain: '',

         // iframe: true,
         hideSelectionFrom: false,
         hideSelectionTo: true,
         tokenSearch: true,
         rubicLink: true,
         theme: 'dark',
         background: '#28372e',
         // injectTokens: {
         //    weth: [
         //       '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6', // WETH on Goerli Testnet
         //    ],
         //    eth: ['0x3330BFb7332cA23cd071631837dC289B09C33333'],
         //    usdc: [
         //       '0x07865c6E87B9F70255377e024ace6630C1Eaa37F', // USDT on Goerli Testnet
         //    ],
         // },
         slippagePercent: {
            instantTrades: 2,
            crossChain: 5,
         },
         chainId: 137, // Goerli Testnet chainJID
      };

      // console.log(configuration);

      window.rubicWidget.init(configuration);
      console.clear();
   }, []); // empty dependency array ensures the effect runs only once on mount
};

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

   return (
      <div className="">
         <div id="rubic-widget-root"></div>
         <h1 className="text-white">Rubic SDK Integration Ui</h1>
         {/* Include Rubic SDK script outside of the Head component */}
         <Script
            src="https://widgets.rubic.exchange/iframe/bundle.new-app.min.js"
            strategy="beforeInteractive"
         />

         {/* Other page content */}
         <RubicWidget />
      </div>
   );
};

export default SDK;
