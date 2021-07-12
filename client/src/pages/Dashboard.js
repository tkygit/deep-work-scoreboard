import React from 'react';

import Navbar from '../components/Navbar';
import BodyContainer from '../components/styles/BodyContainer';

import { TimerStyles, ProgressBar } from '../components/styles/Timer';
import { UnderlineLink } from '../components/styles/Link';

function Dashboard() {
    return (
        <div>
            <Navbar/>
            <BodyContainer>
                <h3>Your total deep work time</h3>
                <TimerStyles>
                <div className="time-display">26h 45m</div>
                <div className="progress-bar-container">
                    <p className="top-right-label">50h</p>
                    <div className="percentage-bar">
                        <ProgressBar percent="60"/>
                    </div>
                    <p className="bottom-right-label">Your next milestone</p>
                </div>
                <UnderlineLink style={{"marginLeft": "0"}}>View your deep work log</UnderlineLink>
                </TimerStyles>
            </BodyContainer>
        </div>
    );
}

export default Dashboard;