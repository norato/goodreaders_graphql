import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { BookType } from './book.type';
import { fetchXML, Endpoints } from 'helpers/fetchXML';

export const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: xml => xml.GoodreadsResponse.author[0].name[0]
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: xml => {
        const ids = xml.GoodreadsResponse.author[0].books[0].book.map(
          book => book.id[0]._
        );
        return Promise.all(ids.map(id => fetchXML(Endpoints.Book, id)));
      }
    }
  })
});
