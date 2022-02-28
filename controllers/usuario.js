//const modelUsuario = require('../models/usuario');
const { MongoClient } = require("mongodb")
const uri = "mongodb://localhost:27017/?readPreference=primary&ssl=false"
const cliente = new MongoClient(uri)

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

module.exports = { cadastrarUsuario };