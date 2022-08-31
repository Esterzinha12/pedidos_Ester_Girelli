const crud = require("../../crud");
const { buscarUser } = require('../users/users.handller');

async function cadastrarOrders(order) {

    const clientes = await buscarUser();
    const idUser = order.UserId;

    console.log(clientes);

    for (let idCliente of clientes) {
        if (idUser === idCliente.id) {
            if(order.status == 'aberto'){
                return {
                    error: "0002",
                    message: "Não foi possivel fazer outro pedido... Outro pedido está em aberto!"
                }
            }else{
                const finalOrder = await crud.save("orders", undefined, order);
                 return finalOrder;
            }
           
        }
    }
    return {
        error: "0001",
        message: "Não foi encontrado esse cliente!"
    }

    // if (dados.status == "aberto") {

    //     // parte onde ira adicionar mais produtos no pedido;
    // }

    // const dados = {
    //     number: order.number,
    //     status: order.status
    // }



};

async function buscarOrders() {
    return await crud.get("orders");
};

async function buscarOrdersId(id) {
    return await crud.getById("orders", id);
};

async function deletarOrders(id) {
    return await crud.remove("orders", id);
};


module.exports = {
    buscarOrders,
    buscarOrdersId,
    cadastrarOrders,
    deletarOrders
}
