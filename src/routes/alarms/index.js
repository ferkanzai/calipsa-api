const router = require("express").Router();

router.get("/", require("./alarms"));

module.exports = router;
