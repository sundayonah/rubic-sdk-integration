import { useEffect } from 'react';
// import RubicInt from '@/RubicInt';
import RubicIntJs from '@/pages/Rubic';

export default function Home() {
   useEffect(() => {
      if (typeof window) {
         // Describe widget configuration and saving to a global variable for future use
         const configuration = {
            from: 'ETH',
            to: 'RBC',
            fromChain: 'ETH',
            toChain: 'ETH',
            amount: 1,
            iframe: 'flex',
            hideSelectionFrom: false,
            hideSelectionTo: true,
            theme: 'dark',
            background: '#28372e',
            injectTokens: {
               eth: ['0xd123575d94a7ad9bff3ad037ae9d4d52f41a7518'],
               bsc: ['0x8aed24bf6e0247be51c57d68ad32a176bf86f4d9'],
            },
            slippagePercent: {
               instantTrades: 2,
               crossChain: 5,
            },
         };

         //  console.log(configuration);

         // Prevent accidental changes to the object, for example, when re-creating a widget for another theme
         Object.freeze(configuration);

         // Create widget after the DOM is fully loaded
         document.addEventListener('DOMContentLoaded', function () {
            (window as any).rubicWidget.init(configuration);
         });
      }
   }, []);

   return (
      <main>
         <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
            <p>Hello</p>
            <div className="">
               <w3m-button />
            </div>
         </div>
         <div>
            {/* <RubicInt /> */}
            <RubicIntJs />
         </div>
         <div id="rubic-widget-root"></div>
      </main>
   );
}
