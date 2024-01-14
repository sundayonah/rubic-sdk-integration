import React, { useEffect } from 'react';

const RubicWidget = () => {
   useEffect(() => {
      const configuration = {
         // Your Rubic Widget configuration here...
         from: 'ETH',
         to: '0x3330BFb7332cA23cd071631837dC289B09C33333',
         fromChain: 'ETH',
         toChain: 'ETH',
         amount: 1,
         iframe: 'flex',
         hideSelectionFrom: false,
         hideSelectionTo: true,
         tokenSearch: true,
         rubicLink: true,
         theme: 'dark',
         background: '#28372e',
         injectTokens: {
            eth: ['0x3330BFb7332cA23cd071631837dC289B09C33333'],
         },
         slippagePercent: {
            instantTrades: 2,
            crossChain: 5,
         },
      };

      // console.log(configuration);

      // prevent accidental changes to the object, for example, when re-creating a widget for another theme
      Object.freeze(configuration);

      // Create widget after the DOM is fully loaded
      document.addEventListener('DOMContentLoaded', function () {
         (window as any).rubicWidget.init(configuration);
      });
   }, []);

   return <div id="rubic-widget-root"></div>;
};

export default RubicWidget;
