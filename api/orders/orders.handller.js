const crud = require("../../crud");
const { buscarUser } = require('../users/users.handller');
const { buscarOrderProducts } = require('../orderProducts/orderProducts.handller');

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

async function editarOrders(idOrder, order) {
    const listaorders = await buscarOrders();
    const listaOrderProducts = await buscarOrderProducts();


    for (let idOrders of listaorders) {
        if (idOrder === idOrders.id) {
            for (let idOrderProducts of listaOrderProducts) {
                if (idOrderProducts.OrderId == idOrder) {
                    if (idOrders.Status == 'aberto') {
                        const edit = {
                            Number: order.Number,
                            UserId: order.UserId,
                            Status: "fechado"
                        }
                        const editOrder = await crud.save("orders", idOrder, edit);
                        return editOrder;
                    }else{
                        return {
                            error: "0005",
                            message: "Esse pedido não esta aberto!"
                        }
                    }
                } else {
                    return {
                        error: "0006",
                        message: "Não há produtos nesse pedido!"
                    }
                }
            }

        }
    }
    return {
        error: "0003",
        message: "Não foi encontrado esse Pedido!"
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
    deletarOrders,
    editarOrders
}
