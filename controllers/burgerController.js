const Express = require("express");
const orm = require("../models/orm");
var router = Express.Router();

var burgers = require("../models/burgers.js");

router.get('/', function (req, res) {
    orm.selectAll(function(result) {
        var burgersResult = {
            burgers: [],
            devoured: []
        }
        
    if(result) {
        burgersResult.burgers = result( burger => !burger.devoured );
        burgersResult.devoured = result( burger => burger.devoured );
        }
        res.render('index', burgersResult);
    });    
});

router.post('/api/burgers', function (req, res) {
    if(req.body.newBurger)
    {
        orm.insertOne(req.body.newBurger, function(result) {
            result ? res.json(result) : res.json(false);
        });
    } else res.json(false);
});

router.put('/api/burgers/:id', function (req, res) {
    if(req.params.id && req.body.devoured) {
        orm.updateOne(req.params.id, function(result) {
            result ? res.json(true) : res.json(false);
        })
    } else res.json(false);
});

module.exports = router;