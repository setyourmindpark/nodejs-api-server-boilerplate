const User = require('./design/User');
const Memo = require('./design/Memo');
const Tag = require('./design/Tag');
const MemoTag = require('./design/MemoTag');
const Common = require('./design/Common');
const Constant = require('./design/Constant');
const File = require('./design/File');

// http://docs.sequelizejs.com/variable/index.html
// datatype document

// association define 
// User.hasMany(Memo, { foreignKey: 'userId', sourceKey: 'id', constraints: false });
// Memo.hasMany(MemoTag, { foreignKey: 'memoId', sourceKey: 'id', constraints: false });
// Memo.belongsTo(User, { foreignKey: 'userId', targetKey: 'id', constraints: false });
// Tag.hasMany(MemoTag, { foreignKey: 'tagId', sourceKey: 'id', constraints: false });
// MemoTag.belongsTo(Memo, { foreignKey: 'memoId', targetKey: 'id', constraints: false });
// MemoTag.belongsTo(Tag, { foreignKey: 'tagId', targetKey: 'id', constraints: false });

module.exports = {
    models : Object.assign(
        User.model,
        Memo.model,
        Tag.model,
        MemoTag.model,
        Common.model,
        Constant.model,
        File.model
    ),
    associations : Object.assign(
        User.association,
        Memo.association,
        Tag.association,
        MemoTag.association,
        Common.association,
        Constant.association,
        File.association
    ) 
}