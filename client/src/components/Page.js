import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  navy: '#000333',
  blue: '#94BDFE',
  mobileWidth: '480px',
  tabletWidth: '768px',
  desktopWidth: '1024px',
  largeWidth: '1200px',
  pagePadding: '11rem 15rem 11rem 15rem'
};

const StyledPage = styled.div`
  color: white;
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    background-color: ${theme.navy};
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 5rem 6rem;
    font-size: 1.6rem;
    line-height: 1.5;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
  }
  a {
    cursor: pointer;
    color: white;
    font-weight: 700;
    &:hover {
      font-weight: 700;
      color: ${props => props.theme.blue};
    }
  }
  button {  
    font-family: 'IBM Plex Sans', sans-serif; 
    font-weight: 700;
    cursor: pointer;
    
    :focus {
      outline: none;
    }
  }
  p, h1, h2, h3 {
    margin: 0;
    padding: 0;
    display: inline-block;
  }
  h1 {
    font-size: 9rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    @media (max-width: ${props => props.theme.mobileWidth}) {
      font-size: 2rem;
    }
  }
  h2 {
    font-size: 4rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 700;
  }
  h3 {
    font-size: 2.8rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 700;
  }
  h4 {
    font-size: 2rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 700;
    margin: 0;
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          {this.props.children}
          <GlobalStyle />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;