const router = require("express").Router();

router.get("/", async (_req, res, _next) => {
  res.status(200).json({
    success: true,
    data: "pong",
  });
});

module.exports = router;
