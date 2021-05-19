import mongodb from 'mongodb';
import { MONGODB_URI, MONGODB_DATABASE } from '@src/config';
import logger from "@src/padoa/logger";

let db: mongodb.Db;
let client: mongodb.MongoClient;

export const init = async () => {
  if (db && client) {
    return;
  }

  client = await mongodb.connect(MONGODB_URI, { useNewUrlParser: true });
  logger.info('Successfully connected to MongoDB server');

  db = client.db(MONGODB_DATABASE);

  db.collection('runs').createIndex({ runId: 1 }, { unique: true });
  db.collection('instances').createIndex({ instanceId: 1 }, { unique: true });
  db.collection('projects').createIndex({ projectId: 1 }, { unique: true });
};

export const getMongoDB = () => db;

export const pingDB = async () => {
  try {
    const mongoResponse = await getMongoDB().command({ ping: 1 });
    return mongoResponse.ok === 1;
  } catch (e) {
    logger.error(`Error while pinging MongoDB : ${e}`);
    return false;
  }
}
