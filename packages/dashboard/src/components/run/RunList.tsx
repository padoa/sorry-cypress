import { CenteredContent } from '@src/components/common';
import { RunSummary } from '@src/components/run/summary';
import { useGetLightRunsFeedQuery } from '@src/generated/graphql';
import { Button } from 'bold-ui';
import React, { FC } from 'react';

type RunListProps = {
  projectId: string;
  search?: string;
};

const RunList: FC<RunListProps> = ({
  projectId,
  search = '',
}: RunListProps) => {
  const searchFilters = search
    ? [
        {
          key: 'meta.commit.branch',
          like: search,
        },
      ]
    : [];
  const filters = [
    {
      key: 'meta.projectId',
      value: projectId,
    },
    ...searchFilters,
  ];
  const { fetchMore, loading, error, data } = useGetLightRunsFeedQuery({
    variables: {
      filters,
      cursor: '',
    },
  });

  if (loading) {
    return <CenteredContent>Loading ...</CenteredContent>;
  }
  if (!data || error) {
    return (
      <CenteredContent>
        {(error && error.toString()) || 'Oups an error occured'}
      </CenteredContent>
    );
  }

  const { lightRunFeed } = data;
  const { runs, cursor } = lightRunFeed;
  const loadMore = () => {
    return fetchMore({
      variables: {
        filters,
        cursor: cursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return {
          lightRunFeed: {
            __typename: prev.lightRunFeed.__typename,
            hasMore: fetchMoreResult?.lightRunFeed.hasMore,
            cursor: fetchMoreResult?.lightRunFeed.cursor,
            runs: [...prev.lightRunFeed.runs, ...fetchMoreResult?.lightRunFeed.runs],
          },
        };
      },
    });
  };

  if (runs.length === 0) {
    if (search) {
      return (
        <CenteredContent>
          <p>No runs found </p>
        </CenteredContent>
      );
    }

    return (
      <CenteredContent>
        <p>No runs have started on this project.</p>
      </CenteredContent>
    );
  }

  return (
    <>
      {runs.map((run) => (
        <RunSummary run={run} key={run.runId} />
      ))}
      {lightRunFeed.hasMore && <Button onClick={loadMore}>Load More</Button>}
    </>
  );
};

export default RunList;
