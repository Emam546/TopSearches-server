const nodeCache = require("node-cache");
const cache = new nodeCache({
    stdTTL:  60 * 60,
    checkperiod:  60 * 60,
});
module.exports = (timeToLive) => {
    timeToLive = timeToLive || cache.options.stdTTL;
    return function (req, res, next) {
        if (req.method != "GET") {
            console.log("can Not Cache Non Get Method");
            return next();
        }
        const url = req.originalUrl;
        const result = cache.get(url);
        if (result) {
            res.send(result);
            console.log("CACHE SENDED");
        } else {
            res.originalSend = res.send;
            res.send = (body) => {
                res.originalSend(body);
                cache.set(url, body, timeToLive);
                console.log("NEW CACHE HAVE BEEN STORED");
            };
            next();
        }
    };
};
