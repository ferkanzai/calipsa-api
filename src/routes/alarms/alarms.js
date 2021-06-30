const router = require("express").Router();
const { authApiKey } = require("../../middlewares/auth");

const alarms = require("../../../data.1625071215.json").alarms;

router.get("/", authApiKey, (req, res, next) => {
  let { page = 1, limit = 25 } = req.query;

  page = Number(page);
  limit = Number(limit);

  const offset = page * limit - limit;

  const alarmsPaginated = alarms.slice(offset, limit * page);

  try {
    res.status(200).json({
      success: true,
      nextPage: alarmsPaginated.length < limit ? null : page + 1,
      count: alarmsPaginated.length,
      data: alarmsPaginated,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
