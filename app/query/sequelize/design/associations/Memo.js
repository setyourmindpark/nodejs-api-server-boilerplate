module.exports = {
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
}