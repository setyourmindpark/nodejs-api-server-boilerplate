
// http://docs.sequelizejs.com/variable/index.html
// datatype document

module.exports = {
    models: Object.assign(
        require('./models/User'),
        require('./models/Memo'),
        require('./models/Tag'),
        require('./models/MemoTag'),
        require('./models/Common'),
        require('./models/Constant'),
        require('./models/File'),
        // ...        
    ),

    // association define 
    // User.hasMany(Memo, { foreignKey: 'userId', sourceKey: 'id', constraints: false });
    // Memo.hasMany(MemoTag, { foreignKey: 'memoId', sourceKey: 'id', constraints: false });
    // Memo.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', constraints: false });
    // Tag.hasMany(MemoTag, { foreignKey: 'tagId', sourceKey: 'id', constraints: false });
    // MemoTag.belongsTo(Memo, { foreignKey: 'memoId', targetKey: 'id', constraints: false });
    // MemoTag.belongsTo(Tag, { foreignKey: 'tagId', targetKey: 'id', constraints: false });

    associations: Object.assign(
        require('./associations/User'),
        require('./associations/Memo'),
        require('./associations/Tag'),
        require('./associations/MemoTag'),
        // ...
    )
};
