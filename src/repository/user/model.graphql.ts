import gql from "graphql-tag";

export default gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
  }

  type Query {
    users: [User!]!
  }
`;
