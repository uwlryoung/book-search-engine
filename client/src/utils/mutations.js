// TODO: LOGIN_USER will execute the loginUser mutation set up using Apollo Server ✅
// TODO: ADD_USER will execute the addUser mutation ✅
// TODO: SAVE_BOOK will execute the saveBook mutation ✅
// TODO: REMOVE_BOOK will execute the removeBook mutation ✅

import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookInput!){
  saveBook(bookData: $bookData){
    _id
    username
    email
    savedBooks {
      bookId
      authors
      image
      description
      title
      link
    }
  }
}
`;
// export const SAVE_BOOK = gql`
//   mutation saveBook($bookId: String!, $authors: [String!]!, $description: String!, $title: String, $image: String, $link: String){
//     saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link){
//       _id
//       username
//       email
//       bookCount
//       savedBooks
//     }
//   }
// `;
//! Or does the SAVE_BOOK need to have below intead? Since it returns a user, I believe it needs to be user fields
// bookId
// authors
// description
// title
// image
// link
//! Same for below too

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      username
    }
  }
`;

// _id
// username
// email
// bookCount
// savedBooks
