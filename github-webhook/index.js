const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const PORT = process.env["GITHUB_WEBHOOK_PORT"] || 4567;
const GITHUB_SECRET = process.env["GITHUB_SECRET"];

const app = express();

app.use(bodyParser.json());

app.all("*", (req, res) => {
  console.dir(req.body);
  //TODO check if sign is same
  //   if(!verify_signature(req.body))
});

function verify_signature(payload_body, X_HUB_SIGN) {
  let signature =
    "sha1=" +
    crypto
      .createHmac("sha1", GITHUB_SECRET)
      .update(payload_body)
      .digest("hex");
  return crypto.timingSafeEqual(signature, X_HUB_SIGN);
}

app.listen(PORT);
