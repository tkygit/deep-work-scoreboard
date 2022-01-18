
import styled from 'styled-components';

const FormFieldStyles = styled.div`

    margin: 2rem 0 4rem 0;

    label {
        display: block;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    
    input[type=number] {
      -moz-appearance: textfield;
    }

    select {
        width: 30%;
    }

    .field-box {
        background-color: white;
        color: ${props => props.theme.navy};
        margin-top: 1rem;
        display: inline-block;
        font: inherit;
        font-weight: 300;
        width: 30%;
        height: 5rem;
        padding: 1rem;
        position: relative;
    }

    .field-box-empty {
        opacity: 80%;
    }

    .number-field {
        width: 5.5rem;
    }

    .time-label {
        margin: 0 1rem;
    }
`;

export default FormFieldStyles;