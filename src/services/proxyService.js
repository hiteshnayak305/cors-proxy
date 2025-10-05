import axiosInstance from "./axiosInstance.js";
import { getCachedResponse, setCachedResponse } from "../utils/cache.js";
import { logger } from "../middlewares/logger.js";
import { cacheHitsTotal } from "../middlewares/metrics.js";

export const handleProxyRequest = async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    logger.warn(`[${req.id}] Missing 'url' query parameter`);
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  const method = req.method.toUpperCase();

  // ✅ Serve from cache (GET only)
  if (method === "GET") {
    const cached = getCachedResponse(targetUrl);
    if (cached) {
      logger.info(`[${req.id}] Cache hit for ${targetUrl}`);
      cacheHitsTotal.inc({ route: "/proxy" });
      return res.status(200).send(cached);
    }
  }

  try {
    logger.info(`[${req.id}] Proxying ${method} → ${targetUrl}`);

    const { host, 'content-length': _, 'transfer-encoding': __, ...safeHeaders } = req.headers;
    const headers = safeHeaders;

    const axiosConfig = {
      method,
      url: targetUrl,
      headers,
      data: ["POST", "PUT", "PATCH"].includes(method) ? req.body : undefined,
      requestId: req.id
    };

    const response = await axiosInstance(axiosConfig);

    if (method === "GET" && response.status === 200) {
      setCachedResponse(targetUrl, response.data);
      logger.debug(`[${req.id}] Cached GET response for ${targetUrl}`);
    }

    logger.info(`[${req.id}] ✅ ${method} ${targetUrl} → ${response.status}`);
    return res.status(response.status).send(response.data);
  } catch (error) {
    logger.error(`[${req.id}] ❌ Proxy Error: ${error.message || "Unknown error"}`);
    const status = error.response?.status || 502;
    const message = error.response?.data || { error: "Bad Gateway" };
    return res.status(status).json(message);
  }
};