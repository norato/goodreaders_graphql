import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { translate } from 'helpers/translate';
import { AuthorType } from './author.type';
import { fetchXML, Endpoints } from 'helpers/fetchXML';

export const BookType = new GraphQLObjectType({
  name: 'Book',
  description: '...',
  fields: () => ({
    title: {
      type: GraphQLString,
      args: {
        lang: { type: GraphQLString }
      },
      resolve: (xml, args) => {
        const title = xml.GoodreadsResponse.book[0].title[0];
        return args.lang ? translate(args.lang, title) : title;
      }
    },
    isbn: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.book[0].isbn[0]
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: xml => {
        const authors = xml.GoodreadsResponse.book[0].authors[0].author;
        const ids = authors.map(author => author.id[0]);
        return Promise.all(ids.map(id => fetchXML(Endpoints.Author, id)));
      }
    }
  })
});
