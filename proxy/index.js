require('dotenv').config();

const express = require('express');
const request = require('request');

const PORT = process.env.PORT;
const app = express();

app.post('/api/auth', (req, res) => {
  const code = req.query.code;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const url = `https://github.com/login/oauth/access_token?code=${code}&client_id=${client_id}&client_secret=${client_secret}`;


  const headers = {
    Accept: 'application/json'
  };
  let status, body;

  request.post({ url, headers })
    .on('response', response => {
      status = response.statusCode;
    })
    .on('data', data => {
      body = JSON.parse(data);
    })
    .on('end', () => {
      res.status(status || 200).json(body);
    })
    .on('error', error => {
      res.status(error.status).send(error);
    });
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
