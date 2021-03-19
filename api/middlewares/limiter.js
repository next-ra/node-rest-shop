const router = require('express').Router();
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 100,
});

router.use(limiter);

module.exports = router;
