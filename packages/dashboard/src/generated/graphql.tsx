import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Commit = {
  __typename?: 'Commit';
  sha?: Maybe<Scalars['String']>;
  branch?: Maybe<Scalars['String']>;
  authorName?: Maybe<Scalars['String']>;
  authorEmail?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  remoteOrigin?: Maybe<Scalars['String']>;
};

export type CypressConfig = {
  __typename?: 'CypressConfig';
  video: Scalars['Boolean'];
  videoUploadOnPasses: Scalars['Boolean'];
};

export type DeleteRunResponse = {
  __typename?: 'DeleteRunResponse';
  success: Scalars['Boolean'];
  message: Scalars['String'];
  runIds: Array<Maybe<Scalars['ID']>>;
};

export type FullRunSpec = {
  __typename?: 'FullRunSpec';
  spec: Scalars['String'];
  instanceId: Scalars['String'];
  claimed: Scalars['Boolean'];
  results?: Maybe<InstanceResults>;
};

export type Instance = {
  __typename?: 'Instance';
  runId: Scalars['ID'];
  run: PartialRun;
  spec: Scalars['String'];
  instanceId: Scalars['ID'];
  results?: Maybe<InstanceResults>;
};

export type InstanceResults = {
  __typename?: 'InstanceResults';
  stats: InstanceStats;
  tests: Array<Maybe<InstanceTest>>;
  error?: Maybe<Scalars['String']>;
  stdout?: Maybe<Scalars['String']>;
  screenshots: Array<InstanceScreeshot>;
  cypressConfig?: Maybe<CypressConfig>;
  reporterStats?: Maybe<ReporterStats>;
  videoUrl?: Maybe<Scalars['String']>;
};

export type InstanceScreeshot = {
  __typename?: 'InstanceScreeshot';
  screenshotId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  testId: Scalars['String'];
  takenAt: Scalars['String'];
  height: Scalars['Int'];
  width: Scalars['Int'];
  screenshotURL?: Maybe<Scalars['String']>;
};

export type InstanceStats = {
  __typename?: 'InstanceStats';
  suites?: Maybe<Scalars['Int']>;
  tests?: Maybe<Scalars['Int']>;
  passes?: Maybe<Scalars['Int']>;
  pending?: Maybe<Scalars['Int']>;
  skipped?: Maybe<Scalars['Int']>;
  failures?: Maybe<Scalars['Int']>;
  wallClockStartedAt?: Maybe<Scalars['String']>;
  wallClockEndedAt?: Maybe<Scalars['String']>;
  wallClockDuration?: Maybe<Scalars['Int']>;
};

export type InstanceTest = {
  __typename?: 'InstanceTest';
  testId: Scalars['String'];
  title?: Maybe<Array<Maybe<Scalars['String']>>>;
  state?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  stack?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  wallClockStartedAt?: Maybe<Scalars['String']>;
  wallClockDuration?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteRun: DeleteRunResponse;
  deleteRuns: DeleteRunResponse;
  deleteRunsInDateRange: DeleteRunResponse;
};

export type MutationDeleteRunArgs = {
  runId: Scalars['ID'];
};

export type MutationDeleteRunsArgs = {
  runIds: Array<Maybe<Scalars['ID']>>;
};

export type MutationDeleteRunsInDateRangeArgs = {
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
};

export enum OrderingOptions {
  Desc = 'DESC',
  Asc = 'ASC',
}

export type PartialRun = {
  __typename?: 'PartialRun';
  runId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  meta?: Maybe<RunMeta>;
  specs: Array<Maybe<RunSpec>>;
};

export type Query = {
  __typename?: 'Query';
  runs: Array<Maybe<Run>>;
  runFeed: RunFeed;
  run?: Maybe<Run>;
  instance?: Maybe<Instance>;
  branches: Array<Maybe<Scalars['String']>>;
};

export type QueryRunsArgs = {
  orderDirection?: Maybe<OrderingOptions>;
  cursor?: Maybe<Scalars['String']>;
};

