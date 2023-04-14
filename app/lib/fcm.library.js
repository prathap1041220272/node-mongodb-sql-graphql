/* eslint-disable no-undef */
const FCM = require('fcm-node');

const server_key = 'AAAADMgTirQ:APA91bHENgTcFfZe2zqIZeAEjHF4whRnkYH5noi8qTnc2YdTU3qsT8HuylxgYjKavqOl1_aVz68ZNLDn79M99ivA3mrcBbqnQxWD_H_y3Ur3Ppj8HU9xCpZ10pWjWI4WdhTufBllf0WV';
const fcm = new FCM(server_key);

async function fcmData(message) {
  // eslint-disable-next-line no-unused-vars
  fcm.send(message, (err, response) => {
    if (err) {
      console.log('Something has gone wrong !',err);
    } else {
      console.log('sent');
      return true;
    }
  });
}

module.exports = { fcmData };
