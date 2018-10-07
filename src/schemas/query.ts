import { GraphQLObjectType, GraphQLInt } from 'graphql';
import { fetchXML } from 'helpers/fetchXML';
import { AuthorType } from './author.type';

export const query = new GraphQLObjectType({
  name: 'Query',
  description: '...',
  fields: () => ({
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: (root, args) => fetchXML(args.id)
    }
  })
});
