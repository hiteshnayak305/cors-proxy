const express = require("express");
const router = express.Router();
const axios = require("axios");
let cache = JSON.parse("{}");

/**
 * @openapi
 * /proxy:
 *   get:
 *     tags:
 *      - Public
 *     parameters:
 *      - name: url
 *        in: query
 *        description: 'The name that needs to be fetched. Use user1 for testing. '
 *        required: true
 *        schema:
 *          type: string
 *     description: GET proxy
 *     responses:
 *       200:
 *         description: Returns a json object.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       default:
 *         description: unexpected response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.get("/", function (req, res, next) {
  if (
    cache[req.query.url] &&
    Date.now() / 1000 < cache[req.query.url + "_modified"] + 60
  ) {
    console.log("Return cached response");
    res.status(200).send(cache[req.query.url]);
  } else {
    axios
      .get(req.query.url)
      .then((response) => {
        cache[req.query.url] = response.data;
        cache[req.query.url + "_modified"] = Math.floor(Date.now() / 1000);
        return response;
      })
      .then((response) => res.status(response.status).send(response.data))
      .catch((error) => res.status(400).send(error));
  }
});

module.exports = router;
