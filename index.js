require('dotenv').config({ silent: true });
const express = require('express');
const logger = require('morgan');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the react-contact-form API')
});

app.post('/api/contact', (req, res) => {
  let data = req.body;
  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD
    }
  });

  let mailOptions = {
    from: data.email,
    to: process.env.SENDTO,
    subject: data.subject,
    html:`
      <h2>Information</h2>
      <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
      </ul>

      <h2>Message</h2>
      <p>${data.message}</p>
    `
  };

  smtpTransport.sendMail(mailOptions, (err, response) => {
    if(err) {
      console.log(err);
    } else {
      console.log('Message sent!');
    }
    smtpTransport.close();
    return res.send(err ? err : 'Message sent!');
  });
});

// On the client's gmail account, enable LSA apps (less secure apps)
// Go to the google account and unlock captcha (https://accounts.google.com/DisplayUnlockCaptcha)
// Sign in again in order to send mail (since we aren't using oauth)

const port = process.argv[2] || process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
