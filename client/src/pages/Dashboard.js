import React, { useContext, useState } from 'react';

import Navbar from '../components/Navbar';
import SessionLog from '../components/SessionLog';
import BodyContainer from '../components/styles/BodyContainer';
import { TimerStyles, ProgressBar } from '../components/styles/Timer';
import { UnderlineLink } from '../components/styles/Link';

import { AuthContext } from '../context/auth';
import convertToHrMins from '../util/time';

function Dashboard() {

    const { user } = useContext(AuthContext);
    const [ logVisible, setLogVisible ] = useState(false);

    const getPercent = (currSeconds) => {
        const currHour = Math.floor(currSeconds / 3600);

        return (currHour / user.nextMilestoneHr) * 100;
    };

    const handleLogVisible = () => {
        setLogVisible(!logVisible);
    };

    return (
            <div>
                <Navbar/>
                <BodyContainer>
                { user ?
                    <>
                        <h3>Your total deep work time</h3>
                        <TimerStyles>
                        <div className="time-display">{convertToHrMins(user.totalDwSeconds)}</div>
                        <div className="progress-bar-container">
                            <p className="top-right-label">{user.nextMilestoneHr}h</p>
                            <div className="percentage-bar">
                                <ProgressBar percent={getPercent(user.totalDwSeconds)}/>
                            </div>
                            <p className="bottom-right-label">Your next milestone</p>
                        </div>
                        <UnderlineLink style={{"marginLeft": "0"}} onClick = {handleLogVisible}>
                            { !logVisible ?
                                "View your deep work log" :
                                "Close your deep work log"
                            }
                        </UnderlineLink>
                        { logVisible ? <SessionLog /> : <></> }
                        </TimerStyles>
                    </>
                :
                    <>
                        <p>Please login</p>
                    </>
                }
                </BodyContainer>
            </div>
    );
}

export default Dashboard;