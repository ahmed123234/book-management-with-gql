const { graphql, } = require('graphql')

// The GraphQL schema
const typeDefs = `
    # Type Defs
    type Author {
        id: ID!
        name: String!
        age: Int!
        Books: [Book]
    }

    type Book {
       id: ID!
       title: String!
       genre: String!
       description: String
       author: Author
    }

    #Quires
    type query {
        Authors: [Author!]!
        Author($id: ID!): Author! 
        Books: [Book!]!
        Book($id: ID!): Book!
    }
    
    #Mutations
    type Mutation {
        createAuthor(name: String!, age: Int!): Author!
        createBook(title: String!, genre: String!, description: String!, authorId: ID!
        ): Book!
        updateBook(title: String!, genre: String!, description: String!): Book!
        deleteBook(id: ID!): Boolean!
    }
`

module.exports = { typeDefs }
