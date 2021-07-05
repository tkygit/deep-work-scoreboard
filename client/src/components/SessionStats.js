import React from 'react';
import styled from 'styled-components';

import Button from './styles/Button';
import { UnderlineLink } from './styles/Link';

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

function SessionStats() {

    return (
        <SessionStatsStyles>
            <h3>You stayed focused for</h3>
            <div className="time-display">1hr 12min</div>
            <div className="session-stats">
                <h4>SESSION STATS</h4>
                <div className="stat">Your goal was to stay focused for <strong>1 hour</strong>. You beat this by <strong>2 percent</strong>!</div>
                <div className="stat">Your deep work scoreboard is now <strong>27 hours 45 minutes</strong>.</div>
                <div className="stat">You have spent <strong>27 hours 45 minutes</strong> on <strong>Default</strong> project.</div>
            </div>
            <Button className="session-button">Start another deep work session</Button>
            <UnderlineLink>Go back to my dashboard</UnderlineLink>
        </SessionStatsStyles>
    );
}

export default SessionStats;