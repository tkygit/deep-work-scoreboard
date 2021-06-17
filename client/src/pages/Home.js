import styled from 'styled-components'
import React from 'react';

import Navbar from '../components/Navbar'
import BodyContainer from '../components/styles/BodyContainer'

const HomepageStyles = styled.div`
`;


function Home() {
    return (
        <HomepageStyles>
            <Navbar/>
            <BodyContainer>
                <h1>Homepage</h1>
            </BodyContainer>
        </HomepageStyles>
    );
}

export default Home;