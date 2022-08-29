const crud = require("../../crud");

async function cadastrarOrders(order){

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
    
    const finalOrder = await crud.save("orders", undefined, order);
    console.log("ok handller");
    return finalOrder;
}

module.exports = {
    cadastrarOrders
}