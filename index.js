const restify = require( "restify" );
const server = restify.createServer();
const dao = require( "./dao" );


server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const carroURL = '/ec201/carro';

// POST http://localhost:3000/ec201/carro => Create
server.post(`${carroURL}`, async (req, res) => {

    let carro = {
        marca : req.body.marca,
        modelo : req.body.modelo,
        ano : req.body.ano,
        valor : req.body.valor,
    };
    
    let carroCriado = await dao.inserir(carro);
    
    res.json(carroCriado);

});

// PATCH http://localhost:3000/ec201/carro/id => Update
server.patch(`${carroURL}/:id`, async (req, res) => {
    
    let carro = {
        id : req.params.id,
        marca : req.body.marca,
        modelo : req.body.modelo,
        ano : req.body.ano,
        valor : req.body.valor,
    };
    
    let carroAtualizado = await dao.atualizar(carro);
    
    res.json(carroAtualizado);

});

// GET http://localhost:3000/ec201/carro => Read
server.get(`${carroURL}`, async (req, res) => {
    
    let carro = {
        id : req.query.id,
        marca : req.query.marca,
        modelo : req.query.modelo,
        anoInicial : req.query.anoInicial,
        valorInicial : req.query.valorInicial,
    };
    
    let carros = await dao.listar(carro);
    res.json(carros);
});

// DELETE http://localhost:3000/ec201/carro/id => Delete
server.del(`${carroURL}/:id`, async (req, res) => {
    
    let id = req.params.id;

    let numEcluidos = await dao.excluir(id);
    
    res.json(
        {
            excluidos: numEcluidos
        }
    )
});

server.listen(3000, () => {
    console.log(`O servidor está rodando!`);
});