export type QueryRunFeedArgs = {
  cursor?: Maybe<Scalars['String']>;
  branch?: Maybe<Scalars['String']>;
};

export type QueryRunArgs = {
  id: Scalars['ID'];
};

export type QueryInstanceArgs = {
  id: Scalars['ID'];
};

export type ReporterStats = {
  __typename?: 'ReporterStats';
  suites?: Maybe<Scalars['Int']>;
  tests?: Maybe<Scalars['Int']>;
  passes?: Maybe<Scalars['Int']>;
  pending?: Maybe<Scalars['Int']>;
  failures?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
};

export type Run = {
  __typename?: 'Run';
  runId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  meta?: Maybe<RunMeta>;
  specs?: Maybe<Array<Maybe<FullRunSpec>>>;
  tests: Scalars['Int'];
  failures: Scalars['Int'];
  passes: Scalars['Int'];
  pending: Scalars['Int'];
  skipped: Scalars['Int'];
};

export type RunFeed = {
  __typename?: 'RunFeed';
  cursor: Scalars['String'];
  hasMore: Scalars['Boolean'];
  runs: Array<Run>;
};

export type RunMeta = {
  __typename?: 'RunMeta';
  groupId?: Maybe<Scalars['String']>;
  ciBuildId?: Maybe<Scalars['String']>;
  projectId?: Maybe<Scalars['String']>;
  commit?: Maybe<Commit>;
};

export type RunSpec = {
  __typename?: 'RunSpec';
  spec: Scalars['String'];
  instanceId: Scalars['String'];
  claimed: Scalars['Boolean'];
};

export type DeleteRunMutationVariables = {
  runId: Scalars['ID'];
};

export type DeleteRunMutation = { __typename?: 'Mutation' } & {
  deleteRun: { __typename?: 'DeleteRunResponse' } & Pick<
    DeleteRunResponse,
    'success' | 'message' | 'runIds'
  >;
};

export type GetBranchesQueryVariables = {};

export type GetBranchesQuery = { __typename?: 'Query' } & Pick<
  Query,
  'branches'
>;

export type GetInstanceQueryVariables = {
  instanceId: Scalars['ID'];
};

export type GetInstanceQuery = { __typename?: 'Query' } & {
  instance?: Maybe<
    { __typename?: 'Instance' } & Pick<
      Instance,
      'instanceId' | 'runId' | 'spec'
    > & {
        run: { __typename?: 'PartialRun' } & {
          meta?: Maybe<
            { __typename?: 'RunMeta' } & Pick<RunMeta, 'ciBuildId'> & {
                commit?: Maybe<
                  { __typename?: 'Commit' } & Pick<
                    Commit,
                    | 'sha'
                    | 'branch'
                    | 'authorName'
                    | 'authorEmail'
                    | 'remoteOrigin'
                    | 'message'
                  >
                >;
              }
          >;
        };
        results?: Maybe<
          { __typename?: 'InstanceResults' } & Pick<
            InstanceResults,
            'videoUrl'
          > & {
              stats: { __typename?: 'InstanceStats' } & Pick<
                InstanceStats,
                | 'suites'
                | 'tests'
                | 'passes'
                | 'pending'
                | 'skipped'
                | 'failures'
                | 'wallClockDuration'
              >;
              tests: Array<
                Maybe<
                  { __typename?: 'InstanceTest' } & Pick<
                    InstanceTest,
                    | 'testId'
                    | 'wallClockDuration'
                    | 'state'
                    | 'error'
                    | 'stack'
                    | 'title'
                  >
                >
              >;
              screenshots: Array<
                { __typename?: 'InstanceScreeshot' } & Pick<
                  InstanceScreeshot,
                  | 'testId'
                  | 'screenshotId'
                  | 'height'
                  | 'width'
                  | 'screenshotURL'
                >
              >;
              cypressConfig?: Maybe<
                { __typename?: 'CypressConfig' } & Pick<
                  CypressConfig,
                  'video' | 'videoUploadOnPasses'
                >
              >;
            }
        >;
      }
  >;
};

