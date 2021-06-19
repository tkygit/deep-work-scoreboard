import styled from 'styled-components';

export const ModalForm = styled.form`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    `;

export const ModalLabel = styled.div`
    flex: 0 0 100%;
    font-size: 1.4rem;
    margin-bottom: 1rem;
`;

export const ModalInput = styled.input`
    padding: 1rem;
    font-size: 1.4rem;
    font: inherit;
    margin-right: 2rem;
    flex: 3;
`;

export const ModalButton = styled.button`
    justify-content: center;
    background-color: ${props => props.theme.blue};
    border: none;
    color: white;
    padding: 0 1rem;
    font-size: 1.4rem;
    flex: 2;
`;

export const ModalContainer = {
    content: {
        width: 'fit-content',
        height: 'fit-content',
        margin: 'auto'
    }
}
