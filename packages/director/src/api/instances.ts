import { getExecutionDriver, getScreenshotsDriver } from '@src/drivers';
import { RUN_NOT_EXIST } from '@src/lib/errors';
import { RequestHandler } from 'express';
import {
  InstanceResult,
  ScreenshotUploadInstruction,
  AssetUploadInstruction,
  UpdateInstanceResponse,
} from '@src/types';
import logger from "@src/padoa/logger";

export const handleCreateInstance: RequestHandler = async (req, res) => {
  const { groupId, machineId } = req.body;
  const { runId } = req.params;
  const executionDriver = await getExecutionDriver();

  logger.info({
    runId,
    machineId,
    groupId,
  },
  `>> Machine is requesting a new task`);

  try {
    const {
      instance,
      claimedInstances,
      totalInstances,
    } = await executionDriver.getNextTask({ runId, machineId, groupId });

    if (instance === null) {
      logger.info({ runId, machineId }, `<< All tasks claimed`);
      return res.json({
        spec: null,
        instanceId: null,
        claimedInstances,
        totalInstances,
      });
    }

    logger.info({ instanceId: instance.instanceId}, `<< INSTANCE_START hook called`, );

    //Instance Start
    logger.info(instance, `<< Sending new task to machine`);
    return res.json({
      spec: instance.spec,
      instanceId: instance.instanceId,
      claimedInstances,
      totalInstances,
    });
  } catch (error) {
    if (error.code && error.code === RUN_NOT_EXIST) {
      return res.sendStatus(404);
    }
    throw error;
  }
};

export const handleUpdateInstance: RequestHandler = async (req, res) => {
  const { instanceId } = req.params;
  const result: InstanceResult = req.body;
  const executionDriver = await getExecutionDriver();
  const screenshotsDriver = await getScreenshotsDriver();

  logger.info({ instanceId }, `>> Received instance result`);
  await executionDriver.setInstanceResults(instanceId, result);

  const screenshotUploadUrls: ScreenshotUploadInstruction[] = await screenshotsDriver.getScreenshotsUploadUrls(
    instanceId,
    result
  );

  const videoUploadInstructions: AssetUploadInstruction | null = await screenshotsDriver.getVideoUploadUrl(
    instanceId,
    result
  );

  if (screenshotUploadUrls.length > 0) {
    await Promise.all(screenshotUploadUrls.map((screenshot: ScreenshotUploadInstruction) => {
      executionDriver.setScreenshotUrl(
        instanceId,
        screenshot.screenshotId,
        screenshot.readUrl
      );
    }));
  }

  if (videoUploadInstructions) {
    await executionDriver.setVideoUrl({
      instanceId,
      videoUrl: videoUploadInstructions.readUrl,
    });
  }

  logger.info({
    instanceId,
    screenshotUploadUrls,
    videoUploadInstructions,
  }, `<< Sending assets upload URLs`, );

  const responsePayload: UpdateInstanceResponse = {
    screenshotUploadUrls,
  };
  if (videoUploadInstructions) {
    responsePayload.videoUploadUrl = videoUploadInstructions.uploadUrl;
  }
  return res.json(responsePayload);
};
