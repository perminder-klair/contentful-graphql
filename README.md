# Contentful GraphQL

Contentful GraphQL allows you to query your data stored in [Contentful](https://www.contentful.com/) with [GraphQL](http://graphql.org/). A schema and value resolvers are automatically generated out of an existing space.

Generated artifacts can be used with any node-based GraphQL server. The outcome of the project's main function call is an instance of the [`GraphQLSchema`](http://graphql.org/graphql-js/type/#graphqlschema) class.

### Run it locally

To run it, clone the repository, install dependencies and start a server:

```
npm install
npm start
```

Use <http://localhost:4000/graphql/> to query the data from within your application and navigate to <http://localhost:4000> to use the IDE (GraphiQL) for test-querying.

To use your own Contentful space, you have to provide:

- space ID
- CDA token
- CMA token

Please refer the ["Authentication" section](https://www.contentful.com/developers/docs/references/authentication/) of Contentful's documentation.

You can provide listed values with env variables:

```
SPACE_ID=some-space-id CDA_TOKEN=its-cda-token CMA_TOKEN=your-cma-token npm start
```