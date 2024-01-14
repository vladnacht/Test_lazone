import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { userResolver } from "../resolvers/user";
import { LoginResolver } from "../resolvers/login";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [userResolver, LoginResolver],
    validate: true,
  });
