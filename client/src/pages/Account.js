import gql from 'graphql-tag';
import styled from 'styled-components'
import React from 'react';
import { useMutation } from '@apollo/client';

import Navbar from '../components/Navbar'
import Button from '../components/styles/Button';
import AccountDetail from '../components/AccountDetail';
import BodyContainer from '../components/styles/BodyContainer'
import {
    REMOVE_USER_SESSIONS,
    REMOVE_USER_LOCATIONS,
    REMOVE_USER_PROJECT_TYPES,
    REMOVE_USER_PROJECTS
} from '../util/graphql'

const AccountStyles = styled.div`
    .button {
        display: inline-flex;
        width: 20rem;
        align-items: center;
        justify-content: center;
    }

    .save-button {
        margin-top: 3rem;
    }

    .reset-button {
        background-color: white;
        color: ${props => props.theme.red};
        margin: 3rem 3rem 0 0;
    }

    .delete-button {
        display: inline-block;
        background-color: ${props => props.theme.red};
        margin: 3rem 3rem 0 0;
        width: 20rem;
    }

    .email-disclaimer {
        font-size: 13px;
    }

    .subheading {
        margin-top: 4rem;
    }

    .warning {
        opacity: 60%;
    }
`;


function Account() {

    const [removeSessions] = useMutation(REMOVE_USER_SESSIONS);
    const [removeLocation] = useMutation(REMOVE_USER_LOCATIONS);
    const [removeProjectTypes] = useMutation(REMOVE_USER_PROJECT_TYPES);
    const [removeProjects] = useMutation(REMOVE_USER_PROJECTS);
    const [removeUser] = useMutation(REMOVE_USER);

    const handleResetAccount = async () => {
        await removeSessions();
        await removeLocation();
        await removeProjectTypes();
        await removeProjects();
    }

    const handleDeleteAccount = async () => {
        await handleResetAccount();
        await removeUser();
    }

    return (
        <AccountStyles>
            <Navbar/>
            <BodyContainer>
                <h3>My account</h3>
                <form>
                    <AccountDetail label="Email address" value="teresakypham@gmail.com" readOnly={true}/><span className="email-disclaimer">You are using your Google account to use this app. This cannot be changed.</span>
                    <AccountDetail label="First name" value="Teresa" readOnly={false}/>
                    <AccountDetail label="Last name" value="Pham" readOnly={false}/>
                    <h4 className="subheading">Deep work data</h4>
                    {/* TO DO: List projects, project types and location with a delete button for each item */}
                    <Button className="save-button button">Save my details</Button>
                </form>
                <h4 className="subheading">Danger Zone</h4>
                <div className="button-wrapper"><Button className="reset-button button" onClick={handleResetAccount}>Reset data</Button><span className="warning">Warning! This will delete all your current deep work data.</span></div>
                <div className="button-wrapper"><Button className="delete-button button" onClick={handleDeleteAccount}>Delete Account</Button><span className="warning">Warning! This will delete your account and any associated data.</span></div>
            </BodyContainer>
        </AccountStyles>
    );
}

const REMOVE_USER = gql ` 
    mutation removeUser { 
        removeUser {
            ok
        }
    }
`;

export default Account;