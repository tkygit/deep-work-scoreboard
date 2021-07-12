import gql from 'graphql-tag';

export const GET_PROJECTS_QUERY = gql`
{
    getProjects {
        id,
        name
    }
}
`;

export const GET_PROJECT_TYPES_QUERY = gql`
{
    getProjectTypes {
        id,
        name
    }
}
`;

export const GET_LOCATIONS_QUERY = gql`
{
    getLocations {
        id,
        name
    }
}
`;

export const CREATE_PROJECT_MUTATION = gql`
mutation createProject($name: String!) {
    createProject(name: $name) {
        id
        name
    }
}
`;

export const CREATE_PROJECT_TYPE_MUTATION = gql`
mutation createProjectType($name: String!) {
    createProjectType(name: $name) {
        id
        name
    }
}
`;

export const CREATE_LOCATION_MUTATION = gql`
mutation createLocation($name: String!) {
    createLocation(name: $name) {
        id
        name
    }
}
`;

export const GET_SESSION_QUERY = gql`
query getSession($id: ID!) {
    getSession(id: $id) {
        id,
        createdAt
        timeGoal
        project
        projectType
        location
    }
}
`;

export const GET_PROJECT_QUERY = gql`
query getProject($id: ID!) {
    getProject(id: $id) {
        id,
        name
        totalProjectTime
    }
}
`;

