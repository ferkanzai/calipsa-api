const router = require("express").Router();

const alarms = require("../../../data.1625071215.json").alarms;

router.use("/", (req, res, next) => {
  try {
    res.status(200).json({
      count: alarms.length,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
