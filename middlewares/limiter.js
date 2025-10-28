const rateLimit = require('express-rate-limit');

const SPANS = {
    ONE_SECOND: 1 * 1000,
    ONE_MINUTE: 60 * 1000,
    FIFTEEN_MINUTES: 15 * 60 * 1000,
    ONE_HOUR: 60 * 60 * 1000,
    ONE_DAY: 24 * 60 * 60 * 1000,
};

const limiter = (max, span = 'FIFTEEN_MINUTES') => rateLimit({
    windowMs: SPANS?.[span] || SPANS.FIFTEEN_MINUTES,
    max: max,
    message: "Trop de requêtes provenant de cette IP, veuillez réessayer plus tard."
});

module.exports = limiter;