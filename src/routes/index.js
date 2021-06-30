const router = require("express").Router();

router.use("/ping", require("./ping"));
router.use("/locations", require("./locations"));

module.exports = router;
