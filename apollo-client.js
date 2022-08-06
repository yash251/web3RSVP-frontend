import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/yash251/subgraph-rsvp",
  cache: new InMemoryCache(),
});

export default client;