
// association define 
// User.hasMany(Memo, { foreignKey: 'userId', sourceKey: 'id', constraints: false });
// Memo.hasMany(MemoTag, { foreignKey: 'memoId', sourceKey: 'id', constraints: false });
// Memo.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', constraints: false });
// Tag.hasMany(MemoTag, { foreignKey: 'tagId', sourceKey: 'id', constraints: false });
// MemoTag.belongsTo(Memo, { foreignKey: 'memoId', targetKey: 'id', constraints: false });
// MemoTag.belongsTo(Tag, { foreignKey: 'tagId', targetKey: 'id', constraints: false });

module.exports = {
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
