import React, { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

import styled from 'styled-components';
import Button from './styles/Button';
import ButtonLink from './styles/ButtonLink';

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
`;

function Navbar(props) {
    
    const context = useContext(AuthContext);
    const { user, logout } = useContext(AuthContext);

    const [authGoogle] = useMutation(AUTH_GOOGLE, {
        update(_, { data: userData }) {
            context.login(userData);
        },
        onError(err) {
            console.log(err);
        }
    });

    const handleLogin = googleData => {
        authGoogle({ variables: { accessToken: googleData.accessToken } });
    };

    return (   
        <NavStyles>
            <div className="bar">
                <a href="/"><img src="/logo.svg" alt="Deep Work Scoreboard"/></a>
                <div className="links-container">
                { user ? 
                    <>
                        <Link to="/session"><Button>Start a deep work session</Button></Link>
                        <Link to="/dashboard">{user.authGoogle.firstName} {user.authGoogle.lastName}</Link>
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
    mutation authGoogle($accessToken: String!) {
        authGoogle(input: { accessToken: $accessToken }) {
            token
            id
            firstName
            lastName
            email
            totalDwSeconds
            nextMilestoneHr
        }
    }
`;

export default Navbar
