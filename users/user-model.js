module.exports = {
    all,
    insert,
    remove
}

const db = require("../data/dbConfig");

function all(){
    return db("users");
}

function insert(data){
    return db("users").insert(data, "id").then(id => {
        return db("users").where({id: id[0]}).first();
    });
}

function remove(id){
    return db("users").where({id}).del();
}