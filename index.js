const restify = require( "restify" );
const server = restify.createServer();
const Carro = require( "./models/Carro" );
const { Op } = require( "sequelize" );

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const carroURL = '/ec201/carro';

// POST http://localhost:3000/ec201/carro => Create
server.post(`${carroURL}`, async (req, res) => {
    
    let marca = req.body.marca;
    let modelo = req.body.modelo;
    let ano = req.body.ano;
    let valor = req.body.valor;

    let carro = await Carro.create(
        {
            marca: marca,
            modelo: modelo,
            ano: ano,
            valor: valor
        }
    );
    
    let carroCriado = await Carro.findByPk(carro.id);
    
    res.json(carroCriado);

});

// PATCH http://localhost:3000/ec201/carro/id => Update
server.patch(`${carroURL}/:id`, async (req, res) => {
    
    let id = req.params.id;
    let marca = req.body.marca;
    let modelo = req.body.modelo;
    let ano = req.body.ano;
    let valor = req.body.valor;

    let carro = await Carro.update(
        {
            marca: marca,
            modelo: modelo,
            ano: ano,
            valor: valor
        },
        {
            where: {
                id: id
            }
        }
    );
    
    let carroAtualizado = await Carro.findByPk(id);
    
    res.json(carroAtualizado);

});

// GET http://localhost:3000/ec201/carro => Read
server.get(`${carroURL}`, async (req, res) => {
    
    let id = req.query.id;
    let marca = req.query.marca;
    let modelo = req.query.modelo;
    let anoInicial = req.query.anoInicial;
    let valorInicial = req.query.valorInicial;

    if(id){
        
        let carros = await Carro.findByPk(id);
        res.json(carros);
    }
    else if(marca && modelo){
        
        let carros = await Carro.findAll(
            {
                where: {
                    [Op.and]: [
                        {marca: marca},
                        {modelo: modelo}
                    ]    
                }            
            }
        );
        res.json(carros);
    }
    else if(marca){
        
        let carros = await Carro.findAll(
            {
                where: { 
                    marca:marca 
                }            
            }
        );
        res.json(carros);
    }
    else if(anoInicial){
        
        let carros = await Carro.findAll(
            {
                where: { 
                    ano:{
                        [Op.gte]: anoInicial
                    } 
                }            
            }
        );
        res.json(carros);
    }
    else if(valorInicial){
        
        let carros = await Carro.findAll(
            {
                where: { 
                    ano:{
                        [Op.gte]: valorInicial
                    } 
                }            
            }
        );
        res.json(carros);
    }
    
    let carros = await Carro.findAll();
    res.json(carros);
});

// DELETE http://localhost:3000/ec201/carro/id => Delete
server.del(`${carroURL}/:id`, async (req, res) => {
    
    let id = req.params.id;

    let numEcluidos = await Carro.destroy(
        {
            where: {
                id: id
            }
        }
    );
    res.json(
        {
            excluidos: numEcluidos
        }
    )
});

server.listen(3000, () => {
    console.log(`O servidor está rodando!`);
});
