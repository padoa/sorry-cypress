import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { PORT } from './config';
import { InstancesAPI } from './datasources/instances';
import { ProjectsAPI } from './datasources/projects';
import { RunsAPI } from './datasources/runs';
import { SpecsAPI } from './datasources/specs';
import { resolvers } from './resolvers';
import { typeDefs } from './schema/schema';
import { pingDB } from "@src/lib/mongo";
import { getMetrics } from "@src/lib/metrics";

async function start() {
  const dataSources = {
    runsAPI: new RunsAPI(),
    instancesAPI: new InstancesAPI(),
    projectsAPI: new ProjectsAPI(),
    specsAPI: new SpecsAPI(),
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => dataSources,
  });

  const app = express();

  app.get('/health-check-mongo', async (_, res) => {
    await pingDB() ?
      res.sendStatus(200) :
      res.sendStatus(503);
  });

  app.get('/metrics', async (_, res) => {
    try {
      const metrics = await getMetrics();
      res.send(metrics);
    } catch (error) {
      res.status(500).send({ error });
    }
  });

  server.applyMiddleware({ app, path: '/' });

  app.listen({ port: PORT }, () => {
    console.log(`🚀 Apollo server is listening on port ${PORT}`);
  }).on('error', (error) => {
    throw error
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
