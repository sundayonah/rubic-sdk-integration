import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
   return (
      <Html lang="en">
         <Head />
         <Script
            type="text/javascript"
            src="https://widgets.rubic.exchange/iframe/bundle.new-app.min.js"
         ></Script>
         <body>
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}
