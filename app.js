const express = require('express');
const { engine } = require ('express-handlebars');
const bp = require('body-parser')
const router = express.Router();

const app = express();
const controllerUsuario = require('./controllers/usuario');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', function (req, res){
    res.render("index");
});

app.get('/mostrarUsuarios', controllerUsuario.mostrarUsuarios);

app.post('/cadastrarUsuario', controllerUsuario.cadastrarUsuario);

app.listen(3000);

module.exports = router;