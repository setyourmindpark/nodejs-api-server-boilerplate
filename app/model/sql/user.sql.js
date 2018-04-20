const escape = require('mysql').escape;

exports.selectEmailCount = (model) => {
    return `
        SELECT
            COUNT(*) AS cnt
        FROM T_USER
        WHERE 
            EMAIL = ${escape(model.email)}               
        `
}

exports.insertUser = (model) => {
    return `
        INSERT INTO T_USER(
            ID,
            NAME,
            EMAIL,
            PASSWD
        )VALUES(
            NULL,
            ${escape(model.name)},
            ${escape(model.email)},
            -- password(${escape(model.passwd)})
            ${escape(model.passwd)}
        )
    `
}

exports.selectUserCount = (model) => {
    return `
        SELECT 
            COUNT(*) AS cnt
        FROM T_USER 
        WHERE EMAIL = ${escape(model.email)}
            AND PASSWD = ${escape(model.passwd)}
    `
}

exports.selectUserInfo = (model) => {
    return `
        SELECT 
            ID AS id,
            NAME AS name,
            EMAIL AS email
        FROM T_USER 
        WHERE 1=1 
        ${
        ((model) => {
            let cond = '';

            if (model.id) {
                cond += `AND ID = ${escape(model.id)}`
            } else {
                cond += `AND EMAIL = ${escape(model.email)}
                    AND PASSWD = ${escape(model.passwd)}`
            }
            return cond;
        })(model)

        }
    `
}

// exports.updateUserLoginStatus = (model) => {
//     return `
//         UPDATE T_USER
//             SET LOGIN_YN = ${escape(model.loginYn)}
//         WHERE ID = ${escape(model.id)}
//     `
// }
