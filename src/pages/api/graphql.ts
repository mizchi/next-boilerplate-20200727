import "isomorphic-unfetch";

import { resolvers } from "../../server/graphqlResolver";
import { NextApiResponse, NextApiRequest } from "next";
import { ApolloServer } from "apollo-server-micro";
// @ts-ignore
import typeDefs from "../../../graphql/schema.graphql";
import { verifyIdToken } from "../../server/firebaseAdminHelpers";

const apolloServer = new ApolloServer({
  typeDefs,
  // @ts-ignore
  resolvers,
  async context(args) {
    const { req } = args;
    const idToken = getIdTokenFromReq(req);
    if (idToken != null) {
      const decoded = await verifyIdToken(idToken);
      return { idToken: decoded };
    }
    return { idToken: null, decoded: null };
  },
  // introspection: true,
});
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = apolloServer.createHandler({ path: "/api/graphql" });

function getIdTokenFromReq(req: NextApiRequest) {
  const idToken = req.headers["authorization"] as string;
  return idToken?.replace(/^Bearer (.*)/, "$1");
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return handler(req, res);
};
