import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { GoogleLogin } from 'react-google-login';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../context/auth';
import { CREATE_PROJECT_MUTATION, CREATE_PROJECT_TYPE_MUTATION, CREATE_LOCATION_MUTATION,
         GET_PROJECTS_QUERY, GET_PROJECT_TYPES_QUERY, GET_LOCATIONS_QUERY } from '../util/graphql';

import styled from 'styled-components';
import Button from './styles/Button';

const NavStyles = styled.div`

    .bar {
        display: flex;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        @media (max-width: 1300px) {
        grid-template-columns: 1fr;
        justify-content: center;
        }
    }  

    .links-container {
        margin: 0;
        padding: 0;
        display: flex;
        justify-self: end;
    }

    a {
        font-weight: 400;
        text-decoration: none;
        padding: 1rem 0;
        padding-right: 7rem;
        display: flex;
        align-items: center;
        position: relative;
        background: none;
        border: 0; 
        @media (max-width: 700px) {
        font-size: 10px;
        padding: 0 10px;
        }
    }

    .account-link {
        padding-right: 1rem;
    }

    .icon {
        margin: auto 0;
    }
`;

function Navbar() {
    
    const context = useContext(AuthContext);
    const { user } = useContext(AuthContext);

    const [loggedOut, setLoggedOut] = useState(false)

    const [authGoogle] = useMutation(AUTH_GOOGLE, {
        update(_, { data: userData }) {
            context.login(userData.authGoogle);

            if ((new Date() - new Date(userData.authGoogle.createdAt)) < (5 * 60 * 6000)) {
                console.log("NEW USER CREATED")
                createProject({ variables: {name: "Default Project"} })
                createProjectType({ variables: {name: "Default Project Type"} })
                createLocation({ variables: {name: "Default Location"} })
            };
        },
        onError(err) {
            console.log(err);
        }
    });

    const [createProject] = useMutation(CREATE_PROJECT_MUTATION, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_PROJECTS_QUERY
            });
            var projects = [...data.getProjects]
            projects = [result.data.createProject, ...data.getProjects];
            proxy.writeQuery({ query: GET_PROJECTS_QUERY, data: { getProjects: projects } });

        }
    });

    const [createProjectType] = useMutation(CREATE_PROJECT_TYPE_MUTATION, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_PROJECT_TYPES_QUERY
            });
            var projectTypes = [...data.getProjectTypes]
            projectTypes = [result.data.createProjectType, ...data.getProjectTypes];
            proxy.writeQuery({ query: GET_PROJECT_TYPES_QUERY, data: { getProjectTypes: projectTypes } });
        }
    });

    const [createLocation] = useMutation(CREATE_LOCATION_MUTATION, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_LOCATIONS_QUERY
            });
            var locations = [...data.getLocations]
            locations = [result.data.createLocation, ...data.getLocations];
            proxy.writeQuery({ query: GET_LOCATIONS_QUERY, data: { getLocations: locations } });
        }
    });

    const handleLogin = googleData => {
        authGoogle({ variables: { accessToken: googleData.accessToken, expiresIn: googleData.tokenObj.expires_in } });
    };

    const handleLogout = () => {
        context.logout();
        setLoggedOut(true);
    }

    return (   
        <NavStyles>
            {loggedOut && <Redirect to='/'/>}
            <div className="bar">
                <a href={user ? "/dashboard" : "/"}><img src="/logo.svg" alt="Deep Work Scoreboard"/></a>
                <div className="links-container">
                { user ? 
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/session"><Button>Start a deep work session</Button></Link>
                        <Link to="/account" className="account-link">{user.firstName} {user.lastName}</Link>
                        <FontAwesomeIcon className="icon" icon={faSignOutAlt} onClick={handleLogout}/>
                    </>
                    :
                    <>
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Log in with Google"
                            onSuccess={handleLogin}
                            onFailure={handleLogin}
                            cookiePolicy={'single_host_origin'}
                        />
                    </>
                }
                </div>
            </div>
        </NavStyles>
    )
}

const AUTH_GOOGLE = gql`
    mutation authGoogle($accessToken: String!, $expiresIn: Int!) {
        authGoogle(input: { accessToken: $accessToken,  expiresIn: $expiresIn }) {
            id
            firstName
            lastName
            email
            totalDwSeconds
            nextMilestoneHr
            createdAt
            token
        }
    }
`;

export default Navbar
