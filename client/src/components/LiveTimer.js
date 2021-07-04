import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from './styles/Button';
import { UnderlineLink } from './styles/Link';

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

    .progress-bar-container {
        padding-bottom: 5rem;
    }

    .timer-button {
        display: inline-block;
    }

`;

function LiveTimer(props) {

    const session = props.session.getSession;
    const [timer, setTimer] = useState(0);
    const [timerStart] = useState(Date.now());
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        setInterval(() => {
            setTimer(Date.now() - timerStart);
        }, 1000)
    }, [timerStart]);

    const displaySessionGoal = (timeGoal) => {
        const numHours = Math.floor(timeGoal / 3600);
        const numMinutes = Math.floor(timeGoal % 3600 / 60);

        if (numHours === 0) {
            return numMinutes.toString() + "m"
        } else if (numHours > 0 && numMinutes === 0) {
            return numHours.toString() + "h"
        } else {
            return numHours.toString() + "h " + numMinutes.toString() + "m"
        }
    };

    let seconds = ("0" + (Math.floor(timer / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timer / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timer / 3600000)).slice(-2);

    return (
        <TimerStyles>
            <h3>Elapsed deep work time</h3>
            <div className="timer">{hours}h {minutes}m {seconds}s</div>
            <div className="progress-bar-container">
                <p className="top-right-label">{displaySessionGoal(session.timeGoal)}</p>
                <div className="percentage-bar">
                    <div className="current-bar"></div>
                </div>
                <p className="bottom-right-label">Session Goal</p>
            </div>
            <Button className="timer-button">{isActive ? "Finish deep work session" : "Start session"}</Button>
            <UnderlineLink>{ isActive ? "Pause session" : "Resume session" }</UnderlineLink>
        </TimerStyles>
    );
}

export default LiveTimer;