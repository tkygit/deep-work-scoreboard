import React, { useState, useEffect, useRef } from 'react';

import { TimerStyles, ProgressBar } from './styles/Timer';
import Button from './styles/Button';
import { UnderlineLink } from './styles/Link';

import convertToHrMins from '../util/time';

function LiveTimer(props) {

    const session = props.session.getSession;
    const [timer, setTimer] = useState(0);
    const [timerStart, setTimerStart] = useState(Date.now());
    const [isActive, setIsActive] = useState(true);
    const [goalReached, setGoalReached] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimer(Date.now() - timerStart);
        }, 1000);

        return () => {
            clearInterval(timerRef.current);
        }
    }, [timerStart]);

    const handlePause = () => {
        if (isActive) {
            setIsActive(false);
            clearInterval(timerRef.current);
        } else {
            setTimerStart(Date.now() - timer);
            setIsActive(true);
        }
    };

    const handleFinish = () => {
        const timeSeconds = Math.floor(timer/1000);
        props.onFinish(timeSeconds);
    };

    const getPercent = () => {
        const timeSec = timer/1000;
        let percent = (timeSec/session.timeGoal).toFixed(2) * 100;
        
        if (percent >= 100) {
            percent = 100;
            setGoalReached(true);
        }
        return percent;
    };

    let seconds = ("0" + (Math.floor(timer / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timer / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timer / 3600000)).slice(-2);

    return (
        <TimerStyles>
            <h3>Elapsed deep work time</h3>
            <div className="time-display">{hours}h {minutes}m {seconds}s</div>
            <div className="progress-bar-container">
                <p className="top-right-label">{convertToHrMins(session.timeGoal)}</p>
                <div className="percentage-bar">
                    <ProgressBar percent={getPercent}/>
                </div>
                <p className="bottom-right-label">{ goalReached ? "You reached your goal!" : "Session Goal" }</p>
            </div>
            <Button className="timer-button" onClick={handleFinish}>Finish deep work session</Button>
            <UnderlineLink onClick={handlePause}>{ isActive ? "Pause session" : "Resume session" }</UnderlineLink>
        </TimerStyles>
    );
}

export default LiveTimer;