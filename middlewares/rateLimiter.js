import rateLimit from "express-rate-limit";
import { logger } from "./logger.js";

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    logger.warn(`[${req.id}] Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({ error: "Too many requests. Try again later." });
  },
});