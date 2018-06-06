const mongoose = require('mongoose');
const baseTypes = config.base.db;

async function createModules() {
    let mongodb1 = undefined;
    if (baseTypes.includes('mongodb')) {        
        const { user, password, host, port, database } = config.setting.db.mongodb;       
        // ... 
        // working on it
    }

    return {
        mongodb1: mongodb1,
        // ..
    }
}

function createModule(){
    // working on it
}