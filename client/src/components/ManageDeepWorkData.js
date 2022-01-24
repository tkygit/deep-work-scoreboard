import React, { useState }  from 'react';
import styled from 'styled-components';
import {
    GET_PROJECTS_QUERY,
    GET_PROJECT_TYPES_QUERY,
    GET_LOCATIONS_QUERY
} from '../util/graphql'
import { useQuery, useMutation } from '@apollo/client';
import FormFieldStyles from './styles/FormFieldStyles';
import { UnderlineLink } from './styles/Link';

const ListDataStyles = styled.div`
    margin-top: 2rem;
    width: 30%;

    .action {
        float: right;
    }
`;

function ManageDeepWorkData(props) {

    const deepWorkData = [ "Projects", "Project Types", "Locations" ]


    const { data: { getProjects: projects } = {} } = useQuery(GET_PROJECTS_QUERY);
    const { data: { getProjectTypes: projectTypes } = {} } = useQuery(GET_PROJECT_TYPES_QUERY);
    const { data: { getLocations: locations } = {} } = useQuery(GET_LOCATIONS_QUERY);

    const [currData, setCurrData] = useState(projects)

    const handleSelectDeepWorkData = (e) => {
        const selected = e.target.value
        console.log("Fetch " + selected + " from database")

        if (selected === "Projects") {
            setCurrData(projects)
        } else if (selected === "Project Types") {
            console.log("Updated " + selected + " from database")
            setCurrData(projectTypes)
        } else if (selected === "Locations") {
            setCurrData(locations)
        }
    }

    return (
        <FormFieldStyles>
            <h4 className="subheading">Deep work data</h4>
            <label>Manage your projects, project types and locations.</label>
            <select 
                id="DeepWorkDataDropdown"
                name="deep-work-data"
                onChange={handleSelectDeepWorkData}
                defaultValue="Projects"
                className="field-box"
            >
                {deepWorkData.map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
            <ListDataStyles>
                { (projects !== undefined && projectTypes !== undefined && locations !== undefined) ?
                    currData.map((item) => (
                        <>
                        <p>{item.name}</p>
                        <div className="action">
                            <UnderlineLink>Edit</UnderlineLink>
                            <UnderlineLink>Delete</UnderlineLink>
                        </div>                  
                        </>
                    )) 
                : 
                <div>Loading...</div>}
            </ListDataStyles>
        </FormFieldStyles>
    );
}

export default ManageDeepWorkData;