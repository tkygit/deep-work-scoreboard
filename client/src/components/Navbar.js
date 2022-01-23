import React, { useContext, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GoogleLogin } from 'react-google-login';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../context/auth';
import { 
    CREATE_PROJECT_MUTATION, 
    CREATE_PROJECT_TYPE_MUTATION,
    CREATE_LOCATION_MUTATION,
    GET_PROJECTS_QUERY,
    GET_PROJECT_TYPES_QUERY,
    GET_LOCATIONS_QUERY,
    UPDATE_USER_LAST_SESSION,
    GET_ACCOUNT_DETAILS
} from '../util/graphql';

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
    const { user, firstName, lastName } = useContext(AuthContext);

    const [loggedOut, setLoggedOut] = useState(false)

    const [authGoogle] = useMutation(AUTH_GOOGLE, {
        async update(_, { data: userData }) {
            const accountDetails = userData.authGoogle
            context.login(accountDetails, accountDetails.firstName, accountDetails.lastName);

            if ((new Date() - new Date(userData.authGoogle.createdAt)) < (5 * 60 * 6000)) {
                const { data: { createProject: defaultProject } }  = await createProject({ variables: {name: "Default Project"} })
                const { data: { createProjectType: defaultProjectType } }= await createProjectType({ variables: {name: "Default Project Type"} })
                const { data: { createLocation: defaultLocation } } = await createLocation({ variables: {name: "Default Location"} })
                updateLastSessionDetails({ 
                    variables: {
                        project: defaultProject.id, 
                        projectType: defaultProjectType.id, 
                        location: defaultLocation.id
                    }
                })
            };

            setLoggedOut(false);
        },
        onError(err) {
            console.log(err);
        }
    });

    const [createProject] = useMutation(CREATE_PROJECT_MUTATION);

    const [createProjectType] = useMutation(CREATE_PROJECT_TYPE_MUTATION);

    const [createLocation] = useMutation(CREATE_LOCATION_MUTATION);

    const [updateLastSessionDetails] = useMutation(UPDATE_USER_LAST_SESSION);

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
                { (user && firstName && lastName) ? 
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/session"><Button>Start a deep work session</Button></Link>
                        <Link to="/account" className="account-link">{firstName} {lastName}</Link>
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
            createdAt
            token
        }
    }
`;

export default Navbar
