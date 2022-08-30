const crud = require("../../crud");

  const pedidos = await buscarOrders();
    for (let idPedido of pedidos) {
        if (!idOrders === idPedido) {
            return {
                error: "0001",
                message: "Não foi encontrado esse Pedido!"
            }
        }
    }

    const produtos = await buscarProducts();
    for (let idProduto of produtos) {
        if (!idProduct === idProduto) {
            return {
                error: "0001",
                message: "Não foi encontrado esse Pedido!"
            }
        }
    }