export type GetRunQueryVariables = {
  runId: Scalars['ID'];
};

export type GetRunQuery = { __typename?: 'Query' } & {
  run?: Maybe<
    { __typename?: 'Run' } & Pick<Run, 'runId'> & {
        meta?: Maybe<
          { __typename?: 'RunMeta' } & Pick<
            RunMeta,
            'ciBuildId' | 'projectId'
          > & {
              commit?: Maybe<
                { __typename?: 'Commit' } & Pick<
                  Commit,
                  | 'sha'
                  | 'branch'
                  | 'remoteOrigin'
                  | 'message'
                  | 'authorEmail'
                  | 'authorName'
                >
              >;
            }
        >;
        specs?: Maybe<
          Array<
            Maybe<
              { __typename?: 'FullRunSpec' } & Pick<
                FullRunSpec,
                'spec' | 'instanceId' | 'claimed'
              > & {
                  results?: Maybe<
                    { __typename?: 'InstanceResults' } & Pick<
                      InstanceResults,
                      'videoUrl'
                    > & {
                        cypressConfig?: Maybe<
                          { __typename?: 'CypressConfig' } & Pick<
                            CypressConfig,
                            'video' | 'videoUploadOnPasses'
                          >
                        >;
                        tests: Array<
                          Maybe<
                            { __typename?: 'InstanceTest' } & Pick<
                              InstanceTest,
                              'title' | 'state'
                            >
                          >
                        >;
                        stats: { __typename?: 'InstanceStats' } & Pick<
                          InstanceStats,
                          | 'tests'
                          | 'pending'
                          | 'passes'
                          | 'failures'
                          | 'skipped'
                          | 'suites'
                        >;
                      }
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type GetRunsFeedQueryVariables = {
  cursor?: Maybe<Scalars['String']>;
  branch?: Maybe<Scalars['String']>;
};

export type GetRunsFeedQuery = { __typename?: 'Query' } & {
  runFeed: { __typename?: 'RunFeed' } & Pick<RunFeed, 'cursor' | 'hasMore'> & {
      runs: Array<
        { __typename?: 'Run' } & Pick<
          Run,
          | 'tests'
          | 'failures'
          | 'passes'
          | 'pending'
          | 'skipped'
          | 'runId'
          | 'createdAt'
        > & {
            meta?: Maybe<
              { __typename?: 'RunMeta' } & Pick<
                RunMeta,
                'ciBuildId' | 'projectId'
              > & {
                  commit?: Maybe<
                    { __typename?: 'Commit' } & Pick<
                      Commit,
                      | 'sha'
                      | 'branch'
                      | 'remoteOrigin'
                      | 'message'
                      | 'authorEmail'
                      | 'authorName'
                    >
                  >;
                }
            >;
            specs?: Maybe<
              Array<
                Maybe<
                  { __typename?: 'FullRunSpec' } & Pick<
                    FullRunSpec,
                    'spec' | 'instanceId' | 'claimed'
                  >
                >
              >
            >;
          }
      >;
    };
};

export const DeleteRunDocument = gql`
  mutation deleteRun($runId: ID!) {
    deleteRun(runId: $runId) {
      success
      message
      runIds
    }
  }
`;
export type DeleteRunMutationFn = ApolloReactCommon.MutationFunction<
  DeleteRunMutation,
  DeleteRunMutationVariables
>;
export type DeleteRunComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    DeleteRunMutation,
    DeleteRunMutationVariables
  >,
  'mutation'
>;

export const DeleteRunComponent = (props: DeleteRunComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteRunMutation, DeleteRunMutationVariables>
    mutation={DeleteRunDocument}
    {...props}
  />
);

/**
 * __useDeleteRunMutation__
 *
 * To run a mutation, you first call `useDeleteRunMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRunMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRunMutation, { data, loading, error }] = useDeleteRunMutation({
 *   variables: {
 *      runId: // value for 'runId'
 *   },
 * });
 */
export function useDeleteRunMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteRunMutation,
    DeleteRunMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DeleteRunMutation,
    DeleteRunMutationVariables
  >(DeleteRunDocument, baseOptions);
}
export type DeleteRunMutationHookResult = ReturnType<
  typeof useDeleteRunMutation
>;
export type DeleteRunMutationResult = ApolloReactCommon.MutationResult<
  DeleteRunMutation
>;
export type DeleteRunMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteRunMutation,
  DeleteRunMutationVariables
>;
export const GetBranchesDocument = gql`
  query getBranches {
    branches
  }
`;
export type GetBranchesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetBranchesQuery,
    GetBranchesQueryVariables
  >,
  'query'
>;

export const GetBranchesComponent = (props: GetBranchesComponentProps) => (
  <ApolloReactComponents.Query<GetBranchesQuery, GetBranchesQueryVariables>
    query={GetBranchesDocument}
    {...props}
  />
);

/**
 * __useGetBranchesQuery__
 *
 * To run a query within a React component, call `useGetBranchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBranchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBranchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBranchesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetBranchesQuery,
    GetBranchesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetBranchesQuery, GetBranchesQueryVariables>(
    GetBranchesDocument,
    baseOptions
  );
}
export function useGetBranchesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetBranchesQuery,
    GetBranchesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetBranchesQuery,
    GetBranchesQueryVariables
  >(GetBranchesDocument, baseOptions);
}
export type GetBranchesQueryHookResult = ReturnType<typeof useGetBranchesQuery>;
export type GetBranchesLazyQueryHookResult = ReturnType<
  typeof useGetBranchesLazyQuery
>;
export type GetBranchesQueryResult = ApolloReactCommon.QueryResult<
  GetBranchesQuery,
  GetBranchesQueryVariables
>;
export const GetInstanceDocument = gql`
  query getInstance($instanceId: ID!) {
    instance(id: $instanceId) {
      instanceId
      runId
      spec
      run {
        meta {
          ciBuildId
          commit {
            sha
            branch
            authorName
            authorEmail
            remoteOrigin
            message
          }
        }
      }
      results {
        stats {
          suites
          tests
          passes
          pending
          skipped
          failures
          wallClockDuration
        }
        tests {
          testId
          wallClockDuration
          state
          error
          stack
          title
        }
        screenshots {
          testId
          screenshotId
          height
          width
          screenshotURL
        }
        cypressConfig {
          video
          videoUploadOnPasses
        }
        videoUrl
      }
    }
  }
`;
export type GetInstanceComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetInstanceQuery,
    GetInstanceQueryVariables
  >,
  'query'
> &
  (
    | { variables: GetInstanceQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetInstanceComponent = (props: GetInstanceComponentProps) => (
  <ApolloReactComponents.Query<GetInstanceQuery, GetInstanceQueryVariables>
    query={GetInstanceDocument}
    {...props}
  />
);

/**
 * __useGetInstanceQuery__
 *
 * To run a query within a React component, call `useGetInstanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInstanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInstanceQuery({
 *   variables: {
 *      instanceId: // value for 'instanceId'
 *   },
 * });
 */
export function useGetInstanceQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetInstanceQuery,
    GetInstanceQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetInstanceQuery, GetInstanceQueryVariables>(
    GetInstanceDocument,
    baseOptions
  );
}
export function useGetInstanceLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInstanceQuery,
    GetInstanceQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetInstanceQuery,
    GetInstanceQueryVariables
  >(GetInstanceDocument, baseOptions);
}
export type GetInstanceQueryHookResult = ReturnType<typeof useGetInstanceQuery>;
export type GetInstanceLazyQueryHookResult = ReturnType<
  typeof useGetInstanceLazyQuery
