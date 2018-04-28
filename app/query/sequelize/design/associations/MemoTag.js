module.exports = {
    MemoTag: {
        belongsTo: [{
            model: 'Memo',
            config: { foreignKey: 'memoId', targetKey: 'id', constraints: false }
        }, {
            model: 'Tag',
            config: { foreignKey: 'tagId', targetKey: 'id', constraints: false }
        }]
    },
}