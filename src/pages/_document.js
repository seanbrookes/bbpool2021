import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() { 
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* <!-- The core Firebase JS SDK is always required and must be listed first --> */}
          <script src="/__/firebase/8.3.3/firebase-app.js"></script>

          {/* <!-- TODO: Add SDKs for Firebase products that you want to use
              https://firebase.google.com/docs/web/setup#available-libraries --> */}
          <script src="/__/firebase/8.3.3/firebase-analytics.js"></script>

          {/* <!-- Initialize Firebase --> */}
          <script src="/__/firebase/init.js"></script>	
        </body>
      </Html>
    )
  }
}

export default MyDocument;