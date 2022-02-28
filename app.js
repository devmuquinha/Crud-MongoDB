const express = require('express');
const { engine } = require ('express-handlebars');
const router = express.Router();

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.get('/', function (req, res){
    res.render("index");
});

app.listen(3000);

module.exports = router;