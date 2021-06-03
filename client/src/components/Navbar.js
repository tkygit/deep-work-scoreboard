import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
//   const history = useHistory();

//   const handleLogin = async () => {
//     const userData = await githubLogin();
//     localStorage.setItem('userData', JSON.stringify(userData))
//     return userData.startDate ? history.push('/my-progress') : history.push('/get-started')
//   }

  return (   
    <NavStyles>
      <div className="bar">
        <a href="/"><img src="/logo.svg" alt="Deep Work Scoreboard"/></a>
        <div className="links-container">
          { !isLoggedIn 
            ? <>
                <ButtonLink>Login</ButtonLink>
                <ButtonLink>Create an account</ButtonLink>
              </>
            : <>
                <Button>Start a deep work session</Button>
                <ButtonLink>Ann Chovie</ButtonLink>
              </>
          }
        </div>
      </div>
    </NavStyles>
  )
}

export default Navbar
