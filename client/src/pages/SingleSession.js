import React, { useContext } from 'react';

import Navbar from '../components/Navbar';
import BodyContainer from '../components/styles/BodyContainer';

import { AuthContext } from '../context/auth';

function SingleSession() {

    const { user } = useContext(AuthContext);

    return (
        <div>
            <Navbar/>
            <BodyContainer>
                { user ? 
                    <div>
                        <h3>Elapsed deep work time</h3>
                    </div>
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