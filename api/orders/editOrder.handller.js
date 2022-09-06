const crud = require("../../crud");
const { buscarOrderProducts } = require('../orderProducts/orderProducts.handller');
const { buscarOrders } = require('../orders/orders.handller');

async function editarOrders(idOrder, order) {
    const listaorders = await buscarOrders();
    const listaOrderProducts = await buscarOrderProducts();

    console.log(idOrder);
    for (let idOrders of listaorders) {
        if (idOrder === idOrders.id) {
            for (let idOrderProducts of listaOrderProducts) {
                if (idOrderProducts.OrderId === idOrder) {
                    console.log(idOrderProducts.OrderId);
                    console.log(idOrder);
                    if (idOrders.Status == 'aberto') {
                        const edit = {
                            Number: order.Number,
                            UserId: order.UserId,
                            Status: "fechado"
                        }
                        const editOrder = await crud.save("orders", idOrder, edit);
                        return editOrder;
                    } else {
                        return {
                            error: "0005",
                            message: "Esse pedido não esta aberto!"
                        }
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

module.exports = {
    editarOrders
}