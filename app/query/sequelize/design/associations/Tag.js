module.exports = {
    Tag: {
        hasMany: [{
            model: 'MemoTag',
            config: { foreignKey: 'tagId', sourceKey: 'id', constraints: false }
        }]
    },
}