// // // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import axios from 'axios';

// export default async function handler(req, res) {
//    try {
//       // Fetch latest cryptocurrency listings

//       const response = await axios.get(
//          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
//          {
//             headers: {
//                'X-CMC_PRO_API_KEY': 'a1895011-2217-4ef3-84c4-9d69ed0f2e7b',
//             },
//          }
//       );a

//       // Extract token IDs
//       const tokenIds = response.data.data.map((token) => token.id);
//       // console.log(tokenIds);

//       // Fetch metadata for each token
//       const metadataResponse = await axios.get(
//          'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
//          {
//             headers: {
//                'X-CMC_PRO_API_KEY': 'a1895011-2217-4ef3-84c4-9d69ed0f2e7b',
//             },
//             params: {
//                id: tokenIds.join(','),
//             },
//          }
//       );

//       const metadataData = metadataResponse.data.data;
//       // console.log(metadataData);

//       // Fetch historical market data for each token
//       // const historicalDataPromises = tokenIds.map(async (tokenId) => {
//       //    const historicalResponse = await axios.get(
//       //       // `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical?id=${tokenId}&interval=1d&count=30`,
//       //       `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/historical`,
//       //       {
//       //          headers: {
//       //             'X-CMC_PRO_API_KEY': 'a1895011-2217-4ef3-84c4-9d69ed0f2e7b',
//       //          },
//       //       }
//       //    );
//       //    console.log(historicalResponse);
//       //    return historicalResponse.data.data[tokenId];
//       // });

//       // console.log(historicalDataPromises);

//       // Wait for all historical data promises to resolve///
//       // const historicalDataResults = await Promise.all(historicalDataPromises);

//       // console.log(historicalDataResults);

//       // Combine token listings with metadata
//       const tokens = response.data.data.map((token) => ({
//          ...token,
//          logo: metadataData[token.id]?.logo,
//          tvl: token.tvl !== null ? token.tvl : 'N/A',
//          volume_24h: token.volume_24h,
//          // historicalData: historicalDataResults[index],
//       }));

//       // console.log(tokens);

//       res.status(200).json(tokens);
//    } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ error: 'Internal server error' });
//    }
// }

import Link from 'next/link';
import React from 'react';

import ConnectButton from './connectButton';
// import { MinningContext } from '@/Context/MinnigContext';
// import logo from '../../yolva.png';

const Header = () => {
   // const { connectWallet, connect } = useContext(MinningContext);

   const navMenu = [
      { id: 1, name: 'Swap', url: '/' },
      { id: 2, name: 'Token', url: '/token' },
      { id: 3, name: 'NFTs', url: '/nfts' },
      { id: 4, name: 'Pools', url: '/pools' },
   ];

   return (
      <main className="w-full flex justify-between  items-center fixed top-0  bg-opacity-10 backdrop-blur-md shadow-lg h-16 z-20">
         <div className="flex w-full p-4 justify-between items-center  shadow-custom">
            <div className=" flex gap-9 pr-2">
               <div>LOGO</div>
               {/* <img src="" alt="logo-image" className="h-12 w-10" /> */}
               <div className="flex gap-3">
                  {navMenu.map((menu) => (
                     <div key={menu.id} className="flex">
                        <Link href={menu.url}>{menu.name}</Link>
                     </div>
                  ))}
               </div>
            </div>
            <div className="flex space-x-5 justify-center items-center">
               <div className="">
                  <w3m-button />
               </div>
            </div>
            <style jsx>{`
               .active-link {
                  color: #bf9221;
               }
            `}</style>
         </div>
      </main>
   );
};

export default Header;
