exports.sync = sync;

const { models, associations } = reqlib('/app/query/sequelize/blueprint');

async function sync(sequelizeModule){
    const sqzModels = {};
    for (let model in models) {                     // model define
        const { defaultPrimaryKey, modelSet } = models[model];
        const { tableName, define, config } = modelSet;
        const defineModel = sequelizeModule.define(
            tableName,
            define,
            config
        );
        if (!defaultPrimaryKey) {
            defineModel.removeAttribute('id');
        }
        sqzModels[model] = defineModel;
    }

    for (let association in associations) {           // association define
        const { hasMany, hasOne, belongsTo } = associations[association];    // belongsToMany는 사용하지않을예정.

        if (hasMany) {
            hasMany.forEach(({ model, config }) => {
                sqzModels[association].hasMany(sqzModels[model], config)
            });
        }

        if (hasOne) {
            hasOne.forEach(({ model, config }) => {
                sqzModels[association].hasOne(sqzModels[model], config)
            });
        }

        if (belongsTo) {
            belongsTo.forEach(({ model, config }) => {
                sqzModels[association].belongsTo(sqzModels[model], config)
            });
        }
    }
    await sequelizeModule.sync();
    sequelizeModule.models = sqzModels;
    
    return sequelizeModule;
}