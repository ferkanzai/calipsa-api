const router = require("express").Router();

router.get("/", require("./alarms"));
router.get("/total-count", require("./getTotalCount"));

module.exports = router;
