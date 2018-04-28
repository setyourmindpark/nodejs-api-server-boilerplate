const assemble = require('../assemble');

assemble.associations = {
    User: {
        hasMany: [{
            model: 'Memo',
            config: { foreignKey: 'userId', sourceKey: 'id', constraints: false }
        }]
    },
    Memo: {
        hasMany: [{
            model: 'MemoTag',
            config: { foreignKey: 'memoId', sourceKey: 'id', constraints: false }
        }],
        belongsTo: [{
            model: 'User',
            config: { foreignKey: 'userId', targetKey: 'id', constraints: false }
        }],
    },
    Tag: {
        hasMany: [{
            model: 'MemoTag',
            config: { foreignKey: 'tagId', sourceKey: 'id', constraints: false }
        }]
    },
    MemoTag: {
        belongsTo: [{
            model: 'Memo',
            config: { foreignKey: 'memoId', targetKey: 'id', constraints: false }
        }, {
            model: 'Tag',
            config: { foreignKey: 'tagId', targetKey: 'id', constraints: false }
        }]
    }
}
