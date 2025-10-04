import axios from "axios";
import { logger } from "../middlewares/logger.js";

// Headers to mask in logs
const SENSITIVE_HEADERS = ["authorization", "cookie"];

// Utility to mask headers
const maskHeaders = (headers) => {
    const masked = { ...headers };
    for (const key of SENSITIVE_HEADERS) {
        if (masked[key]) masked[key] = "[MASKED]";
    }
    return masked;
};

// Create a singleton Axios instance
const axiosInstance = axios.create({
    timeout: 10000,
    validateStatus: () => true, // allow all responses
});

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
    const maskedHeaders = maskHeaders(config.headers);
    logger.info(
        `[${config.requestId || "-"}] Axios Request → ${config.method.toUpperCase()} ${config.url}`
    );
    logger.debug(`[${config.requestId || "-"}] Headers: ${JSON.stringify(maskedHeaders)}`);
    if (config.data) logger.debug(`[${config.requestId || "-"}] Body: ${JSON.stringify(config.data)}`);
    config.metadata = { startTime: new Date() };
    return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        const duration = new Date() - response.config.metadata.startTime;
        logger.info(
            `[${response.config.requestId || "-"}] Axios Response ← ${response.config.method.toUpperCase()} ${response.config.url} | Status: ${response.status} | Duration: ${duration}ms`
        );
        logger.debug(`[${response.config.requestId || "-"}] Response Data: ${JSON.stringify(response.data)}`);
        return response;
    },
    (error) => {
        const config = error.config || {};
        const duration = config.metadata ? new Date() - config.metadata.startTime : 0;
        logger.error(
            `[${config.requestId || "-"}] Axios Error → ${config.method?.toUpperCase() || "UNKNOWN"} ${config.url || "UNKNOWN"} | Duration: ${duration}ms | ${error.message}`
        );
        return Promise.reject(error);
    }
);

export default axiosInstance;