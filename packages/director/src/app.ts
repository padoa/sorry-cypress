import express from 'express';
import bodyParser from 'body-parser';
import { blockKeys, handleCreateRun } from './api/runs';
import { handleCreateInstance, handleUpdateInstance } from './api/instances';
import { getExecutionDriver } from '@src/drivers';
import { logRequestsMiddlewaresFactory } from '@src/padoa/log-request-middleware';
import reportingMiddleware from '@src/padoa/logger-middleware';
import { apiErrorHandler, AsyncRequestHandler, createConverterErrorHandler, notFound, wrapAsync } from "@padoa/express";
import { appErrorConverter } from "@src/padoa/app-error-converter";
import logger from "@src/padoa/logger";

export const app = express();

/* MIDDLEWARES FOR INCOMING REQUESTS */

app.use(logRequestsMiddlewaresFactory.startTimer)
app.use(
  bodyParser.json({
    limit: '50mb',
  })
);
app.use(reportingMiddleware());
app.use(logRequestsMiddlewaresFactory.logRequest);

/* HEALTH CHECKS */

app.get('/', (_, res) =>
  res.redirect('https://github.com/agoldis/sorry-cypress')
);

app.get('/health-check-mongo', wrapAsync(async (_, res) => {
  const executionDriver = await getExecutionDriver();
  (await executionDriver.pingDB()) ?
    res.sendStatus(200) :
    res.sendStatus(503);
}));

app.get('/ping', (_, res) => {
  res.send(`${Date.now()}: sorry-cypress-director is live`);
});

/* ROUTES */

app.post('/runs', blockKeys, wrapAsync(handleCreateRun as AsyncRequestHandler));
app.post('/runs/:runId/instances', wrapAsync(handleCreateInstance as AsyncRequestHandler));
app.put('/instances/:instanceId', wrapAsync(handleUpdateInstance as AsyncRequestHandler));

/*
4. PUT https://api.cypress.io/instances/<instanceId>/stdout
>> response 'OK'
*/
app.put('/instances/:instanceId/stdout', (req, res) => {
  const { instanceId } = req.params;
  logger.info({
    instanceId,
  }, `>> [not implemented] Received stdout for instance`, );
  return res.sendStatus(200);
});

/* HANDLERS */

app.use(notFound);
app.use(createConverterErrorHandler([appErrorConverter]));
app.use(logRequestsMiddlewaresFactory.logErrors);
app.use(apiErrorHandler);
