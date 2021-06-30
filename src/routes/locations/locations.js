const router = require("express").Router();

const locations = require("../../../data.1625071215.json").locations;

router.get("/", (_req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: locations,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