>;
export type GetInstanceQueryResult = ApolloReactCommon.QueryResult<
  GetInstanceQuery,
  GetInstanceQueryVariables
>;
export const GetRunDocument = gql`
  query getRun($runId: ID!) {
    run(id: $runId) {
      runId
      meta {
        ciBuildId
        projectId
        commit {
          sha
          branch
          remoteOrigin
          message
          authorEmail
          authorName
        }
      }
      specs {
        spec
        instanceId
        claimed
        results {
          cypressConfig {
            video
            videoUploadOnPasses
          }
          videoUrl
          tests {
            title
            state
          }
          stats {
            tests
            pending
            passes
            failures
            skipped
            suites
          }
        }
      }
    }
  }
`;
export type GetRunComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetRunQuery,
    GetRunQueryVariables
  >,
  'query'
> &
  ({ variables: GetRunQueryVariables; skip?: boolean } | { skip: boolean });

export const GetRunComponent = (props: GetRunComponentProps) => (
  <ApolloReactComponents.Query<GetRunQuery, GetRunQueryVariables>
    query={GetRunDocument}
    {...props}
  />
);

/**
 * __useGetRunQuery__
 *
 * To run a query within a React component, call `useGetRunQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRunQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRunQuery({
 *   variables: {
 *      runId: // value for 'runId'
 *   },
 * });
 */
