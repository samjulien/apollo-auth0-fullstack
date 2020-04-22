const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./src/schema");
const { resolvers } = require("./src/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || "";
    console.log(token);
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
