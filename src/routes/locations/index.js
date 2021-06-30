const router = require("express").Router();

router.get("/", require("./locations"));

module.exports = router;
