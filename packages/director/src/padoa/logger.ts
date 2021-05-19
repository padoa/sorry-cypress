import { LoggerFactory } from '@padoa/logger';
import asyncLocalStorage from '@src/padoa/async-local-storage';
import { LOG_LEVEL } from '@src/config';

export const baseLogger = new LoggerFactory({ level: LOG_LEVEL }).logger;

export default asyncLocalStorage.proxify('logger', baseLogger);
