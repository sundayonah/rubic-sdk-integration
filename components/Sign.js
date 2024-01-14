import React, { useState } from 'react';
import { ethers } from 'ethers';

const SignMessage = () => {
   const [account, setAccount] = useState(null);
   const [message, setMessage] = useState('Hello, this is the message to sign');
   const [signature, setSignature] = useState(null);
   const [verified, setVerified] = useState(false);

   // Function to handle the signing of the message
   const signMessage = async () => {
      try {
         if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const currentAccount = (await provider.listAccounts())[0];
            setAccount(currentAccount);

            const signature = await signer.signMessage(message);
            setSignature(signature);
            console.log('Signature:', signature);

            // Verify the signature
            const recoveredAddress = ethers.utils.verifyMessage(
               message,
               signature
            );
            console.log('Recovered Address:', recoveredAddress);

            // Compare the recovered address with the current account
            setVerified(recoveredAddress === currentAccount);
         }
      } catch (error) {
         console.error('Error signing the message:', error);
      }
   };

   return (
      <div className="text-white">
         <p>Wallet Address: {account}</p>
         <button onClick={signMessage}>Sign Message</button>
         <p>Signature: {signature}</p>
         {verified && <p>Signature Verified!</p>}
      </div>
   );
};

export default SignMessage;
