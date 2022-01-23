import React from 'react';
import styled from 'styled-components';

import { InputField, InputLabel } from '../components/styles/Input';

const AccountDetailStyles = styled.div`
    margin-top: 2rem;
    margin-bottom: ${({ReadOnly}) => 
        ReadOnly ? '0' : '2rem'
    };

    .account-input {
        color: ${props => props.theme.black};
        width: 30%;
    }

    .read-only {
        color: ${props => props.theme.grey};
        cursor: not-allowed;
        caret-color: transparent;
    }
`;

function AccountDetail(props) {

    return (
        <AccountDetailStyles ReadOnly={props.readOnly}>
            <InputLabel>{props.label}</InputLabel>
            { props.readOnly === true ?
                <InputField className="account-input read-only" type="text" name={props.name} value={props.value} readOnly/>
                :
                <InputField className="account-input" type="text" name={props.name} value={props.value} onChange={props.onChange}/>
            }
        </AccountDetailStyles>
    );
}

export default AccountDetail;