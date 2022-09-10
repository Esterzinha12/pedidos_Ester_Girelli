const crud = require("../../crud");
const { buscarProducts } = require('../products/products.handller');
const { buscarOrders, buscarOrdersId } = require('../orders/orders.handller');
const { stringify } = require("@firebase/util");

async function cadastrarOrderProducts(ordersProducts) {

    const orders = await buscarOrders();
    const Orderid = ordersProducts.OrderId;
    const products = await buscarProducts();
    const Productid = ordersProducts.ProductId;
    const listOrderProducts = await buscarOrderProducts();


    for (let order of orders) {
        if (order.id === Orderid) {
            for (let product of products) {
                if (product.id === Productid) {
                    if (order.Status == "aberto") {
                        for (let orderExist of listOrderProducts) {
                            if (orderExist.ProductId === ordersProducts.ProductId && orderExist.OrderId === Orderid) {
                                const newOrderProduct = {
                                    ProductId: orderExist.ProductId,
                                    Quantity: ordersProducts.Quantity + orderExist.Quantity,
                                    OrderId: orderExist.OrderId
                                };
                                return await crud.save('orderProducts', orderExist.id, newOrderProduct);
                            }
                        }
                    }
                    return await crud.save('orderProducts', undefined, ordersProducts);
                }
            }
        }

    }
    return {
        error: "0003",
        message: "Não foi encontrado esse Pedido!"
    }

};

async function deletarOrderProducts(orderId, bodyDeletar) {
    const orders = await buscarOrders();
    const listOrderProducts = await buscarOrderProducts();

    for (let order of orders) {
        if (order.Status === "aberto") {
            for (let orderProduct of listOrderProducts) {
                if (order.id === orderProduct.OrderId && orderProduct.ProductId === bodyDeletar.ProductId) {
                    if (orderProduct.Quantity > bodyDeletar.Quantity) {
                        const newOrderProduct = {
                            ProductId: bodyDeletar.ProductId,
                            Quantity: orderProduct.Quantity - bodyDeletar.Quantity,
                            OrderId: bodyDeletar.OrderId
                        }
                        return await crud.save('orderProducts', orderProduct.id, newOrderProduct);
                    } else {
                        return await crud.remove("orderProducts", orderProduct.id);
                    }
                }
            }
        }
    }
    return {
        error: "0003",
        message: "Não foi encontrado esse Pedido!"
    }
}

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
