const apiKeyCache = require("../utils/apiKey");

const authApiKey = (req, _res, next) => {
  let { key } = req.query;

  console.log(key);

  key = "undefined" ? undefined : key;

  try {
    if (!key) {
      const error = new Error("No key");
      error.code = 401;
      throw error;
    }

    const cachedKey = apiKeyCache.find(
      (keyFromCache) => keyFromCache.key === key
    );

    if (
      new Date(cachedKey?.createdAt.getTime() + 15 * 60 * 1000) < new Date() ||
      !cachedKey
    ) {
      apiKeyCache.filter((keyFromCache) => keyFromCache.key !== key);
      const error = new Error("Expired key");
      error.code = 401;
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authApiKey };
