
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
    associations: require('./associations')
};
