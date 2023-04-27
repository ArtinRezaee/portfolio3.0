import { useEffect, useState } from 'react';
import { CacheProvider, EmotionCache, ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { createEmotionSsrAdvancedApproach } from 'tss-react/next/pagesDir';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { usePathname } from 'next/navigation';
import { CssBaseline } from '@mui/material';
import createEmotionCache from '@/config/createEmotionCache';
import customTheme from '@/config/theme';
import '@/styles/globals.css';
import { GA_TRACKING_ID, useGtag } from '@/hooks';
import { useApollo } from '@/client';
import { SplashScreen } from '@/components/splash';

const clientSideEmotionCache = createEmotionCache();
const isProduction = process.env.NODE_ENV === 'production';

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const { augmentDocumentWithEmotionCache, withAppEmotionCache } =
  createEmotionSsrAdvancedApproach({ key: 'css' });

export { augmentDocumentWithEmotionCache };

function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: CustomAppProps) {
  const { gtagPageView } = useGtag();
  const router = useRouter();
  const apolloClient = useApollo(pageProps);
  const pathName = usePathname();

  const isHome = pathName === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  useEffect(() => {
    if (isLoading) {
      return;
    }
  }, [isLoading]);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) {
        gtagPageView(url);
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [gtagPageView, router.events]);

  const showLoader = isLoading && isHome;

  return (
    <>
      <Head>
        <title>
          {`From Ideas to Reality: Artin Rezaee's Portfolio for Software
          Development, Web Development and Mobile Applications`}
        </title>
        <meta
          name="description"
          content="Artin Rezaee is a skilled Software Engineer from Calgary, Alberta, Canada with expertise in React, Angular, and NodeJS. He excels in building distributed systems with AWS and GCP, and leading successful development teams. With a passion for problem-solving, Artin delivers innovative solutions that meet business requirements and provide exceptional user experiences."
        />
        <meta property="og:url" content="https://www.artinrez.com/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Artin Rezaee - Software Engineer Portfolio"
        />
        <meta
          property="og:description"
          content="Artin Rezaee is a skilled Software Engineer from Calgary, Alberta with expertise in React, Angular, and NodeJS. He excels in building distributed systems with AWS and GCP, and leading successful development teams. With a passion for problem-solving, Artin delivers innovative solutions that meet business requirements and provide exceptional user experiences."
        />
        <meta
          property="og:image"
          content="https://images.ctfassets.net/1n0e5yr6u20a/4HPIwOgeRQqVTmfJiID0V6/3988b9dbb7fc1f87752e3231828074bc/ogImage.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_TRACKING_ID}');
        `}
      </Script>
      {showLoader && <SplashScreen finishLoading={() => setIsLoading(false)} />}
      {!showLoader && (
        <ApolloProvider client={apolloClient}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={customTheme}>
              <CssBaseline />
              <Component {...pageProps} />
              <Analytics />
            </ThemeProvider>
          </CacheProvider>
        </ApolloProvider>
      )}
    </>
  );
}

export default withAppEmotionCache(App);
