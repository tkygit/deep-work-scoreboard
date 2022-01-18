import React, { useContext } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import Navbar from '../components/Navbar';
import BodyContainer from '../components/styles/BodyContainer';
import FormField from '../components/FormField';

import Button from '../components/styles/Button';
import FormFieldStyles from '../components/styles/FormFieldStyles';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/form';
import { UPDATE_USER_LAST_SESSION } from '../util/graphql';


function StartSession(props) {

    const { user } = useContext(AuthContext);
    var hourGoal = 0;
    var minGoal = 0;

    const timeGoalChange = (e) => {
        if (e.target.name === "hourGoal") {
            hourGoal = e.target.value * 3600;
        } else {
            minGoal = e.target.value * 60;
        }
    };

    const { loading, error, data: { getLastSessionDetails: lastSession } = {} } = useQuery(GET_LAST_SESSION_DETAILS);

    const { onChange, onUpdate, onSubmit, values } = useForm(startSessionCallback, { 
        'project': lastSession ? lastSession.lastProject.id : "",
        'project_type': lastSession ? lastSession.lastProjectType.id : "",
        'location': lastSession ? lastSession.lastLocation.id : ""
    });

    function startSessionCallback() {
        createSession({ variables: {
            project: values.project,
            projectType: values.project_type,
            location: values.location,
            timeGoal: hourGoal + minGoal
        }});

        updateLastSessionDetails({ 
            variables: {
                project: values.project,
                projectType: values.project_type,
                location: values.location
            }
        })
    }

    const [createSession] = useMutation(CREATE_SESSION_MUTATION, {
        update(_, { data }) {
            props.history.push(`session/${data.createSession.id}`)
        },
        onError(err) {
            console.log(err);
        }
    });

    const [updateLastSessionDetails] = useMutation(UPDATE_USER_LAST_SESSION);

    return (
        <div>
            <Navbar/>
            <BodyContainer>
                { user ? 
                    <form onSubmit={onSubmit}>
                        <h3>Start a new deep work session</h3>
                        <FormField type="Project" onFieldChange={onChange} onFieldUpdate={onUpdate} defaultValue={lastSession ? lastSession.lastProject.id : null}/>
                        <FormField type="Project Type" onFieldChange={onChange} onFieldUpdate={onUpdate} defaultValue={lastSession ? lastSession.lastProjectType.id : null}/>
                        <FormField type="Location" onFieldChange={onChange} onFieldUpdate={onUpdate} defaultValue={lastSession ? lastSession.lastLocation.id : null}/>
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
        }
    }
`;

const GET_LAST_SESSION_DETAILS = gql`
    query getLastSessionDetails {
        getLastSessionDetails {
            lastProject {
                id
            }
            lastProjectType {
                id
            }
            lastLocation {
                id
            }
        }
    }
`;

export default StartSession;