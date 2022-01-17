const http = require('http');
const twilio = require('twilio');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const phoneNumber = process.env.PHONE_NUMBER;
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

require('dotenv').config()
const client = require('twilio')(accountSid, authToken);

client.verify.services.create({friendlyName: 'My First Verify Service'})
                      .then(service => console.log(service.sid));

                      client.verify.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                      .verifications
                      .create({to: '+15017122661', channel: 'sms'})
                      .then(verification => console.log(verification.status));


client.messages
  .create({
    body: 'Hello from Node',
    to: '+12345678901', 
    from: process.env.TWILIO_PHONE_NUMBER, 
  })
  .then((message) => console.log(message.sid));

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});