import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  navy: '#000333',
  blue: '#94BDFE',
  black: '#06082B',
  grey: '#A8A8A8',
  red: '#C30000',
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
    font-size: 3.2rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 700;
  }
  h3 {
    font-size: 2.4rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 700;
  }
  h4 {
    font-size: 2rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    margin: 0;
  }
  .time-display {
    font-size: 15.5rem;
    font-family: 'IBM Plex Mono', mono;
  }
  strong {
    font-weight: 600;
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