const crud = require("../../crud");
const { buscarUser } = require('../users/users.handller');

async function cadastrarOrders(order) {

    const clientes = await buscarUser();
    const idUser = order.UserId;
    const orders = await buscarOrders();

    for (let idCliente of clientes) {
        if (idUser === idCliente.id) {
            for (let idOrders of orders) {
                if (idUser === idOrders.UserId) {
                    if (idOrders.Status == 'aberto') {
                        return {
                            error: "0002",
                            message: "Não foi possivel fazer o pedido... Outro pedido está em aberto!"
                        }
                    }
                } 
            }
            const finalOrder = await crud.save("orders", undefined, order);
            return finalOrder;
        }
    }
    return {
        error: "0001",
        message: "Não foi encontrado esse cliente!"
    }
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
