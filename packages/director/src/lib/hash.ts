import md5 from 'md5';
import uuid from 'uuid/v4';
import { CreateRunParameters, PlatformData } from '@src/types';

export const generateRunIdHash = ({
  ciBuildId,
  commit,
  projectId,
}: CreateRunParameters) => md5(ciBuildId + commit.sha + projectId);

// not sure how specific that should be
export const generateGroupId = (
  platform: PlatformData,
  ciBuildId: string
): string => `${ciBuildId}`;

export const generateUUID = () => uuid();
