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
    token: String!
    lastProject: Project,
    lastProjectType: ProjectType,
    lastLocation: Location
}

input AuthInput {
    accessToken: String!
    expiresIn: Int!
}

type Project {
    id: ID!
    name: String!
    user: User!
    createdAt: String!
    totalProjectTime: Int!
    expireAt: String
}

type ProjectType {
    id: ID!
    name: String!
    user: User!
    createdAt: String!
    expireAt: String
}

type Location {
    id: ID!
    name: String!
    user: User!
    createdAt: String!
    expireAt: String
}

type Session {
    id: ID!
    project: Project
    projectType: ProjectType!
    location: Location!
    timeGoal: Int
    user: User!
    createdAt: String!
    completedAt: String!
    timeSeconds: Int
    endTally: Int
    expireAt: String
}

type SessionDetails {
    lastProject: ID!
    lastProjectType: ID!
    lastLocation: ID!
}

type AcknowledgeDeletion {
    ok: Boolean!
    nModified: Int!
}

input AccountDetails {
    firstName: String
    lastName: String
}

type Query {
    getLocations: [Location]
    getProjects(order: String): [Project]
    getProjectTypes: [ProjectType]
    getSessions: [Session]
    getLocation(id: ID!): Location
    getProject(id: ID!): Project
    getProjectType(id: ID!): ProjectType
    getSession(id: ID!): Session
    getUserStats: User
    getLastSessionDetails: User
    getAccountDetails: User
}

type Mutation {
    authGoogle(input: AuthInput!): User!
    createProject(name: String!): Project!
    createProjectType(name: String!): ProjectType!
    createLocation(name: String!): Location!
    createSession(project: ID! , projectType: ID!, location: ID!, timeGoal: Int!): Session!
    editSessionTime(session: ID!, seconds: Int!): Int!
    addProjectTime(project: ID!, seconds: Int!): Int!
    addDwTime(seconds: Int!): Int!
    updateNextMilestoneHr: Int!
    updateLastSessionDetails(project: ID!, projectType: ID!, location: ID!): SessionDetails!
    updateProjectName(project: ID!, name: String!): String!
    updateProjectTypeName(projectType: ID!, name: String!): String!
    updateLocationName(location: ID!, name: String!): String!
    updateUser(accountDetails: AccountDetails! ): User!
    removeProject(project: ID!): AcknowledgeDeletion!
    removeProjectType(projectType: ID!): AcknowledgeDeletion!
    removeLocation(location: ID!): AcknowledgeDeletion!
    removeUserSessions: AcknowledgeDeletion!
    removeUserProjects: AcknowledgeDeletion!
    removeUserProjectTypes: AcknowledgeDeletion!
    removeUserLocations: AcknowledgeDeletion!
    removeUser: AcknowledgeDeletion!
}
`