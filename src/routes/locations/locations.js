const router = require("express").Router();
const { authApiKey } = require("../../middlewares/auth");

const locations = require("../../../data.1625071215.json").locations;

router.get("/", authApiKey, (req, res, next) => {
  let { page = 1, limit = 25, locationId } = req.query;

  page = Number(page);
  limit = Number(limit);
  locationId = Number(locationId);

  const offset = page * limit - limit;

  let locationsPaginated = locations;

  if (locationId) {
    locationsPaginated = locationsPaginated.filter(
      (location) => location.id === locationId
    );
  }

  locationsPaginated = locationsPaginated.slice(offset, limit * page);

  try {
    res.status(200).json({
      success: true,
      nextPage: locationsPaginated.length < limit ? null : page + 1,
      count: locationsPaginated.length,
      data: locationsPaginated,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
