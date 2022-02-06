import fastify from 'fastify'
import fastifyStatic from 'fastify-static';
import fastifyHelmet from 'fastify-helmet';
import fastifyCompress from 'fastify-compress';
import path from 'path';
import {renderToString} from 'inferno-server'
import App from '../client/components/app'


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
  const app = renderToString(<App />)
  reply.type('text/html')
  return reply.send(`
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
  `)
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})