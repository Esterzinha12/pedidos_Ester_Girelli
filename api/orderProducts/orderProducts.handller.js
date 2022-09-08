const crud = require("../../crud");
const { buscarProducts } = require('../products/products.handller');
const { buscarOrders } = require('../orders/orders.handller');

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
                                    OrderId: orderExist.id
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

async function deletarOrderProducts(idOrderProducts, ordersProducts) {
    const orders = await buscarOrders();
    const Orderid = ordersProducts.OrderId;
    const listOrderProducts = await buscarOrderProducts();


    for (let idOrder of orders) {
        if (Orderid === idOrder.id) {
            if (idOrder.Status == "aberto") {
                for (let orderExist of listOrderProducts) {
                    if (orderExist.ProductId === ordersProducts.ProductId && orderExist.OrderId === Orderid) {
                        return {
                            error: "0002",
                            message: "Não foi possivel deletar esse pedido!"
                        }
                    }
                }
            }
            return await crud.remove("orderProducts", undefined, ordersProducts);

        }
    }
    return {
        error: "0003",
        message: "Não foi encontrado esse Pedido!"
    }
};

const listOrders = await orderHandler.getOrders();

const listOrderProducts = await getOrderProducts();

let ref = false;



for (let order of listOrders) {

    if (order.status == 'open') {

        for (let orderProducts of listOrderProducts) {

            if (orderProducts.id === orderProduct.id) {

                ref = true;

                if (orderProducts.quantity > orderProduct.quantity) {

                    const newOrderProduct = {

                        productId: orderProducts.id,

                        quantity: orderProducts.quantity - orderProduct.quantity,

                        orderId: orderProducts.orderId

                    }

                    return await crud.save('orderProducts', orderProduct.id, newOrderProduct)

                } else {

                    return await crud.remove('orderProducts', orderProduct.id);

                }

            }

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
