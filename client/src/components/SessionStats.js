import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from './styles/Button';
import { UnderlineLink } from './styles/Link';

import convertToHrMins from '../util/time';

const SessionStatsStyles = styled.div`
    .session-stats {
        margin-bottom: 4rem;
    }

    .stat {
        margin: 2rem 0;
    }

    .session-button {
        display: inline-block;
    }
`;

function SessionStats({ stats }) {

    const timePercent = () => {
        return Math.floor((stats.totalSessionTime / stats.timeGoal) * 100);
    }

    return (
        <SessionStatsStyles>
            <h3>You stayed focused for</h3>
            <div className="time-display">{convertToHrMins(stats.totalSessionTime)}</div>
            <div className="session-stats">
                <h4>SESSION STATS</h4>
                { stats.totalSessionTime >= stats.timeGoal ?
                <div className="stat">
                    Your goal was to stay focused for <strong>{convertToHrMins(stats.timeGoal)}</strong>. 
                    You beat this by <strong>{timePercent()} percent</strong>!
                </div> : <></>}
                <div className="stat">Your deep work scoreboard is now <strong>{convertToHrMins(stats.totalDwTime)}</strong>.</div>
                <div className="stat">You have spent <strong>{convertToHrMins(stats.totalProjectTime)}</strong> on <strong>{stats.project}</strong> project.</div>
            </div>
            <Link to="/session">
                <Button className="session-button">Start another deep work session</Button>
            </Link>
            <Link to="/dashboard">
                <UnderlineLink>Go back to my dashboard</UnderlineLink>
            </Link>
        </SessionStatsStyles>
    );
}

export default SessionStats;