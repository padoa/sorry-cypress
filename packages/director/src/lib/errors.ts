export class AppError extends Error {
  code: string;
  constructor(code: string, msg?: string) {
    super(`AppError. Code: ${code}. Message : ${msg ? msg : 'No message'}`);
    this.code = code;
  }
}

export const INSTANCE_EXISTS = 'INSTANCE_EXISTS';
export const INSTANCE_NOT_EXIST = 'INSTANCE_NOT_EXIST';

export const RUN_EXISTS = 'RUN_EXISTS';
export const RUN_NOT_EXIST = 'RUN_NOT_EXISTS';
export const PROJECT_CREATE_FAILED = 'PROJECT_CREATE_FAILED';

export const CLAIM_FAILED = 'CLAIM_FAILED';
export const SCREENSHOT_URL_UPDATE_FAILED = 'SCREENSHOT_URL_UPDATE_FAILED';
export const VIDEO_URL_UPDATE_FAILED = 'VIDEO_URL_UPDATE_FAILED';
export const INSTANCE_RESULTS_UPDATE_FAILED = 'INSTANCE_RESULTS_UPDATE_FAILED';
