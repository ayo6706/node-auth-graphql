import gql from "graphql-tag";

export default gql`
  type User {
    id: ID!
    email: String!
    firstname: String!
    lastname: String!
    password: String!
  }

  type Mutation {
    signup(user: User): User
    login(email: String!, password: String!): User
  }

  type Query {
    users: [User!]!
  }
`;
