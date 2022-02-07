import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client';

import Navbar from '../components/Navbar'
import Button from '../components/styles/Button';
import AccountDetail from '../components/AccountDetail';
import ManageDeepWorkData from '../components/ManageDeepWorkData';
import BodyContainer from '../components/styles/BodyContainer'
import {
    REMOVE_USER_SESSIONS,
    REMOVE_USER_LOCATIONS,
    REMOVE_USER_PROJECT_TYPES,
    REMOVE_USER_PROJECTS,
    GET_ACCOUNT_DETAILS
} from '../util/graphql'
import { useForm } from '../util/form'
import { AuthContext } from '../context/auth';

const AccountStyles = styled.div`
    .button {
        display: inline-flex;
        width: 20rem;
        align-items: center;
        justify-content: center;
    }

    .save-button {
        margin: 3rem 3rem 0 0;
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

    const context = useContext(AuthContext);
    const { user, firstName, lastName } = useContext(AuthContext);
    const { loading, error, data: { getAccountDetails: accountDetails } = {} } = useQuery(GET_ACCOUNT_DETAILS);
    const [ detailsUpdated, setDetailsUpdated] = useState(false);



    const [removeSessions] = useMutation(REMOVE_USER_SESSIONS);
    const [removeLocations] = useMutation(REMOVE_USER_LOCATIONS);
    const [removeProjectTypes] = useMutation(REMOVE_USER_PROJECT_TYPES);
    const [removeProjects] = useMutation(REMOVE_USER_PROJECTS);
    const [removeUser] = useMutation(REMOVE_USER);

    const handleResetAccount = async () => {
        await removeSessions();
        await removeLocations();
        await removeProjectTypes();
        await removeProjects();
    }

    const handleDeleteAccount = async () => {
        await handleResetAccount();
        await removeUser();
    }

    const { onChange, onSubmit, values } = useForm(updateUserCallback, {
        firstName: null,
        lastName: null
      });
    
    const [updateUser] = useMutation(UPDATE_ACCOUNT_DETAILS, {
        update(proxy, result) {
            setDetailsUpdated(true)
            const updatedUser = result.data.updateUser
            proxy.writeQuery({ query: GET_ACCOUNT_DETAILS, data: { getAccountDetails: updatedUser } });
            context.updateDetails(user, updatedUser.firstName, updatedUser.lastName);
        },
        variables: values
    });

    function updateUserCallback() {
        updateUser()
    }

    return (
        <AccountStyles>
            <Navbar/>
            <BodyContainer>
            { accountDetails !== undefined ?
            <>
                <h3>My account</h3>
                <form onSubmit={onSubmit}>
                    <AccountDetail label="Email address" name="email" value={accountDetails.email} readOnly={true}/><span className="email-disclaimer">You are using your Google account to use this app. This cannot be changed.</span>
                    <AccountDetail label="First name" name="firstName" value={values.firstName === null ? accountDetails.firstName : values.firstName } readOnly={false} onChange={onChange}/>
                    <AccountDetail label="Last name" name="lastName" value={values.lastName === null ? accountDetails.lastName : values.lastName } readOnly={false} onChange={onChange}/>
                    <Button className="save-button button">Save my details</Button>{detailsUpdated && <span className="alert">Your details have been updated!</span>}
                </form>
                <ManageDeepWorkData/>
                <h4 className="subheading">Danger Zone</h4>
                <div className="button-wrapper"><Button className="reset-button button" onClick={handleResetAccount}>Reset data</Button><span className="alert warning">Warning! This will delete all your current deep work data.</span></div>
                <div className="button-wrapper"><Button className="delete-button button" onClick={handleDeleteAccount}>Delete Account</Button><span className="alert warning">Warning! This will delete your account and any associated data.</span></div>
            </>
            :
            <>
                <p>Please wait...</p>
            </>
            }
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

const UPDATE_ACCOUNT_DETAILS = gql ` 
    mutation updateUser($firstName: String!, $lastName: String!) {
        updateUser(accountDetails: { firstName: $firstName,  lastName: $lastName }) {
            email
            firstName
            lastName
        }
    }
`;

export default Account;