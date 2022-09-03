const crud = require("../../crud");
const { buscarProducts } = require('../products/products.handller');
const { buscarOrders } = require('../orders/orders.handller');

async function cadastrarOrderProducts(ordersProducts) {

    const orders = await buscarOrders();
    const Orderid = ordersProducts.OrderId;
    const products = await buscarProducts();
    const Productid = ordersProducts.ProductId;

    for (let idOrder of orders) {
        if (Orderid === idOrder.id) {
            for (let idProduct of products) {
                if (Productid === idProduct.id) {
                    if (idOrder.Status != 'aberto') {
                        return {
                            error: "0002",
                            message: "Não foi possivel fazer outro pedido... Outro pedido está em aberto!"
                        }
                    } else {
                        return await crud.save("orderProducts", undefined, ordersProducts);
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

async function deletarOrderProducts(idOrderProducts, orderProducts) {
    const orders = await buscarOrders();
    const Orderid = orderProducts.OrderId;
    const products = await buscarProducts();
    const Productid = orderProducts.ProductId;


    for (let idOrder of orders) {
        if (Orderid === idOrder.id) {
            for (let idProduct of products) {
                if (Productid === idProduct.id) {
                    if (idOrder.Status != 'aberto') {
                        return {
                            error: "0002",
                            message: "Não foi possivel fazer outro pedido... Outro pedido está em aberto!"
                        }
                    } else {
                        return await crud.save("orderProducts", undefined, orderProducts);
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

async function buscarOrderProducts() {
    return await crud.get("orderProducts");
};

async function buscarOrderProductsId(id) {
    return await crud.getById("orderProducts", id);
};






module.exports = {
    buscarOrderProducts,
    buscarOrderProductsId,
    cadastrarOrderProducts,
    deletarOrderProducts
}
