const router = require("express").Router();

router.use("/alarms", require("./alarms"));
router.use("/api-key", require("./apiKey"));
router.use("/locations", require("./locations"));
router.use("/ping", require("./ping"));

module.exports = router;
