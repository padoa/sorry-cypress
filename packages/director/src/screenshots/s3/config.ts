export const S3_BUCKET = process.env.S3_BUCKET || 'sorry-cypress';
export const S3_REGION = process.env.S3_REGION || 'us-east-1';
export const S3_READ_URL_PREFIX = process.env.S3_READ_URL_PREFIX || null;
export const S3_IMAGE_KEY_PREFIX = process.env.S3_IMAGE_KEY_PREFIX || null;
export const S3_VIDEO_KEY_PREFIX = process.env.S3_VIDEO_KEY_PREFIX || null;
export const S3_FORCE_PATH_STYLE =  process.env.S3_FORCE_PATH_STYLE !== undefined && process.env.S3_FORCE_PATH_STYLE !== null ? process.env.S3_FORCE_PATH_STYLE === 'true' : true;
export const FILES_EXPIRATION = parseInt(process.env.FILES_EXPIRATION) || 604800;
export const S3_ENDPOINT = process.env.S3_ENDPOINT || 'storage-eb4.cegedim.cloud';