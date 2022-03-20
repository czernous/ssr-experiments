import fastify, { FastifyRequest } from 'fastify'
import fastifyStatic from 'fastify-static';
import fastifyHelmet from 'fastify-helmet';
import fastifyCompress from 'fastify-compress';
import path from 'path';
import routes from '../client/routes';
import { Provider } from 'inferno-redux';
import { Action, createStore } from 'redux';
import { renderToString } from 'inferno-server'
import metaReducer from '../client/reducers/metaReducer';
import { StaticRouter } from 'inferno-router';
import reducers from '../client/reducers';
import { renderFullPage } from './helpers';



const server = fastify({
  logger: true,

})


server.register(fastifyCompress, {
  global: true,
})

server.register(fastifyHelmet, {
  contentSecurityPolicy: false,
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

    const getPageName = (request: FastifyRequest) => {
      const route = routes.find(r => r.route === request.url);
      const name = route?.route === "/" ? 'home' : route?.route.replace('/', '');
      return name;
    }
    const page = getPageName(request)
    console.log("=== Requesting %s page ===", page);

    
    const store = createStore(reducers, {metaData: {pageTitle: 'SEVERSIDE', metaDescription: '', metaKeywords: ''}});
    const action: Action = { type: `GO_${getPageName(request)?.toUpperCase()}`}
    const updatedState = store.dispatch(action);
   
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={request.url} context={context}>
        </StaticRouter>
      </Provider>
    )


    const finalState = store.getState()
    reply.type('text/html')
    if (context.url) {
      return reply.redirect(context.url);
    }
    reply.send(renderFullPage(content, finalState));
  
  },
}))

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})