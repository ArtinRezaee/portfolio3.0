import { Inter } from 'next/font/google';
import { GetStaticProps } from 'next';
import MainComponent from '@/components/MainComponent';
import { addApolloState, initializeApolloClient } from '@/client';
import { GetWebsiteDataDocument } from '@/client/generated/hooks';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return <MainComponent />;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const client = initializeApolloClient();

  await client.query({
    query: GetWebsiteDataDocument,
  });

  return addApolloState(client, {
    props: {},
  });
};
