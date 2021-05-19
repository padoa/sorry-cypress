import 'dotenv/config';

export const PORT = process.env.PORT || 1234;

export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

export const LOG_INCOMING = process.env.LOG_INCOMING === 'true';

export const DASHBOARD_URL =
  process.env.DASHBOARD_URL || `http://localhost:8080`;

export const EXECUTION_DRIVER =
  process.env.EXECUTION_DRIVER || '../execution/in-memory';

export const SCREENSHOTS_DRIVER =
  process.env.SCREENSHOTS_DRIVER || '../screenshots/dummy.driver';

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017';
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'sorry-cypress';

export const ALLOWED_KEYS: string[] = process.env.ALLOWED_KEYS ? process.env.ALLOWED_KEYS.split(',') : null;