export function useGetRunQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetRunQuery,
    GetRunQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetRunQuery, GetRunQueryVariables>(
    GetRunDocument,
    baseOptions
  );
}
export function useGetRunLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetRunQuery,
    GetRunQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetRunQuery, GetRunQueryVariables>(
    GetRunDocument,
    baseOptions
  );
}
export type GetRunQueryHookResult = ReturnType<typeof useGetRunQuery>;
export type GetRunLazyQueryHookResult = ReturnType<typeof useGetRunLazyQuery>;
export type GetRunQueryResult = ApolloReactCommon.QueryResult<
  GetRunQuery,
  GetRunQueryVariables
>;
export const GetRunsFeedDocument = gql`
  query getRunsFeed($cursor: String, $branch: String) {
    runFeed(cursor: $cursor, branch: $branch) {
      cursor
      hasMore
      runs {
        tests
        failures
        passes
        pending
        skipped
        runId
        createdAt
        meta {
          ciBuildId
          projectId
          commit {
            sha
            branch
            remoteOrigin
            message
            authorEmail
            authorName
          }
        }
        specs {
          spec
          instanceId
          claimed
        }
      }
    }
  }
`;
export type GetRunsFeedComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetRunsFeedQuery,
    GetRunsFeedQueryVariables
  >,
  'query'
>;

export const GetRunsFeedComponent = (props: GetRunsFeedComponentProps) => (
  <ApolloReactComponents.Query<GetRunsFeedQuery, GetRunsFeedQueryVariables>
    query={GetRunsFeedDocument}
    {...props}
  />
);

/**
 * __useGetRunsFeedQuery__
 *
 * To run a query within a React component, call `useGetRunsFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRunsFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRunsFeedQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      branch: // value for 'branch'
 *   },
 * });
 */
export function useGetRunsFeedQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetRunsFeedQuery,
    GetRunsFeedQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetRunsFeedQuery, GetRunsFeedQueryVariables>(
    GetRunsFeedDocument,
    baseOptions
  );
}
export function useGetRunsFeedLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetRunsFeedQuery,
    GetRunsFeedQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetRunsFeedQuery,
    GetRunsFeedQueryVariables
  >(GetRunsFeedDocument, baseOptions);
}
export type GetRunsFeedQueryHookResult = ReturnType<typeof useGetRunsFeedQuery>;
export type GetRunsFeedLazyQueryHookResult = ReturnType<
  typeof useGetRunsFeedLazyQuery
>;
export type GetRunsFeedQueryResult = ApolloReactCommon.QueryResult<
  GetRunsFeedQuery,
  GetRunsFeedQueryVariables
>;