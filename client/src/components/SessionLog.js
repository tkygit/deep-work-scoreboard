import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { DateTime } from 'luxon';

import convertToHrMins from '../util/time';

const SessionLogStyles = styled.div`
    padding-top: 4rem;

    table {
        border-spacing: 1;
        border-collapse: collapse;
        border-style: hidden;
        overflow: hidden;
        width: 100%;
        margin: 0 auto;
        position: relative;
    }

    table * {
        position: relative;
    }

    table thead tr {
        text-transform: uppercase;
        text-align: left;
    }

    table th, td {
        border: 1px solid white;
    }

    table th {
        padding-bottom: 1rem;
        padding-left: 1rem;
    }

    table td {
        padding: 2rem 0 2rem 1rem;
    }
`;

function SessionLog() {

    const { data: { getSessions: sessions } = {} } = useQuery(GET_SESSIONS_QUERY);

    return (
        <SessionLogStyles>
            {sessions !== undefined ?
                <table>
                    <thead>
                        <tr className="table-head">
                            <th className="col-1">Date</th>
                            <th className="col-2">Start Time</th>
                            <th className="col-3">End Time</th>
                            <th className="col-4">Total Time</th>
                            <th className="col-5">Project</th>
                            <th className="col-6">Project Type</th>
                            <th className="col-7">Location</th>
                            <th className="col-8">End Tally</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session) => (
                            <tr key={session.id}>
                                <td className="col-1">{DateTime.fromISO(session.createdAt).toFormat("dd MMM yyyy")}</td>
                                <td className="col-2">{DateTime.fromISO(session.createdAt).toFormat("t")}</td>
                                <td className="col-3">{session.completedAt !== "" ? DateTime.fromISO(session.completedAt).toFormat("t") : "-"}</td>
                                <td className="col-4">{convertToHrMins(session.timeSeconds)}</td>
                                <td className="col-5">{session.project.name}</td>
                                <td className="col-6">{session.projectType.name}</td>
                                <td className="col-7">{session.location.name}</td>
                                <td className="col-8">{convertToHrMins(session.endTally)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                :
                <div>No sessions to show</div>
            }
        </SessionLogStyles>
    )
}

export const GET_SESSIONS_QUERY = gql`
query getSessions {
    getSessions {
        id
        createdAt
        completedAt
        timeSeconds
        project {
            name
        }
        projectType {
            name
        }
        location {
            name
        }
        endTally
    }
}
`;

export default SessionLog;