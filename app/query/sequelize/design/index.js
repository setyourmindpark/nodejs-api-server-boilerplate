
// http://docs.sequelizejs.com/variable/index.html
// datatype document

module.exports = {
    
    // models 의 key 값이 model명이 된다.  

    models: {
        User: require('./models/User'),
        Memo: require('./models/Memo'),
        Tag: require('./models/Tag'),
        MemoTag: require('./models/MemoTag'),
        Common: require('./models/Common'),
        Constant: require('./models/Constant'),
        File: require('./models/File'),
        // ...        
    },

    // association define 
    // 관계에대한 정의는 모든 테이블에대한 관계를 한눈에 보는게 편하므로 이곳에서 아래와 같이 명시적으로 우선적어주고 associations 과같이 보기좋게 정의한다. 
    
    // User.hasMany(Memo, { foreignKey: 'userId', sourceKey: 'id', constraints: false });
    // Memo.hasMany(MemoTag, { foreignKey: 'memoId', sourceKey: 'id', constraints: false });
    // Memo.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', constraints: false });
    // Tag.hasMany(MemoTag, { foreignKey: 'tagId', sourceKey: 'id', constraints: false });
    // MemoTag.belongsTo(Memo, { foreignKey: 'memoId', targetKey: 'id', constraints: false });
    // MemoTag.belongsTo(Tag, { foreignKey: 'tagId', targetKey: 'id', constraints: false });

    associations: {
        User:       { hasMany:      [{ model: 'Memo',       config: { foreignKey: 'userId', sourceKey: 'id', constraints: false }}]},
        Memo:       { hasMany:      [{ model: 'MemoTag',    config: { foreignKey: 'memoId', sourceKey: 'id', constraints: false }}],
                      belongsTo:    [{ model: 'User',       config: { foreignKey: 'userId', targetKey: 'id', constraints: false }}]},
        Tag:        { hasMany:      [{ model: 'MemoTag',    config: { foreignKey: 'tagId',  sourceKey: 'id', constraints: false }}]},
        MemoTag:    { belongsTo:    [{ model: 'Memo',       config: { foreignKey: 'memoId', targetKey: 'id', constraints: false }}, 
                                     { model: 'Tag',        config: { foreignKey: 'tagId',  targetKey: 'id', constraints: false }}]},                                        
        
        // ...
    }
};