var express = require('express');
var router = new express.Router();

var db = require('../../db');
var Building = db.Building;

router.get('/:id', function(req, res, next){

  Building.findById(req.params.id)
  .then(building=>res.send(building))
  .catch(function(err){console.error(err); res.status(500).end(); });
})

router.get('/', function(req, res, next){
  Building.findAll({where:req.query})
  .then(buildings=>res.send(buildings))
  .catch(err=>console.error);
})

router.get('/types', function(req, res, next){
  res.send(Building.rawAttributes.propertyTypes.values);
});

router.get('/commercial', function(req, res, next) {
  Building.findAll({
    where: {
      propertyType: 'Commercial'
    }
  })
  .then(commercialBuildings => res.send(commercialBuildings))
  .catch(err=>console.error);
})

module.exports = router;
