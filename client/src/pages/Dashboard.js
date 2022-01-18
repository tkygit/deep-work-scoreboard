import React, { useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

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

    const { loading, error, data: { getUserStats: userStats } = {} } = useQuery(GET_USER_STATS_QUERY);

    const getPercent = (currSeconds) => {
        const currHour = Math.floor(currSeconds / 3600);

        return (currHour / userStats.nextMilestoneHr) * 100;
    };

    const handleLogVisible = () => {
        setLogVisible(!logVisible);
    };

    return (
            <div>
                <Navbar/>
                <BodyContainer>
                { user && !loading ?
                    <>
                        <h3>Your total deep work time</h3>
                        <TimerStyles>
                        <div className="time-display">{convertToHrMins(userStats.totalDwSeconds)}</div>
                        <div className="progress-bar-container">
                            <p className="top-right-label">{userStats.nextMilestoneHr}h</p>
                            <div className="percentage-bar">
                                <ProgressBar percent={getPercent(userStats.totalDwSeconds)}/>
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

const GET_USER_STATS_QUERY = gql`
    query getUserStats {
        getUserStats {
            id,
            totalDwSeconds
            nextMilestoneHr
        }
    }
    `;

export default Dashboard;