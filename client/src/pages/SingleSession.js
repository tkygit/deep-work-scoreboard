import React, { useContext, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

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
    const [ stats, setStats ] = useState({});

    const { data: session } = useQuery(GET_SESSION_QUERY, {
        variables: {
            id: sessionId
        }
    });

    const [editSessionTime] = useMutation(EDIT_SESSION_TIME);
    const [addDwTime] = useMutation(ADD_DW_TIME_MUTATION);
    const [addProjectTime] = useMutation(ADD_PROJECT_TIME_MUTATION);

    const handleFinish = async (timeSeconds) => {
        // Update user's deep work tally
        const { data: updatedDwTime } = await addDwTime({ variables: { seconds: timeSeconds }});

        // Update project's deep work tally
        const { data: updatedProjectTime } = await addProjectTime({ variables: { project: session.getSession.project.id, seconds: timeSeconds }});

        // Update session stats
        const { data: totalSessionTime } = await editSessionTime({ variables: { session: session.getSession.id , seconds: timeSeconds }});

        setStats( {
            timeGoal: session.getSession.timeGoal,
            project: session.getSession.project.name,
            totalSessionTime: totalSessionTime.editSessionTime,
            totalDwTime: updatedDwTime.addDwTime,
            totalProjectTime: updatedProjectTime.addProjectTime
        })

        setisLive(false);
    }

    return (
        <div>
            <Navbar/>
            <BodyContainer>
                { (user && session) ?
                        (isLive) ?
                        <LiveTimer session={session} onFinish={handleFinish} />
                        :
                        <SessionStats stats={stats}/>
                    :
                    <>
                        <p>Please login</p>
                    </>
                }
            </BodyContainer>
        </div>
    );
}

const EDIT_SESSION_TIME = gql ` mutation editSessionTime ($session: ID!, $seconds: Int!) { editSessionTime(session: $session, seconds: $seconds) }`;
const ADD_DW_TIME_MUTATION = gql` mutation addDwTime($seconds: Int!) { addDwTime(seconds: $seconds) } `;
const ADD_PROJECT_TIME_MUTATION = gql` mutation addProjectTime($project: ID!, $seconds: Int!) { addProjectTime(project: $project, seconds: $seconds) } `;

export default SingleSession;