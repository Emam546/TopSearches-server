var express = require('express');
var router = express.Router();
const googleTrends = require('google-trends-api');
const cache=require("../middleWar/cache")
/* GET home page. */
router.use(cache())
router.get('/trends/:id', async function(req, res, next) {
  const id=req.params.id || "US"
  googleTrends.realTimeTrends({geo:id.toUpperCase()})
  .then(function(results){
    try{
      console.log(results);
      res.status(200).json({status:true,msg:"success",results:JSON.parse(results)})
    }catch(err){
      res.status(404).sendFile("public/404/index.html")
    }
  })
  .catch(function(err){
    next()
  });
});
router.get('/trends', async function(req, res, next) {
  googleTrends.realTimeTrends({geo:"US"})
  .then(function(results){
    try{
      console.log(results);
      res.status(200).json({status:true,msg:"success",results:JSON.parse(results)})
    }catch(err){
      res.status(404).sendFile("public/404/index.html")
    }
  })
  .catch(function(err){
    next()
  });
});
router.use((req,res)=>{
  res.status(404).json({status:false,msg:`the data not found`})
})

module.exports = router;
