import { app } from './app';
import { PORT } from './config';
import logger from "@src/padoa/logger";
export * from './types';

async function main() {
  app.on('error', (error) => {
    throw error;
  });
  app.listen(PORT, () => {
    logger.info(`🚀 Director service is ready at http://0.0.0.0:${PORT}/...`);
  });
}

main().catch((error) => {
  logger.error(error);
  process.exit(1);
});
