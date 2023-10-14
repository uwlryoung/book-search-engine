const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutatation {
    login(email: String!, password: String!): Auth
    addUser(input: UserInput, password: String!): Auth
    saveBook(input: BookInput): User
    removeBook(bookId: String!): User

  }

  input UserInput {
    username: String!
    email: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: int
    savedBooks: [Book]
  }

  input BookInput {
    bookId: String!
    authors: [String!]!
    description: String!
    title: String
    image: String
    link: String
  }

  type Book {
    bookId: String!
    authors: [String!]!
    description: String!
    title: String
    image: String
    link: String
  }

  type Auth {
    token: String!
    user: User
  }
`;

module.exports = typeDefs;