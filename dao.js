const Carro = require( "./models/Carro" );
const { model } = require("./database/Conexao");
const { Op } = require( "sequelize" );


// Inserir Carro
async function inserir(carro){
    
    carro = await Carro.create(carro);
    
    let carroCriado = await Carro.findByPk(carro.id);
    
    return carroCriado;

}

// Atualizar Carro
async function atualizar(carroEnv){

    carro = await Carro.update(
        carroEnv,
        {
            where: {
                id: carroEnv.id
            }
        }
    );

    let carroAtualizado = await Carro.findByPk(carroEnv.id);
    
    return carroAtualizado;

}

// Listar Carro(s)
async function listar(carroEnv){


    if(carroEnv.id){
        
        let carros = await Carro.findByPk(carroEnv.id);
        return carros;
    }
    else if(carroEnv.marca && carroEnv.modelo){
        
        let carros = await Carro.findAll(
            {
                where: {
                    [Op.and]: [
                        {marca: carroEnv.marca},
                        {modelo: carroEnv.modelo}
                    ]    
                }            
            }
        );
        return carros;
    }
    else if(carroEnv.marca){
        
        let carros = await Carro.findAll(
            {
                where: { 
                    marca: carroEnv.marca 
                }            
            }
        );
        return carros;
    }
    else if(carroEnv.anoInicial){
        
        let carros = await Carro.findAll(
            {
                where: { 
                    ano:{
                        [Op.gte]: carroEnv.anoInicial
                    } 
                }            
            }
        );
        return carros;
    }
    else if(carroEnv.valorInicial){
        
        let carros = await Carro.findAll(
            {
                where: { 
                    ano:{
                        [Op.gte]: carroEnv.valorInicial
                    } 
                }            
            }
        );

        return carros;
    }

    let carros = await Carro.findAll();
    return carros;
}

// Excluir Carro(s)

async function excluir(id){
    
    let numEcluidos = await Carro.destroy(
        {
            where: {
                id: id
            }
        }
    );
    
    return numEcluidos;
}


module.exports = {
    inserir,
    atualizar,
    listar,
    excluir
}