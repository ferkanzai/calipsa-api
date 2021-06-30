const crypto = require("crypto");
const router = require("express").Router();

const apiKeyCache = require("../../utils/apiKey");

router.use("/", (_req, res, next) => {
  try {
    const rand = crypto.randomBytes(10);

    let chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    let key = "";

    for (let i = 0; i < rand.length; i++) {
      let index = rand[i] % chars.length;
      key += chars[index];
    }

    apiKeyCache.push({
      key,
      createdAt: new Date(),
    });

    res.status(200).json({
      success: true,
      key,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
