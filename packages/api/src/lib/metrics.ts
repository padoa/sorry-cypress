import { getMongoDB, init } from "@src/lib/mongo";
import mongodb from "mongodb";

interface PrometheusMetric {
  metricName: string;
  labels: Array<{ label: string; value: string }>;
  value: number | string;
}

const formatOneMetric = (rawMetric: PrometheusMetric): string => {
  return `sorry_cypress_${rawMetric.metricName}{${rawMetric.labels.map(({label, value }) => `${label}=${value}`).join(', ')}} ${rawMetric.value}`;
}

const formatMetrics = (rawMetrics: Array<PrometheusMetric>): string => {
  return rawMetrics.map((rawMetric) => formatOneMetric(rawMetric)).join('\n');
}

const metricGetters: Record<string, (db: mongodb.Db) => Promise<PrometheusMetric>> = {
  test: async () => Promise.resolve({ metricName: "test", value: 1, labels: [{ label: 'label1', value: 'value1' }] }),
}

export const getMetrics = async (): Promise<string> => {
    let db = getMongoDB();
    if (!db) {
      await init();
      db = getMongoDB();
    }
    const rawMetrics: Array<PrometheusMetric> = [];
    for (const metricGetter of Object.values(metricGetters)) {
      rawMetrics.push(await metricGetter(db));
    }
    return formatMetrics(rawMetrics);
}