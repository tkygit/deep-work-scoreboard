import styled from 'styled-components';

export const TextLink = styled.div`
    font-size: 1.6rem;
    color: white;
    margin: 0;
    cursor: pointer;
    font-weight: 400;
    text-decoration: none;
    padding: 1rem 0;
    margin-right: 7rem;
    display: flex;
    align-items: center;
    position: relative;
    background: none;
    border: 0; 
    @media (max-width: 700px) {
        font-size: 10px;
        padding: 0 10px;
    }
`;

export const UnderlineLink = styled.p`
    margin-left: 2rem;
    cursor: pointer;
    border-bottom: 0.1px solid white;
`;