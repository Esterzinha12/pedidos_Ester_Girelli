const crud = require("../../crud");
const { buscarUser } = require('../users/users.handller');

async function cadastrarOrders(order) {
    console.log("ok controller"); 
   
    // const clientes = await buscarUser();
    // for (let idCliente of clientes) {
    //     if (!idUser === idCliente) {
    //         return {
    //             error: "0001",
    //             message: "Não foi encontrado esse cliente!"
    //         }
    //     }
    // }
  

    // if (dados.status == "aberto") {
    //     return {
    //         error: "0002",
    //         message: "Não é possivel realizar mais um pedido!"
    //     }
    // }
    // const dados = {
    //     number :  order.number,
    //     status: order.status
    // }


    const finalOrder = await crud.save("orders", null, order);
    console.log("ok handller");
    return finalOrder;
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
