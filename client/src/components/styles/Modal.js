import styled from 'styled-components';

export const ModalForm = styled.form`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export const ModalButton = styled.button`
    justify-content: center;
    background-color: ${props => props.theme.blue};
    border: none;
    color: white;
    padding: 1rem;
    font-size: 1.4rem;

    .inline {
        flex: 2;
    }
`;

export const ModalContainer = {
    content: {
        width: 'fit-content',
        height: 'fit-content',
        margin: 'auto'
    }
}
