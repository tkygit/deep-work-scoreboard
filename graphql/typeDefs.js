const gql = require('graphql-tag');

module.exports = gql`
type User {
    id: ID!
    email: String!
    googleId: String!
    firstName: String!
    lastName: String!
    totalDwMins: Int!
    nextMilestoneHr: Int!
    createdAt: String!
    token: String
}

input AuthInput {
    accessToken: String!
}

type Query {
    getUsers: [User]
}

type Mutation {
    authGoogle(input: AuthInput!): User!
}
`