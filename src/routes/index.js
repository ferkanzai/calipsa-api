const router = require("express").Router();

router.use("/ping", require("./ping"));
router.use("/locations", require("./locations"));
router.use("/alarms", require("./alarms"));

module.exports = router;
