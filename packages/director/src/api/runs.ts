import { getExecutionDriver } from '@src/drivers';
import { isKeyAllowed } from '@src/lib/allowedKeys';
import { hookEvents } from '@src/lib/hooksEnums';
import { reportToHook } from '@src/lib/hooksReporter';
import { CreateRunParameters } from '@src/types';
import { RequestHandler } from 'express';
import logger from "@src/padoa/logger";

export const blockKeys: RequestHandler = (req, res, next) => {
  const { recordKey } = req.body;

  if (!isKeyAllowed(recordKey)) {
    logger.error({ recordKey }, `<< Record key is not allowed`);

    return res
      .status(403)
      .send(`Provided record key '${recordKey}' is not allowed`);
  }
  next();
};

export const handleCreateRun: RequestHandler<
  unknown,
  unknown,
  CreateRunParameters
> = async (req, res) => {
  const { group, ciBuildId } = req.body;
  const executionDriver = await getExecutionDriver();

  logger.info({ ciBuildId, group }, `>> Machine is joining / creating  a run`);

  const response = await executionDriver.createRun(req.body);
  const runWithSpecs = await executionDriver.getRunWithSpecs(response.runId);

  reportToHook({
    hookEvent: hookEvents.RUN_START,
    reportData: { run: runWithSpecs },
    project: await executionDriver.getProjectById(runWithSpecs.meta.projectId),
  });

  logger.info(response, `<< RUN_START hook called`);

  logger.info(response, `<< Responding to machine`);
  return res.json(response);
};
