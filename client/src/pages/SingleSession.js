import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';

import Navbar from '../components/Navbar';
import BodyContainer from '../components/styles/BodyContainer';
import LiveTimer from '../components/LiveTimer';

import { AuthContext } from '../context/auth';
import { GET_SESSION_QUERY } from '../util/graphql';

function SingleSession(props) {

    const sessionId = props.match.params.sessionId;
    const { user } = useContext(AuthContext);

    const { data: getSession } = useQuery(GET_SESSION_QUERY, {
        variables: {
            id: sessionId
        }
    });

    return (
        <div>
            <Navbar/>
            <BodyContainer>
                { (user && getSession) ? 
                        <LiveTimer session={getSession}/>
                    :
                    <>
                        <p>Please login</p>
                    </>
                }
            </BodyContainer>
        </div>
    );
}

export default SingleSession;