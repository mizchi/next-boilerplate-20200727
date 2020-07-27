import ApolloClient from "apollo-boost";
import { getAuth } from "./firebaseHelpers";

export function createGraphqlClient() {
  const client = new ApolloClient({
    uri: "/api/graphql",
    async request(operation) {
      const auth = getAuth();
      if (auth && auth.currentUser) {
        try {
          const token = await auth.currentUser.getIdToken(true);
          operation.setContext({
            headers: {
              authorization: token ? `Bearer ${token}` : "",
            },
          });
        } catch (err) {}
      }
    },
  });
  return client;
}
