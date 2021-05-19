import { LogRequestsMiddlewaresFactory } from '@padoa/express';
import logger from '@src/padoa/logger';
import { LOG_INCOMING } from '@src/config';

export const logRequestsMiddlewaresFactory = new LogRequestsMiddlewaresFactory(logger, LOG_INCOMING);
