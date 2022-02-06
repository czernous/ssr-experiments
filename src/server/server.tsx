import fastify from 'fastify'
import fastifyStatic from 'fastify-static';
import fastifyHelmet from 'fastify-helmet';
import fastifyCompress from 'fastify-compress';
import path from 'path';
import {renderToString} from 'inferno-server'
import { StaticRouter } from 'inferno-router';
import Html from '../client/components/Html';
import routes from '../client/routes';


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



routes.forEach(route => server.route({
  method: 'GET',
  url: route.route,
  schema: {
    response: {
      200: {
        type: 'string'
      }
    }
  },
  handler: async (request, reply) => {
    let context: any = {}
    const content = renderToString(
      <StaticRouter location={request.url} context={context}>
        <Html children={''} />
      </StaticRouter>
    )
    reply.type('text/html')
    if (context.url) {
      return reply.redirect(context.url);
    }
    reply.send('<!DOCTYPE html>\n' + content);
  
  },
}))

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})