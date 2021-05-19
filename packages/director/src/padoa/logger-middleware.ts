import { Request, RequestHandler } from 'express';
import hyperid from 'hyperid';
import { baseLogger } from '@src/padoa/logger';
import asyncLocalStorage from '@src/padoa/async-local-storage';

export interface LoggableRequest extends Request {
  reqId: string;
}

export interface BaseReqLogData {
  reqId: string;
  method: string;
  path: string;
  referer: string;
}

export const baseReqLog = (req: LoggableRequest): BaseReqLogData => {
  const idGenerator = hyperid();
  const reqId = req.reqId || req.header('x-traefik-reqid') || req.header('x-request-id') || idGenerator();
  req.reqId = reqId;
  return {
    reqId,
    method: req.method,
    path: req.originalUrl,
    referer: req.headers.referer,
  };
};

const reportingMiddleware = (): RequestHandler => (req, res, next): void => {
  asyncLocalStorage.run({ logger: baseLogger.child(baseReqLog(req as LoggableRequest)) }, () => {
    next();
  });
};

export default reportingMiddleware;
