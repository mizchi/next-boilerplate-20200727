import { MutationResolvers, QueryResolvers, Resolvers } from "./gen";

type Context = { idToken: { uid: string } | null };

const Query: QueryResolvers<Context> = {
  async currentUser(_parent, _args, context, _info) {
    return {
      id: context.idToken?.uid!,
    };
  },
};

const Mutation: MutationResolvers<Context> = {
  async dummy(_parent, _args, _context, _info) {
    if (_context.idToken?.uid == null) {
      throw new Error("need auth");
    }
    return {
      error: false,
    };
  },
};

export const resolvers: Resolvers<Context> = {
  Query,
  Mutation,
};
