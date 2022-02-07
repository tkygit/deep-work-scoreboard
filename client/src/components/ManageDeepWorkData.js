import React, { useState }  from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { gql, useQuery, useMutation } from '@apollo/client';
import FormFieldStyles from './styles/FormFieldStyles';
import { InputLabel, InputField } from '../components/styles/Input';
import { UnderlineLink } from './styles/Link';
import { ModalForm, ModalButton, ModalContainer} from './styles/Modal';
import {
    GET_PROJECTS_QUERY,
    GET_PROJECT_TYPES_QUERY,
    GET_LOCATIONS_QUERY
} from '../util/graphql'
import { useModal } from '../util/modal';
import { useForm } from '../util/form';

const ListDataStyles = styled.div`
    width: 30%;

    .name {
        flex-grow: 1;
    }

    .item {
        display: flex;
        margin: 2rem 0;
    }
`;

const FormLabel = styled.div`
    flex: 0 0 100%;
    margin-bottom: 1rem;
`;

const CancelLink = styled.div`
    margin: auto;
    margin-left: 2rem;
    cursor: pointer;

    .text {
        border-bottom: 0.1px solid ${props => props.theme.navy};
    }
`;

function ManageDeepWorkData(props) {

    const deepWorkData = [ "Projects", "Project Types", "Locations" ]

    const [currData, setCurrData] = useState();
    const [currSelected, setCurrSelected] = useState("project")
    const [fieldToEdit, setFieldToEdit] = useState();
    const [fieldIdToEdit, setFieldIdToEdit] = useState();
    const [isEditModal, setIsEditModal] = useState(false);
    const { modalIsOpen, openModal, closeModal } = useModal();
    const { onChange, onSubmit, values } = useForm(editItemNameCallback, { name: null });

    const { data: { getProjects: projects } = {} } = useQuery(GET_PROJECTS_QUERY, {
        onCompleted: () => {
            setCurrData(projects)
        }
    });
    const { data: { getProjectTypes: projectTypes } = {} } = useQuery(GET_PROJECT_TYPES_QUERY);
    const { data: { getLocations: locations } = {} } = useQuery(GET_LOCATIONS_QUERY);

    const [updateProjectName] = useMutation(UPDATE_PROJECT_NAME, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_PROJECTS_QUERY
            });
            var projects = [...data.getProjects].filter(function(value, _){ 
                return value.id !== fieldIdToEdit;
            });
            const editedProject = {
                __typename: 'Project',
                id: fieldIdToEdit,
                name: result.data.updateProjectName
              }
            projects = [editedProject, ...projects];
            proxy.writeQuery({ query: GET_PROJECTS_QUERY, data: { getProjects: projects }});
            setCurrData(projects);
            values.name = null;
        },
        variables: {
            id: fieldIdToEdit,
            name: values.name
        }
    });

    const [updateProjectTypeName] = useMutation(UPDATE_PROJECT_TYPE_NAME, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_PROJECT_TYPES_QUERY
            });
            var projectTypes = [...data.getProjectTypes].filter(function(value, _){ 
                return value.id !== fieldIdToEdit;
            });
            const editedProjectType = {
                __typename: 'Project Types',
                id: fieldIdToEdit,
                name: result.data.updateProjectTypeName
              }
            projectTypes = [editedProjectType, ...projectTypes];
            proxy.writeQuery({ query: GET_PROJECT_TYPES_QUERY, data: { getProjectTypes: projectTypes }});
            setCurrData(projectTypes);
            values.name = null;
        },
        variables: {
            id: fieldIdToEdit,
            name: values.name
        }
    });

    const [updateLocationName] = useMutation(UPDATE_LOCATION_NAME, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_LOCATIONS_QUERY
            });
            var locations = [...data.getLocations].filter(function(value, _){ 
                return value.id !== fieldIdToEdit;
            });
            const editedLocation = {
                __typename: 'Location',
                id: fieldIdToEdit,
                name: result.data.updateLocationName
              }
            locations = [editedLocation, ...locations];
            proxy.writeQuery({ query: GET_LOCATIONS_QUERY, data: { getLocations: locations }});
            setCurrData(locations);
            values.name = null;
        },
        variables: {
            id: fieldIdToEdit,
            name: values.name
        }
    });

    const [removeProject] = useMutation(REMOVE_PROJECT, {
        update(proxy, _) {
            const data = proxy.readQuery({
                query: GET_PROJECTS_QUERY
            });
            const projects = [...data.getProjects].filter(function(value, _){ 
                return value.id !== fieldIdToEdit;
            });
            proxy.writeQuery({ query: GET_PROJECTS_QUERY, data: { getProjects: projects }});
            setCurrData(projects);
        },
        variables: {
            id: fieldIdToEdit
        }
    });

    const [removeProjectType] = useMutation(REMOVE_PROJECT_TYPE, {
        update(proxy, _) {
            const data = proxy.readQuery({
                query: GET_PROJECT_TYPES_QUERY
            });
            const projectTypes = [...data.getProjectTypes].filter(function(value, _){ 
                return value.id !== fieldIdToEdit;
            });
            proxy.writeQuery({ query: GET_PROJECT_TYPES_QUERY, data: { getProjectTypes: projectTypes }});
            setCurrData(projectTypes);
        },
        variables: {
            id: fieldIdToEdit
        }
    });

    const [removeLocation] = useMutation(REMOVE_LOCATION, {
        update(proxy, _) {
            const data = proxy.readQuery({
                query: GET_LOCATIONS_QUERY
            });
            const locations = [...data.getLocations].filter(function(value, _){ 
                return value.id !== fieldIdToEdit;
            });
            proxy.writeQuery({ query: GET_LOCATIONS_QUERY, data: { getLocations: locations }});
            setCurrData(locations);
        },
        variables: {
            id: fieldIdToEdit
        }
    });

    const handleSelectDeepWorkData = (e) => {
        const selected = e.target.value

        if (selected === "Projects") {
            setCurrData(projects);
            setCurrSelected("project");
        } else if (selected === "Project Types") {
            setCurrData(projectTypes);
            setCurrSelected("project type");
        } else if (selected === "Locations") {
            setCurrData(locations);
            setCurrSelected("location");
        }
    }

    const handleOpenModal = (data, isEdit) => {
        setIsEditModal(isEdit);
        setFieldIdToEdit(data.id);
        setFieldToEdit(data.name);
        openModal();
    }

    async function editItemNameCallback() {
        if (values.name != null) {
            switch(currSelected) {
                case "project":
                    await updateProjectName();
                    break;
                case "project type":
                    await updateProjectTypeName();
                    break;
                case "location":
                    await updateLocationName();
                    break;
                default:
                    break;
            }
        }
        closeModal();
    };

    const onConfirmation = async (e) => {
        e.preventDefault();
        switch(currSelected) {
            case "project":
                await removeProject();
                break;
            case "project type":
                await removeProjectType();
                break;
            case "location":
                await removeLocation();
                break;
            default:
                break;
        }
        closeModal();
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
                { (currData !== undefined) ?
                    (currData.length > 1) ? 
                        currData.map((data) => (
                            !data.name.includes("Default") &&
                                <div className="item" key={data.id}>
                                    <p className="name">{data.name}</p>
                                    <div className="action">
                                        <UnderlineLink onClick={() => handleOpenModal(data, true)}>Edit</UnderlineLink>
                                        <UnderlineLink onClick={() => handleOpenModal(data, false)}>Delete</UnderlineLink>
                                    </div>
                                </div>
                        ))
                    :
                    <div className="item">No custom {currSelected}s to show</div>
                : 
                <div className="item">Loading...</div>
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={ModalContainer}
            >
                { isEditModal ?
                <ModalForm onSubmit={onSubmit}>
                    <InputLabel>Edit {currSelected} name</InputLabel>
                    <InputField type="text" name="name" value={values.name === null ? fieldToEdit : values.name } onChange={onChange}></InputField>
                    <ModalButton type="submit" className="inline">Save</ModalButton>
                </ModalForm>
                :
                <ModalForm onSubmit={onConfirmation}>
                    <FormLabel>Are you sure you want to delete this item?</FormLabel>
                    <ModalButton type="submit">Confirm</ModalButton>
                    <CancelLink><p className="text" onClick={closeModal}>Cancel</p></CancelLink>
                </ModalForm>
                }
            </Modal>
            </ListDataStyles>
        </FormFieldStyles>
    );
}

const UPDATE_PROJECT_NAME = gql ` mutation updateProjectName ($id: ID!, $name: String!) { updateProjectName(project: $id, name: $name) }`;
const UPDATE_PROJECT_TYPE_NAME = gql ` mutation updateProjectTypeName ($id: ID!, $name: String!) { updateProjectTypeName(projectType: $id, name: $name) }`;
const UPDATE_LOCATION_NAME = gql ` mutation updateLocationName ($id: ID!, $name: String!) { updateLocationName(location: $id, name: $name) }`;
const REMOVE_PROJECT = gql ` mutation removeProject ($id: ID!) { removeProject(project: $id) { ok } }`;
const REMOVE_PROJECT_TYPE = gql ` mutation removeProjectType ($id: ID!) { removeProjectType(projectType: $id) { ok } }`;
const REMOVE_LOCATION = gql ` mutation removeLocation ($id: ID!) { removeLocation(location: $id) { ok } }`;

export default ManageDeepWorkData;