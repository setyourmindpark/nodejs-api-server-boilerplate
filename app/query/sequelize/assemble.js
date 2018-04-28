const sqzSet = {
    models : {},
    associations : {}
};

module.exports = sqzSet;

require('./design/models/User');
require('./design/models/Memo');
require('./design/models/Tag');
require('./design/models/MemoTag');
require('./design/models/Common');
require('./design/models/Constant');
require('./design/models/File');

// association define 
// User.hasMany(Memo, { foreignKey: 'userId', sourceKey: 'id', constraints: false });
// Memo.hasMany(MemoTag, { foreignKey: 'memoId', sourceKey: 'id', constraints: false });
// Memo.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', constraints: false });
// Tag.hasMany(MemoTag, { foreignKey: 'tagId', sourceKey: 'id', constraints: false });
// MemoTag.belongsTo(Memo, { foreignKey: 'memoId', targetKey: 'id', constraints: false });
// MemoTag.belongsTo(Tag, { foreignKey: 'tagId', targetKey: 'id', constraints: false });

require('./design/associations');

// http://docs.sequelizejs.com/variable/index.html
// datatype document
