import express from "express";
import { handleProxyRequest } from "../services/proxyService.js";

const router = express.Router();

/**
 * @openapi
 * /proxy:
 *   get:
 *     summary: Proxy any HTTP request
 *     description: |
 *       Proxies requests to any target URL, forwarding method, headers, query parameters, and body.
 *       Supports GET, POST, PUT, PATCH, DELETE, etc.
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: The target URL to proxy the request to.
 *     responses:
 *       200:
 *         description: Successful response from the target API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing URL parameter
 *       502:
 *         description: Bad Gateway / upstream error
 *   post:
 *     summary: Proxy any HTTP request
 *     description: |
 *       Proxies requests to any target URL, forwarding method, headers, query parameters, and body.
 *       Supports GET, POST, PUT, PATCH, DELETE, etc.
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: The target URL to proxy the request to.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example: { "message": "Hello World" }
 *     responses:
 *       201:
 *         description: Successful response from the target API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing URL parameter
 *       502:
 *         description: Bad Gateway / upstream error
 *   put:
*     summary: Proxy any HTTP request
*     description: |
*       Proxies requests to any target URL, forwarding method, headers, query parameters, and body.
*       Supports GET, POST, PUT, PATCH, DELETE, etc.
*     parameters:
*       - in: query
*         name: url
*         schema:
*           type: string
*         required: true
*         description: The target URL to proxy the request to.
*     requestBody:
*       required: false
*       content:
*         application/json:
*           schema:
*             type: object
*             example: { "message": "Hello World" }
*     responses:
*       200:
*         description: Successful response from the target API
*         content:
*           application/json:
*             schema:
*               type: object
*       400:
*         description: Missing URL parameter
*       502:
*         description: Bad Gateway / upstream error
*   patch:
*     summary: Proxy any HTTP request
*     description: |
*       Proxies requests to any target URL, forwarding method, headers, query parameters, and body.
*       Supports GET, POST, PUT, PATCH, DELETE, etc.
*     parameters:
*       - in: query
*         name: url
*         schema:
*           type: string
*         required: true
*         description: The target URL to proxy the request to.
*     requestBody:
*       required: false
*       content:
*         application/json:
*           schema:
*             type: object
*             example: { "message": "Hello World" }
*     responses:
*       200:
*         description: Successful response from the target API
*         content:
*           application/json:
*             schema:
*               type: object
*       400:
*         description: Missing URL parameter
*       502:
*         description: Bad Gateway / upstream error
*   delete:
*     summary: Proxy any HTTP request
*     description: |
*       Proxies requests to any target URL, forwarding method, headers, query parameters, and body.
*       Supports GET, POST, PUT, PATCH, DELETE, etc.
*     parameters:
*       - in: query
*         name: url
*         schema:
*           type: string
*         required: true
*         description: The target URL to proxy the request to.
*     responses:
*       204:
*         description: Successful response from the target API
*         content:
*           application/json:
*             schema:
*               type: object
*       400:
*         description: Missing URL parameter
*       502:
*         description: Bad Gateway / upstream error
*   options:
*     summary: Proxy any HTTP request
*     description: |
*       Proxies requests to any target URL, forwarding method, headers, query parameters, and body.
*       Supports GET, POST, PUT, PATCH, DELETE, etc.
*     parameters:
*       - in: query
*         name: url
*         schema:
*           type: string
*         required: true
*         description: The target URL to proxy the request to.
*     responses:
*       204:
*         description: Successful response from the target API
*         content:
*           application/json:
*             schema:
*               type: object
*       400:
*         description: Missing URL parameter
*       502:
*         description: Bad Gateway / upstream error
 */
router.all("/", handleProxyRequest);

export default router;