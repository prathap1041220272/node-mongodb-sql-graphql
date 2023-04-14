const { sgMail } = require('../lib/email-broker.library');

async function send(to, mailOptions, cc, bcc) {
    const defaultOptions = {
        from: 'veroc23789@dmsdmg.com',
        subject: 'Email From Rencontrer'
    };

    if (!to) {
        throw new Error('To Address Should Not Be Empty');
    }

    const message = Object.assign({}, defaultOptions, mailOptions, { to, cc, bcc });
    return await sgMail.send(message);
}

async function sendEmail(to, subject, body, cc, bcc) {
    return send(to, {
        html: body,
        subject: subject,
    }, cc, bcc);
}

module.exports = {
    send,
    sendEmail
};