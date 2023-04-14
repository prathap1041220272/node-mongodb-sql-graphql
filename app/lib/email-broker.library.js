/* eslint-disable no-undef */
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

module.exports = {
    sgMail
};