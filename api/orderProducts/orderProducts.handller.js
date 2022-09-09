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

async function deletarOrderProducts(ordersProducts) {
    const orders = await buscarOrders();
    const listOrderProducts = await buscarOrderProducts();


    for (let idOrder of orders) {
        // console.log(idOrder);
        if (idOrder.status == "open") {
            // console.log(idOrder);
            // console.log(idOrder.Status);
            for (let orderExist of listOrderProducts) {
                // console.log(orderExist);
                // console.log(ordersProducts);
                if (orderExist.id === ordersProducts.id) {
                    // console.log(orderExist.id);
                    // console.log(ordersProducts.id);
                    if (ordersProducts.quantity > orderExist.quantity) {
                        const New = {
                            ProductId: orderExist.id,
                            Quantity: orderExist.Quantity - ordersProducts.Quantity,
                            OrderId: orderExist.OrderId
                        }
                        return await crud.save('orderProducts', ordersProducts.id, New);
                    } else {
                        return await crud.remove("orderProducts", ordersProducts.id);
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
