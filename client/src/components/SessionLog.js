import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';

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

    return (
        <SessionLogStyles>
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
                    <tr>
                        <td className="col-1">03 May 2020</td>
                        <td className="col-2">09:03am</td>
                        <td className="col-3">10:05am</td>
                        <td className="col-4">1hr 2min</td>
                        <td className="col-5">Project Atlantica</td>
                        <td className="col-6">Portfolio</td>
                        <td className="col-7">Office</td>
                        <td className="col-8">26hr 45min</td>
                    </tr>
                </tbody>
            </table>
        </SessionLogStyles>
    )
}

export default SessionLog;