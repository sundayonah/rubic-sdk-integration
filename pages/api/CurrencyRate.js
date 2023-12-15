// // pages/api/exchangeRates.js

// import axios from 'axios';

// export default async function handler(req, res) {
//    try {
//       const options = {
//          method: 'GET',
//          url: 'https://exchange-rate-api1.p.rapidapi.com/latest',
//          params: { base: 'USD' },
//          headers: {
//             'X-RapidAPI-Key':
//                'e40fb3806bmsh9e964efef9e69a9p1e83c9jsn117b4479703e',
//             'X-RapidAPI-Host': 'exchange-rate-api1.p.rapidapi.com',
//          },
//       };
//       console.log(options, 'options');

//       const response = await axios.request(options);
//       console.log(response, 'response');
//       res.status(200).json(response.data);
//    } catch (error) {
//       res.status(500).json({ error: 'Error fetching exchange rates' });
//    }
// }
