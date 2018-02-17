const path = require('path');
const cfGraphql = require('cf-graphql');
const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

const port = process.env.PORT || 4000;
const spaceId = process.env.SPACE_ID;
const cdaToken = process.env.CDA_TOKEN;
const cmaToken = process.env.CMA_TOKEN;

const client = cfGraphql.createClient({spaceId, cdaToken, cmaToken});

function startServer (client, schema) {
  const app = express();
  app.use(cors());

  app.use('/client', express.static(path.join(__dirname, 'dist')));

  const ui = cfGraphql.helpers.graphiql({title: 'cf-graphql demo'});
  app.get('/', (_, res) => res.set(ui.headers).status(ui.statusCode).end(ui.body));

  const opts = {version: true, timeline: true, detailedErrors: false};
  const ext = cfGraphql.helpers.expressGraphqlExtension(client, schema, opts);
  app.use('/graphql', graphqlHTTP(ext));

  app.listen(port);
  console.log('Running a GraphQL server!');
  console.log(`You can access GraphiQL at localhost:${port}`);
  console.log(`You can use the GraphQL endpoint at localhost:${port}/graphql/`);
}

function fail (err) {
  console.log(err);
  process.exit(1);
}

client.getContentTypes()
	.then(cfGraphql.prepareSpaceGraph)
	.then(spaceGraph => {
	const names = spaceGraph.map(ct => ct.names.type).join(', ');
	console.log(`Contentful content types prepared: ${names}`);
	return spaceGraph;
	})
	.then(cfGraphql.createSchema)
	.then(schema => startServer(client, schema))
	.catch(fail);
