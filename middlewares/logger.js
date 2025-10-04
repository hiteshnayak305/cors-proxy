import winston from "winston";
import morgan from "morgan";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    //new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

// Define custom Morgan token :id
morgan.token("id", (req) => req.id || "-");

export const morganStream = { write: (message) => logger.info(message.trim()) };

export const morganMiddleware = morgan(
  ":id :method :url :status :res[content-length] - :response-time ms",
  { stream: morganStream }
);