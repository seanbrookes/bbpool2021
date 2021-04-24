import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {


  render() { 
    return (
      <Html>
        <title>BB Pool 2021 ::</title>
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