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

type Project {
    name: String!
    user: User!
    createdAt: String!
}

type ProjectType {
    name: String!
    user: User!
    createdAt: String!
}

type Location {
    name: String!
    user: User!
    createdAt: String!
}

type Session {
    project: Project!
    project_type: ProjectType!
    location: Location!
    timeGoal: Int
    user: User!
    createdAt: String!
    completedAt: String
}

type Query {
    getUsers: [User]
}

type Mutation {
    authGoogle(input: AuthInput!): User!
    createProject(name: String!): Project!
    createProjectType(name: String!): ProjectType!
    createLocation(name: String!): Location!
    createSession(project: Project! , project_type: ProjectType!, location: Location!, timeGoal: Int!): Session!
}
`