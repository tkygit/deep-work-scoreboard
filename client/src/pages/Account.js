import styled from 'styled-components'
import React from 'react';

import Navbar from '../components/Navbar'
import BodyContainer from '../components/styles/BodyContainer'

const AccountStyles = styled.div`
`;


function Account() {
    return (
        <AccountStyles>
            <Navbar/>
            <BodyContainer>
                <h1>Account</h1>
            </BodyContainer>
        </AccountStyles>
    );
}

export default Account;