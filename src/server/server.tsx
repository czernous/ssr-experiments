import fastify from 'fastify'
import path from 'path';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import App from '../client/components/app'

const server = fastify({
  logger: true,

})

server.get('/', async (request, reply) => {
  const app = ReactDOMServer.renderToString(<App />)

  reply.type('text/html')
  return reply.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" type="image/png" href="/images/favicon.png">
        <title>Sneakers shop</title>
        <link href="/main.css" rel="stylesheet">
      </head>
      <body>
        <div id="mount">${app}</div>
      </body>
    </html>
  `)
});


server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})