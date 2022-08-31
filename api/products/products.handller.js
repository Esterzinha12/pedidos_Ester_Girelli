const crud = require("../../crud");

async function cadastrarProducts(product){
    return await crud.save("products", undefined, product);
};

async function buscarProducts() {
    return await crud.get("products");
};

async function buscarProductsId(id) {
    return await crud.getById("products", id);
};

async function deletarProducts(id) {
    return await crud.remove("products", id);
};


module.exports = {
    buscarProducts,
    buscarProductsId,
    cadastrarProducts,
    deletarProducts
}