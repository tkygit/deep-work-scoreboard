import React, { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';

import Navbar from '../components/Navbar';
import BodyContainer from '../components/styles/BodyContainer';
import FormField from '../components/FormField';

import Button from '../components/styles/Button';
import FormFieldStyles from '../components/styles/FormFieldStyles';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/form';
import { PromiseProvider } from 'mongoose';

function StartSession(props) {

    const { user } = useContext(AuthContext);
    const [ hourGoal, setHourTimeGoal ] = useState(0);
    const [ minGoal, setMinTimeGoal ] = useState(0);
    const [ timeGoal, setTimeGoal ] = useState(0);

    const timeGoalChange = (e) => {
        if (e.target.name == "hourGoal") {
            setHourTimeGoal(e.target.value * 3600);
        } else {
            setMinTimeGoal(e.target.value * 60);
        }
    };

    const { onChange, onSubmit, values } = useForm(startSessionCallback, { 
        'project': '',
        'project_type': '',
        'location': ''
    });

    function startSessionCallback() {
        setTimeGoal(hourGoal + minGoal);
        createSession();
    }

    const [createSession] = useMutation(CREATE_SESSION_MUTATION, {
        update(_, { data }) {
            console.log(data);
            props.history.push(`session/${data.createSession.id}`)
        },
        onError(err) {
            console.log(err);
        },
        variables: {
            project: values.project,
            projectType: values.project_type,
            location: values.location,
            timeGoal: timeGoal
        }
    });

    return (
        <div>
            <Navbar/>
            <BodyContainer>
                { user ? 
                    <form onSubmit={onSubmit}>
                        <h3>Start a new deep work session</h3>
                        <FormField type="Project" onFieldChange={onChange}/>
                        <FormField type="Project Type" onFieldChange={onChange}/>
                        <FormField type="Location" onFieldChange={onChange}/>
                        <FormFieldStyles>
                            <label>Time goal</label>
                            <input type="number" name="hourGoal" onChange={timeGoalChange} className="field-box number-field"></input><p className="time-label">hour/s</p>
                            <input type="number" name="minGoal" onChange={timeGoalChange} className="field-box number-field"></input><p className="time-label">minute/s</p>
                        </FormFieldStyles>
                        <Button>Start session now</Button>
                    </form>
                    :
                    <>
                        <p>Please login</p>
                    </>
                }
            </BodyContainer>
        </div>
    );
}

const CREATE_SESSION_MUTATION = gql`
    mutation createSession($project: ID!, $projectType: ID!, $location: ID!, $timeGoal: Int!) {
        createSession(project: $project, projectType: $projectType, location: $location, timeGoal: $timeGoal) {
            id
            createdAt
            timeGoal
        }
    }
`;

export default StartSession;