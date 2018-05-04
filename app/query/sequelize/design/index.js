
// http://docs.sequelizejs.com/variable/index.html
// datatype document

module.exports = {
    
    // models 의 key 값이 model명이 된다.  

    models: {
        User: require('./models/User'),        
        Common: require('./models/Common'),
        System: require('./models/System'),
        File: require('./models/File'),
        // ...        
    },

    // association define 
    // 관계에대한 정의는 모든 테이블에대한 관계를 한눈에 보는게 편하므로 이곳에서 아래와 같이 명시적으로 우선적어주고 associations 과같이 보기좋게 정의한다.     
    
    // User.belongsTo(System, { foreignKey: 'typeCode', sourceKey: 'code', constraints: false, as: 'type' });
    // User.belongsTo(System, { foreignKey: 'deviceCode', sourceKey: 'code', constraints: false, as: 'device'  });
    // File.belongsTo(System, { foreignKey: 'typeCode', sourceKey: 'code', constraints: false, as: 'type'  });    

    // associations: {
    //     User:       { belongsTo:      [ { model: 'System',      config: { foreignKey: 'typeCode',    targetKey: 'code',   constraints: false, as: 'type'}},
    //                                     { model: 'System',      config: { foreignKey: 'deviceCode',  targetKey: 'code',   constraints: false, as: 'device' }}] },
    //     File:       { belongsTo:      [ { model: 'System',      config: { foreignKey: 'typeCode',    targetKey: 'code',   constraints: false, as: 'type' } }]},               
    //     // ...
    // },

    //http://jsbeautifier.org/
    associations: {
        User: {
            belongsTo: [{
                model: 'System',
                config: {
                    foreignKey: 'typeCode',
                    targetKey: 'code',
                    constraints: false,
                    as: 'type'
                }
            },
            {
                model: 'System',
                config: {
                    foreignKey: 'deviceCode',
                    targetKey: 'code',
                    constraints: false,
                    as: 'device'
                }
            }
            ]
        },
        File: {
            belongsTo: [{
                model: 'System',
                config: {
                    foreignKey: 'typeCode',
                    targetKey: 'code',
                    constraints: false,
                    as: 'type'
                }
            }]
        },
        // ...
    },
};