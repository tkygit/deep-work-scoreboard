import React, { useState, useEffect, useRef } from 'react';

import { TimerStyles, ProgressBar } from './styles/Timer';
import Button from './styles/Button';
import { UnderlineLink } from './styles/Link';

import convertToHrMins from '../util/time';
import { loadTimerState, saveTimerState } from '../util/timer';

function LiveTimer(props) {

    const session = props.session.getSession;
    const savedTimer = loadTimerState(session.id);
    const [timer, setTimer] = useState(0);
    const [timerStart, setTimerStart] = useState(Date.now() - savedTimer);
    const [isActive, setIsActive] = useState(true);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            const timerState = Date.now() - timerStart
            setTimer(timerState);
            saveTimerState({
                id: session.id,
                time: timerState
            });
        }, 1000);

        return () => {
            clearInterval(timerRef.current);
        }
    }, [timerStart, session.id]);

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
        saveTimerState({
            id: session.id,
            time: 0
        });;
        const timeSeconds = Math.floor(timer/1000);
        props.onFinish(timeSeconds);
    };

    const getPercent = () => {
        const timeSec = timer/1000;
        let percent = (timeSec/session.timeGoal).toFixed(2) * 100;
        
        if (percent >= 100) {
            percent = 100;
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
                <p className="bottom-right-label">{getPercent() >= 100 ? "You reached your goal!" : "Session Goal"}</p>
            </div>
            <Button className="timer-button" onClick={handleFinish}>Finish deep work session</Button>
            <UnderlineLink onClick={handlePause}>{ isActive ? "Pause session" : "Resume session" }</UnderlineLink>
        </TimerStyles>
    );
}

export default LiveTimer;