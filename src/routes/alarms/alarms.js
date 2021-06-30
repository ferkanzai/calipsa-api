const router = require("express").Router();
const { authApiKey } = require("../../middlewares/auth");

const alarms = require("../../../data.1625071215.json").alarms;

router.get("/", authApiKey, (req, res, next) => {
  let { page = 1, limit = 25, locationId, outcome, before, after } = req.query;

  page = Number(page);
  limit = Number(limit);
  locationId = Number(locationId);

  const offset = page * limit - limit;

  let alarmsPaginated = alarms;

  if (locationId) {
    alarmsPaginated = alarmsPaginated.filter(
      (alarm) => alarm.location === locationId
    );
  }

  if (outcome) {
    alarmsPaginated = alarmsPaginated.filter((alarm) => alarm.outcome === true);
  }

  if (before) {
    alarmsPaginated = alarmsPaginated.filter(
      (alarm) => new Date(alarm.timestamp) < new Date(before)
    );
  }

  if (after) {
    alarmsPaginated = alarmsPaginated.filter(
      (alarm) => new Date(alarm.timestamp) > new Date(after)
    );
  }

  alarmsPaginated = alarmsPaginated.slice(offset, limit * page);

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
