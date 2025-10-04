import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

// Import Configs
import { swaggerOptions } from "./config/swaggerConfig.js";
import { corsOptions } from "./config/corsConfig.js";

// Import Middlewares
import { requestIdMiddleware } from "./middlewares/requestId.js";
import { morganMiddleware } from "./middlewares/logger.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";
import { metricsMiddleware } from "./middlewares/metrics.js";

// Import Routers
import indexRouter from "./routes/indexRouter.js";
import proxyRouter from "./routes/proxyRouter.js";
import metricsRouter from "./routes/metricsRouter.js";

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(requestIdMiddleware);
app.use(morganMiddleware);
app.use(rateLimiter);
app.use(metricsMiddleware);

// Routers
app.use("/", indexRouter);
app.use("/proxy", proxyRouter);
app.use("/metrics", metricsRouter);

// Swagger Setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
