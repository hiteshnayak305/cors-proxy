import client from "prom-client";

const register = new client.Registry();
client.collectDefaultMetrics({ register });

export const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"],
});

export const httpRequestDurationSeconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.5, 1, 2, 5, 10],
});

export const cacheHitsTotal = new client.Counter({
  name: "cache_hits_total",
  help: "Number of cache hits",
  labelNames: ["route"],
});

export const metricsMiddleware = async (req, res, next) => {
  const end = httpRequestDurationSeconds.startTimer();
  res.on("finish", () => {
    const route = req.baseUrl || req.path;
    httpRequestsTotal.inc({ method: req.method, route, status: res.statusCode });
    end({ method: req.method, route, status: res.statusCode });
  });
  next();
};

export { register };