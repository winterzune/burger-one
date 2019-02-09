var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'./public')));

var routes = require('./controllers/burgers_controller.js');
app.use('/',routes);
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
});
