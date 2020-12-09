import { Alert, useCss } from 'bold-ui';
import React from 'react';
import { InstanceScreeshot } from '../../../generated/graphql';
import { Paper } from '../../common';

export const TestError = ({
  error,
  stack,
}: {
  error: string;
  stack?: string | null;
}) => {
  return (
    <Alert
      type="danger"
      style={{
        padding: 12,
      }}
    >
      <strong>{error}</strong>
      {stack && <div>{stack}</div>}
    </Alert>
  );
};

export const Screenshot = ({
  screenshot,
}: {
  screenshot: Partial<InstanceScreeshot>;
}) => {
  const { css } = useCss();

  if (!screenshot?.screenshotURL) {
    return null;
  }
  return (
    <Paper>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={screenshot.screenshotURL}
      >
        <img
          className={css`
             {
              max-width: 100%;
            }
          `}
          src={screenshot.screenshotURL}
        />
      </a>
    </Paper>
  );
};
