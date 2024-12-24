const express = require("express");
const router = express.Router();
const collectDefaultMetrics = require("prom-client").collectDefaultMetrics;
const register = require("prom-client").register;

collectDefaultMetrics();

/**
 * @openapi
 * /metrics:
 *   get:
 *     tags:
 *      - Public
 *     description: metrics
 *     responses:
 *       200:
 *         description: prometheus format metrics.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       default:
 *         description: unexpected response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get("/", async function (req, res, next) {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

module.exports = router;
