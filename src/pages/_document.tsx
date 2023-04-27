import { Html, Head, Main, NextScript } from 'next/document';
import { augmentDocumentWithEmotionCache } from './_app';

function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

augmentDocumentWithEmotionCache(Document);

export default Document;
