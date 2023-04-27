import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as Types from './operations';
const defaultOptions = {} as const;

export const GetWebsiteDataDocument = gql`
  query GetWebsiteData {
    navbarCollection(limit: 10, order: order_ASC) {
      items {
        titlle
        linkToExternal
        order
        link
      }
    }
    about(id: "1Qac60YjPkBCePrWEMXn2O") {
      sectionName
      description {
        json
      }
      image {
        url
      }
    }
    experienceEntryCollection(limit: 10, order: startDate_DESC) {
      items {
        dateRange
        role
        roleHeader
        roleDescription
        company
        isPresent
        startDate
        endDate
        logo {
          url
        }
      }
    }
    contactLinksCollection(order: sys_firstPublishedAt_ASC) {
      items {
        title
        description
        buttonText
        link
        type
      }
    }
    projectsCollection(limit: 10, order: sys_firstPublishedAt_ASC) {
      items {
        name
        image {
          url
        }
        description
        link
      }
    }
  }
`;

/**
 * __useGetWebsiteDataQuery__
 *
 * To run a query within a React component, call `useGetWebsiteDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWebsiteDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWebsiteDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWebsiteDataQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetWebsiteDataQuery,
    Types.GetWebsiteDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    Types.GetWebsiteDataQuery,
    Types.GetWebsiteDataQueryVariables
  >(GetWebsiteDataDocument, options);
}
export function useGetWebsiteDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetWebsiteDataQuery,
    Types.GetWebsiteDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    Types.GetWebsiteDataQuery,
    Types.GetWebsiteDataQueryVariables
  >(GetWebsiteDataDocument, options);
}
export type GetWebsiteDataQueryHookResult = ReturnType<
  typeof useGetWebsiteDataQuery
>;
export type GetWebsiteDataLazyQueryHookResult = ReturnType<
  typeof useGetWebsiteDataLazyQuery
>;
export type GetWebsiteDataQueryResult = Apollo.QueryResult<
  Types.GetWebsiteDataQuery,
  Types.GetWebsiteDataQueryVariables
>;
