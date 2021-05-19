import { BackError, ErrorConverter } from "@padoa/express";
import { AppError } from "@src/lib/errors";

export const appErrorConverter: ErrorConverter = (err) => {
  if (err instanceof AppError) {
    return { convertedError: new BackError((err as AppError).message, 500, { stack: err.stack }), continueConversion: false };
  }
  return { continueConversion: true };
}