import assert from 'assert';
import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash-es/isEqual';

assert(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
assert(process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN);
assert(process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT);

const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`;

let apolloClient: ApolloClient<NormalizedCacheObject> | null;
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const createApolloClient = () => {
  return new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    ssrMode: typeof window === 'undefined',
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
    },
    cache: new InMemoryCache(),
  });
};

export const initializeApolloClient = (initialState?: any) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.cache.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const client = useMemo(() => initializeApolloClient(state), [state]);

  return client;
};
