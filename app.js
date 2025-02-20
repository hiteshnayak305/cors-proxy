const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require("cors");

const indexRouter = require("./routes/index");
const proxyRouter = require("./routes/proxy");
const metricsRouter = require("./routes/metrics");

const app = express();
app.disable("x-powered-by");

const origin = process.env.ORIGIN || "*";
let corsOptions = {
  origin: origin, // Compliant
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/proxy", proxyRouter);
app.use("/metrics", metricsRouter);

const jsdocOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Node Proxy",
      description:
        "A proxy server to resolve cors issue directly accessing public rest api s",
      contact: {
        email: "hiteshnayak305@noreply.github.com",
      },
      license: {
        name: "Apache 2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html",
      },
      version: "1.0.1",
    },
    servers: [
      {
        url: "/",
      },
    ],
    tags: [
      {
        name: "Public",
        description: "Public endpoints",
      },
    ],
  },
  apis: ["../**/routes/*.js"], // files containing annotations as above
};
const openapiSpecification = swaggerJsdoc(jsdocOptions);
console.log(openapiSpecification);
app.use("/openapi", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

module.exports = app;
