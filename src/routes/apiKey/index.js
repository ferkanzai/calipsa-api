const router = require("express").Router();

router.get("/", require("./apiKey"));

module.exports = router;
