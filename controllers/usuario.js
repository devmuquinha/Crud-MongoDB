//const modelUsuario = require('../models/usuario');
const { MongoClient } = require("mongodb")
const uri = "mongodb://localhost:27017/?readPreference=primary&ssl=false"
const cliente = new MongoClient(uri)

async function mostrarUsuarios(req, res){
    console.log("Listando usuários...")
    
    const resultado = await listarTodosUsuarios()
    JSON.stringify(resultado);

    if (resultado.length == 0) return res.send("Nenhum registro encontrado")
        
    res.render('todosUsuarios', { //Renderiza a página
        data: resultado
    });

    console.log(`${resultado.length} usuários listados`)
}

async function cadastrarUsuario(req, res){
    console.log("Cadastrando usuário...")
    
    const resultado = await inserirNovoUsuario({
        nome: req.body.usuario.nome,
        sobrenome: req.body.usuario.sobrenome,
        nickName: req.body.usuario.nickName
    })

    res.render("index")

    if (resultado.insertedId != null) return console.log(`Usuário ${resultado.insertedId} inserido com sucesso!`)
    return console.log("Erro ocorrido")

    //console.log(req.body.usuario.nome)
    //console.log(req.body.usuario.sobrenome)
    //console.log(req.body.usuario.nickName)
}

async function listarTodosUsuarios(){
    var resultado = ""
    
    try{
        await cliente.connect()
        const cursor = await cliente.db("teste").collection("usuario").find()

        resultado = await cursor.toArray();

    } catch (erro) {
        console.log(erro)
    } finally{
        await cliente.close()
        return resultado
    }
}

async function inserirNovoUsuario(usuarioNovo){
    var resultado = ""

    try {
        await cliente.connect()
        resultado = await cliente.db("teste").collection("usuario").insertOne(usuarioNovo)
    } catch (erro) {
        console.log(erro)
    } finally{
        cliente.close()
    }
    
    return resultado
}

module.exports = { cadastrarUsuario, mostrarUsuarios };