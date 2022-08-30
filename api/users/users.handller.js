const crud = require("../../crud");

async function cadastrarUser(user){
    return await crud.save("users", undefined, user);
    
};

async function buscarUser() {
    return await crud.get("users");
};

async function buscarUserId(id) {
    return await crud.getById("users", id);
};

async function deletarUser(id) {
    return await crud.remove("users", id);
};


module.exports = {
    buscarUser,
    buscarUserId,
    cadastrarUser,
    deletarUser
}