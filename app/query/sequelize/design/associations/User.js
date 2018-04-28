module.exports = {
    User: {
        hasMany: [{
            model: 'Memo',
            config: { foreignKey: 'userId', sourceKey: 'id', constraints: false }
        }]
    }
}