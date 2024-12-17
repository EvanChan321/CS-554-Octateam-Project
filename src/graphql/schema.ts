import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    uid: ID!
    email: String!
    username: String
    profilePicture: String
    createdAt: String
  }

  type Game {
    gameId: ID!
    name: String!
    description: String
    genre: String
    createdAt: String
  }

  type Query {
    getUser(uid: ID!): User
    getAllUsers: [User]
    getAllGames: [Game]
    getGameById(gameId: ID!): Game
  }

  type Mutation {
    addUser(email: String!, username: String!): User
    addGame(gameId: ID!, name: String!, description: String, genre: String): Game
  }
`;
