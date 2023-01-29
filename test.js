const fs=require("fs")
const googleTrends = require("google-trends-api");
googleTrends
    .realTimeTrends({ geo:"US"})
    .then(function (results) {
        // console.log("These results are awesome", results);
        console.log(typeof results);
        fs.writeFileSync("res.json",results)
    })
    .catch(function (err) {
        console.error("Oh no there was an error", err);
    });


