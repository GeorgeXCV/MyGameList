import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import theme from "./theme"

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>MyGameList</title>
          <meta name="description" content="Track games you are currently playing" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
        <footer>
          <p>Placeholder footer</p>
        </footer>
      </Html>
    )
  }
}