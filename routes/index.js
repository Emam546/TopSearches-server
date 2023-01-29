var express = require('express');
var router = express.Router();
const googleTrends = require('google-trends-api');
const cache=require("../middleWar/cache")
/* GET home page. */
router.get('/trends',cache(), async function(req, res, next) {
  googleTrends.realTimeTrends({geo:"US"})
  .then(function(results){
    try{
      console.log(results);
      res.status(200).json({status:true,msg:"success",results:JSON.parse(results)})
    }catch(err){
      res.status(400).json({status:false,msg:`Error Happened in parsing the data`})
      console.error(err);
    }
  })
  .catch(function(err){
    res.status(400).json({status:false,msg:`Error Happened in getting data`})

  });
});

module.exports = router;
