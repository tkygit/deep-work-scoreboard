import gql from 'graphql-tag';

export const GET_PROJECTS_QUERY = gql`
query getProjects {
    getProjects {
        id,
        name
    }
}
`;

export const GET_PROJECT_TYPES_QUERY = gql`
query getProjectTypes {
    getProjectTypes {
        id,
        name
    }
}
`;

export const GET_LOCATIONS_QUERY = gql`
query getLocations {
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
        project {
            id
            name
        }
        projectType {
            name
        }
        location {
            name
        }
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

export const UPDATE_USER_LAST_SESSION = gql ` 
mutation updateLastSessionDetails ($project: ID!, $projectType: ID!, $location: ID!) { 
    updateLastSessionDetails(project: $project, projectType: $projectType, location: $location) {
        lastProject
    	lastProjectType
    	lastLocation
    }
}
`;

export const REMOVE_USER_SESSIONS = gql ` 
mutation removeUserSessions { 
    removeUserSessions {
        ok
    }
}
`;

export const REMOVE_USER_LOCATIONS = gql ` 
mutation removeUserLocations { 
    removeUserLocations {
        ok
    }
}
`;

export const REMOVE_USER_PROJECT_TYPES = gql ` 
mutation removeUserProjectTypes { 
    removeUserProjectTypes {
        ok
    }
}
`;

export const REMOVE_USER_PROJECTS = gql ` 
mutation removeUserProjects { 
    removeUserProjects {
        ok
    }
}
`;

export const GET_ACCOUNT_DETAILS = gql ` 
query getAccountDetails { 
    getAccountDetails {
        email,
        firstName,
        lastName
    }
}
`;