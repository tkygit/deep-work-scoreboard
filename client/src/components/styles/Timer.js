import styled from 'styled-components';

export const TimerStyles = styled.div`
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

export const ProgressBar = styled.div`
    display: inline-block;
    background-color: white;
    height: 3.6rem;
    width: ${props => props.percent}%;
`;