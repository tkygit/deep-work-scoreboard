const gql = require('graphql-tag');

module.exports = gql`
type User {
    id: ID!
    email: String!
    googleId: String!
    firstName: String!
    lastName: String!
    totalDwSeconds: Int!
    nextMilestoneHr: Int!
    createdAt: String!
    token: String
}

input AuthInput {
    accessToken: String!
}

type Project {
    id: ID!
    name: String!
    user: User!
    createdAt: String!
    totalProjectTime: Int!
}

type ProjectType {
    id: ID!
    name: String!
    user: User!
    createdAt: String!
}

type Location {
    id: ID!
    name: String!
    user: User!
    createdAt: String!
}

type Session {
    id: ID!
    project: Project!
    project_type: ProjectType!
    location: Location!
    timeGoal: Int
    user: User!
    createdAt: String!
    timeSeconds: Int
}

type Query {
    getUsers: [User]
}

type Mutation {
    authGoogle(input: AuthInput!): User!
    createProject(name: String!): Project!
    createProjectType(name: String!): ProjectType!
    createLocation(name: String!): Location!
    createSession(project: ID! , project_type: ID!, location: ID!, time_goal: Int!): Session!
    editSessionTime(session: ID!, seconds: Int!): Int!
    addProjectTime(project: ID!, seconds: Int!): Int!
    addDwTime(seconds: Int!): Int!
    updateNextMilestoneHr: Int!
}
`