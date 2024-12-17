
import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: String!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    signup(email: String!, password: String!): String!
    login(email: String!, password: String!): String!
  }
`;


