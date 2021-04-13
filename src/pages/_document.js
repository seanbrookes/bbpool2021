import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {


  render() { 
    const talkToAmazon = () => {
      console.log('|  do it');
      //arn:aws:s3:us-west-2:011219410918:accesspoint/bbpool2021
    };
    talkToAmazon();
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;