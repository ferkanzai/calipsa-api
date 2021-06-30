const router = require("express").Router();
const { authApiKey } = require("../../middlewares/auth");

const alarms = require("../../../data.1625071215.json").alarms;

router.get("/", authApiKey, (req, res, next) => {
  let { page = 1, limit = 25, locationId } = req.query;

  page = Number(page);
  limit = Number(limit);
  locationId = Number(locationId);

  const offset = page * limit - limit;

  let alarmsPaginated = [];

  if (locationId) {
    alarmsPaginated = alarms
      .filter((alarm) => alarm.location === locationId)
      .slice(offset, limit * page);
  } else {
    alarmsPaginated = alarms.slice(offset, limit * page);
  }

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
