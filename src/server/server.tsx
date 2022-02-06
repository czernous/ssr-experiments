import fastify from 'fastify'
import fastifyStatic from 'fastify-static';
import fastifyHelmet from 'fastify-helmet';
import fastifyCompress from 'fastify-compress';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import {StaticRouter} from 'react-router-dom/server'
import App from '../client/app'


const server = fastify({
  logger: true,

})

server.register(fastifyCompress, {
  global: true,
})

server.register(fastifyHelmet, {
  contentSecurityPolicy: true,
  crossOriginResourcePolicy: true,
  xssFilter: true
})


server.register(fastifyStatic, {
  root: path.join(__dirname, 'static')
})



server.get('/', async (request, reply) => {
  console.log('REQUESTER URL IS:', request.url);

  const app = ReactDOMServer.renderToString(
    
    <StaticRouter location={request.url}>
      <App />
    </StaticRouter>
  )
  const renderedHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="shortcut icon" type="image/png" href="/images/favicon.png">
      <title>SSR example</title>
    </head>
    <body>
      <div id="root">${app}</div>
      <script src="client.js" defer></script>
    </body>
  </html>
`
  reply.type('text/html')
  return reply.send(renderedHtml)
});



server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})