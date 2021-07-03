const router = require("express").Router();
const { authApiKey } = require("../../middlewares/auth");

const alarms = require("../../../data.1625071215.json").alarms;

router.get("/", authApiKey, (req, res, next) => {
  let { page = 1, limit, locationId, outcome, from, to } = req.query;

  page = Number(page);
  limit = limit !== "undefined" ? Number(limit) : 25;
  from = from !== "undefined" ? from : undefined;
  to = to !== "undefined" ? to : undefined;
  outcome = "true" ? true : false;

  const offset = page * limit - limit;

  let alarmsPaginated = alarms;

  if (locationId) {
    locationId = Number(locationId);
    alarmsPaginated = alarmsPaginated.filter(
      (alarm) => alarm.location === locationId
    );
  }

  if (outcome) {
    alarmsPaginated = alarmsPaginated.filter((alarm) => alarm.outcome === true);
  }

  if (from) {
    alarmsPaginated = alarmsPaginated.filter(
      (alarm) => new Date(alarm.timestamp) > new Date(from)
    );
  }

  if (to) {
    alarmsPaginated = alarmsPaginated.filter(
      (alarm) => new Date(alarm.timestamp) < new Date(to)
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
