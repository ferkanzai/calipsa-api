const router = require("express").Router();

router.get("/", require("./ping"));

module.exports = router;
