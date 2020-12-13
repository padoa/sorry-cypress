import RunList from '@src/components/run/RunList';
import PageControls from '@src/components/ui/PageControls';
import SearchField from '@src/components/ui/SearchField';
import { getProjectPath, navStructure } from '@src/lib/navigation';
import React, { useLayoutEffect, useState } from 'react';

type RunsViewProps = {
  match: {
    params: {
      projectId: string;
    };
  };
};

export function RunsView({
  match: {
    params: { projectId },
  },
}: RunsViewProps) {
  const [search, setSearch] = useState('');

  useLayoutEffect(() => {
    navStructure([
      {
        label: projectId,
        link: getProjectPath(projectId),
      },
    ]);
  }, []);

  return (
    <>
      <PageControls>
        <SearchField
          placeholder="Enter branch name"
          onSearch={(value) => setSearch(value)}
        />
      </PageControls>
      <RunList projectId={projectId} search={search} />
    </>
  );
}
