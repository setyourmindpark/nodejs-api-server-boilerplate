
exports.send = send;

const nodemailer = require('nodemailer');
const config = reqlib('/config');
const { service, user, passwd, from } = config.setting.sender.mail;
const smtpTransport = nodemailer.createTransport({
    service: service,
    auth: {
        user: user,
        pass: passwd
    }
});

async function send({ to, subject, text, html }){
    try {
        const options = { from: from, to: to, subject: subject };
        if(text) options.text = text;
        else if(html) options.html = html;
        else if (attachments) options.attachments = attachments;        

        await smtpTransport.sendMail(options);
        smtpTransport.close();
    } catch (err) {
        throw err;
    }    
}
