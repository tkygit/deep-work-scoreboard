import styled from 'styled-components'
import React from 'react';

import Navbar from '../components/Navbar'
import { UnderlineLink } from '../components/styles/Link';
import Button from '../components/styles/Button';
import BodyContainer from '../components/styles/BodyContainer'

const HomepageStyles = styled.div`
    .hero-heading {
        font-style: italic;
    }

    .heading-emphasis {
        border-bottom: 5px solid white;
    }

    .hero-subheading {
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 300;
    }

    .remove-margin {
        margin: 0;
    }

    .cta-button {
        margin: auto;
        margin-top: 4rem;
    }
`;

const HomepageSection = styled.section`
    margin-top: 8rem;
`;

const DetailContainer = styled.div`
    margin-top: 2rem;
    background-color: white;
    color: ${props => props.theme.black};
    padding: 4rem;

    .dictionary-pronunciation {
        font-weight: 300;
    }

    .screenshot {
        margin: auto;
        margin-top: 2rem;
    }
`;

const FooterStyles = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;

    .code-url {
        margin: 0;
        padding: 0;
        display: flex;
        justify-self: end;
      }
`;

function Home() {
    return (
        <HomepageStyles>
            <Navbar/>
            <BodyContainer>
                <h1 className="hero-heading">A <span className="heading-emphasis">digital artifact</span> of your deep work hour count</h1>
                <h3 className="hero-subheading">Inspired by Cal Newport’s <UnderlineLink className="remove-margin">Deep Work</UnderlineLink></h3>
                <HomepageSection>
                    <h2>What is deep work?</h2>
                    <DetailContainer>
                        <h3>deep work</h3>
                        <span className="dictionary-pronunciation">/di:p wə:k/</span>
                        <p>Professional activities performed in a state of distraction-free concentration that push your cognitive capabilities to their limit. These efforts create new value, improve your skill, and are hard to replicate.</p>
                    </DetailContainer>
                </HomepageSection>
                <HomepageSection>
                    <h2>How it works</h2>
                    <DetailContainer>
                        <p>Use this tool to keep track of the time you spend in deep work and celebrate time and project milestones.</p>
                        <img src="/dashboard.png" alt="Deep Work Scoreboard Dashboard" className="screenshot"/>
                    </DetailContainer>                 
                </HomepageSection>
                <Button className="cta-button">Create an account now</Button>
            </BodyContainer>
            <FooterStyles>
                    <div className="footer-msg">this is a project created by <a href="http://google.com">tky.</a></div>
                    <a href="https://github.com/tkygit/100-days-of-code" className="code-url">view source code</a>
            </FooterStyles>
        </HomepageStyles>
    );
}

export default Home;