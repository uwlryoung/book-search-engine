// TODO: Define the necessary Query and Mutation types: 
// - Query type: 
//    - me: Which returns a User type
// - Mutation type: 
//    - login: Accepts an email and password as parameters; returns an Auth type

//    - addUser: Accepts a username, email, and password as parameters; returns an Auth type.

//    - saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a User type. (Look into creating what's known as an input type to handle all of these parameters!)

//    - removeBook: Accepts a book's bookId as a parameter; returns a User type. 

// - User type: 
//    - _id
//    - username
//    - email
//    - bookCount
//    - savedBooks (this will be an array of the Book type)
// - Book type: 
//    - bookId (Not the _id, but the book's id value returned from Google's Book API)
//    - authors
//    - description
//    - title
//    - image
//    - link
// - Auth type: 
//    - token
//    - user (References the User type)

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutatation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: Array!, description: String!, title: String!, bookId: String!, image: String, link: String ): User
    removeBook(bookId: String!): User

  }

  type User {
    _id: ID!
    username: String!
    password: String!
    email: String!
    bookCount: int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: Array
    description: String!
    title: String
    image: String
    link: String


  }
`;

module.exports = typeDefs;