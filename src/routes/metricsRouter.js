import express from "express";
import { register as prometheusRegister } from "../middlewares/metrics.js";

const router = express.Router();

/**
 * @openapi
 * /metrics:
 *   get:
 *     tags:
 *      - Public
 *     summary: Expose Prometheus metrics
 *     description: Returns metrics in Prometheus text format for scraping.
 *     operationId: getMetrics
 *     responses:
 *       200:
 *         description: Prometheus formatted metrics
 *         content:
 *           text/plain; version=0.0.4:
 *             schema:
 *               type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get("/", async function (req, res, next) {
  res.set("Content-Type", prometheusRegister.contentType);
  res.end(await prometheusRegister.metrics());
});

export default router;
