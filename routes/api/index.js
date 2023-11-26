const express = require("express");

const router = express.Router();

router.use("/v1", require("./vi"));

module.exports = router;
