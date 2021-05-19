import { RequestHandler } from 'express';
import { routeNameWriter, wrapAsync, AsyncRequestHandler } from '@padoa/express';

export const routeTo = (route: AsyncRequestHandler): Array<RequestHandler> => [routeNameWriter, wrapAsync(route)];
