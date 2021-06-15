import styled from 'styled-components'
import React from 'react';
import Navbar from '../components/Navbar'

const HomepageStyles = styled.div`
  .hero {
    padding: 10rem 0;
    width: 80%;
  }
`;


function Home() {
    return (
        <HomepageStyles>
            <Navbar/>
            <div className="hero">
                <h1>Homepage</h1>
            </div>
        </HomepageStyles>
    );
}

export default Home;