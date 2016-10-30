var express = require('express');
var Sequelize = require('sequelize')
var app = express();


//configurações Banco de Dados
var sequelize = new Sequelize('WEBFUEL2', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

  // SQLite only
 // storage: 'path/to/database.sqlite'
});

var Teste = sequelize.define('TESTE', {

					 idTeste: {
					    type: Sequelize.UUID,
					    primaryKey: true,
					    field: 'ID_TESTE' // Will result in an attribute that is firstName when user facing but first_name in the database

					  },
					  nome: {
					    type: Sequelize.STRING,
					    field: 'NOME'
					  },
					    sobreNome: {
					    type: Sequelize.STRING,
					    field: 'SOBRENOME'
					  }
					  					}, {
		  timestamps: false,
		  freezeTableName: true // Model tableName will be the same as the model name
});

var Estado = sequelize.define('ESTADO', {

					  idEstado:{
					  	type: Sequelize.UUID,
					    primaryKey: true,
					    field: 'ID'
					  },
					  uf: {
					    type: Sequelize.STRING,
					    field: 'UF'
					  },
					   descricao: {
					    type: Sequelize.STRING,
					    field: 'NOME'
					  }
					  					}, {
		  timestamps: false,
		  freezeTableName: true // Model tableName will be the same as the model name
});

var Cidade = sequelize.define('CIDADE', {

					  idcidade:{
					  	type: Sequelize.UUID,
					    primaryKey: true,
					    field: 'ID'
					  },
					  idEstado: {
					    type: Sequelize.STRING,
					    field: 'ID_ESTADO'
					  },
					  uf: {
					    type: Sequelize.STRING,
					    field: 'UF'
					  },
					  nome: {
					    type: Sequelize.STRING,
					    field: 'NOME'
					  }
					  					}, {
		  timestamps: false,
		  freezeTableName: true // Model tableName will be the same as the model name
});


var insertTeste = function(_nome, _sobrenome){

	Teste.create({nome: _nome, sobreNome: _sobrenome}).then(function(task){
		task.save();
	});


};
//FIM CONFIGURAÇÕES DO BANCO

//Aplicação
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

var contatos = [
	{nome: "Bruno", telefone: "9999-2222","cor":"yellow", "cidade":{"idCidade":3387,"idEstado":11,"uf":"MG","nome":"MONTE SANTO DE MINAS"}, data: new Date(), operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}},
	{nome: "Sandra", telefone: "9999-3333","cor":"red", "cidade":{"idCidade":3387,"idEstado":11,"uf":"MG","nome":"MONTE SANTO DE MINAS"}, data: new Date(), operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}},
	{nome: "Mariana", telefone: "9999-9999", "cor":"blue", "cidade":{"idCidade":3387,"idEstado":11,"uf":"MG","nome":"MONTE SANTO DE MINAS"}, data: new Date(), operadora: {nome: "Tim", codigo: 41, categoria: "Celular"}}
];
var operadoras = [
	{nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
	{nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1},
	{nome: "Claro", codigo: 21, categoria: "Celular", preco: 0.30},
	{nome: "Tim", codigo: 41, categoria: "Celular", preco: 3},
	{nome: "GVT", codigo: 25, categoria: "Fixo", preco: 1},
	{nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 2}
];

app.listen(process.env.PORT || 3412);

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//VERBOS
//lista todos contatos pre-definidos
app.get('/contatos', function(req, res) {
  res.json(contatos);
});

app.post('/contatos', function(req, res) {
  contatos.push(req.body);
  res.json(true);
});

//lista todas operadoras para preenchimento de checkbox
app.get('/operadoras', function(req, res) {
  res.json(operadoras);
});

//insere dados na tabela teste
app.get('/insertTeste', function(req,res){
	insertTeste(req.param('nome'),req.param('sobrenome'));
	
	res.send('OK!');

});

//consulta todos os Estados
app.get('/listAllEstados', function(req, res){
	
  Estado.findAll().then(function(objs){

  		res.json(objs);

  });

});

//consulta todas as cidades cujo estado pertença à id
app.get('/listAllCidadesByIdEstado', function(req, res){
	
	var _idEstado = req.param('idEstado');

	  Cidade.findAll({
					  where: {
					    idEstado: _idEstado
					  }
			}).then(function(objs){
	 		
	  				res.json(objs);

	  });

});
