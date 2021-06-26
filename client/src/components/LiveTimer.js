import React, { useState } from 'react';
import styled from 'styled-components';

const TimerStyles = styled.div`
    .timer {
        font-size: 15.5rem;
        font-family: 'IBM Plex Mono', mono;
    }

    .current-bar {
        display: inline-block;
        background-color: white;
        height: 3.6rem;
        width: 80%;
    }

    .percentage-bar {
        display: inline-block;
        border: solid white 3px;
        height: 4rem;
        width: 100%;
    }

    .top-right-label {
        float: right;
        margin-bottom: 5px;
    }

    .bottom-right-label {
        float: right;
        margin-top: 5px;
    }

`;

function LiveTimer(props) {

    const session = props.session.getSession;
    const [timer, setTimer] = useState("00h 31m 18s");

    const displaySessionGoal = (timeGoal) => {
        const numHours = Math.floor(timeGoal / 3600);
        const numMinutes = Math.floor(timeGoal % 3600 / 60);

        if (numHours == 0) {
            return numMinutes.toString() + "m"
        } else if (numHours > 0 && numMinutes == 0) {
            return numHours.toString() + "h"
        } else {
            return numHours.toString() + "h " + numMinutes.toString() + "m"
        }
    };

    return (
        <TimerStyles>
            <h3>Elapsed deep work time</h3>
            <div className="timer">{timer}</div>
            <div className="progress-bar-container">
                <p className="top-right-label">{displaySessionGoal(session.timeGoal)}</p>
                <div className="percentage-bar">
                    <div className="current-bar"></div>
                </div>
                <p className="bottom-right-label">Session Goal</p>
            </div>
        </TimerStyles>
    );
}

export default LiveTimer;