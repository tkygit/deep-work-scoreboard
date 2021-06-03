import styled from 'styled-components';

const Button = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: ${props => props.theme.blue};
    border: none;
    color: white;
    padding: 1.5rem 4rem;
    font-size: 1.6rem;
`;

export default Button;
