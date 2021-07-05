import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';

import Navbar from '../components/Navbar';
import BodyContainer from '../components/styles/BodyContainer';
import LiveTimer from '../components/LiveTimer';
import SessionStats from '../components/SessionStats';

import { AuthContext } from '../context/auth';
import { GET_SESSION_QUERY } from '../util/graphql';

function SingleSession(props) {

    const sessionId = props.match.params.sessionId;
    const { user } = useContext(AuthContext);
    const [ isLive, setisLive ] = useState(true);

    const { data: getSession } = useQuery(GET_SESSION_QUERY, {
        variables: {
            id: sessionId
        }
    });

    const handleFinish = () => {
        setisLive(false);
    }

    return (
        <div>
            <Navbar/>
            <BodyContainer>
                { (user && getSession) ?
                        (isLive) ?
                        <LiveTimer session={getSession} onFinish={handleFinish} />
                        :
                        <SessionStats />
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