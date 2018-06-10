exports.createModules = createModules;

const mongoose = require('mongoose');
const baseTypes = config.base.db;
const Promise = require('bluebird');

async function createModules() {
    let mongoose1 = undefined;
    if (baseTypes.includes('mongodb')) {        
        const { user, password, host, port, database } = config.setting.db.mongodb;         
        mongoose1 = await createModule({ user, password, host, port, database });        
    }
    
    return {
        mongoose1: mongoose1,
        // ..
    }
}

async function createModule({ user, password, host, port, database }){    
    return await  mongoose.createConnection('mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + database);    
}