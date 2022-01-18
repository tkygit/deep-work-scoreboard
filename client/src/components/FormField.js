import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Modal from 'react-modal';

import { ModalForm, ModalButton, ModalContainer} from './styles/Modal';
import { InputField, InputLabel } from './styles/Input';
import FormFieldStyles from './styles/FormFieldStyles';
import { UnderlineLink } from './styles/Link';
import { useForm , selectDropdown } from '../util/form';
import {
    GET_PROJECTS_QUERY, 
    GET_PROJECT_TYPES_QUERY, 
    GET_LOCATIONS_QUERY, 
    CREATE_PROJECT_MUTATION,
    CREATE_PROJECT_TYPE_MUTATION,
    CREATE_LOCATION_MUTATION
} from '../util/graphql'

function FormField(props) {

    const fieldType = props.type;
    var items;
    const [modalIsOpen, setIsOpen] = useState(false);

    const { data: { getProjects: projects } = {} } = useQuery(GET_PROJECTS_QUERY, {skip: fieldType !== "Project"});
    if (projects !== undefined) items = projects;
    const { data: { getProjectTypes: projectTypes } = {} } = useQuery(GET_PROJECT_TYPES_QUERY, {skip: fieldType !== "Project Type"});
    if (projectTypes !== undefined) items = projectTypes;
    const { data: { getLocations: locations } = {} } = useQuery(GET_LOCATIONS_QUERY, {skip: fieldType !== "Location"});
    if (locations !== undefined) items = locations;

    const openModal = () => { setIsOpen(true) };
    const closeModal = () => { setIsOpen(false) };

    const { onChange, onSubmit, values } = useForm(addItemCallback, { name: '' });

    const [createProject] = useMutation(CREATE_PROJECT_MUTATION, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_PROJECTS_QUERY
            });
            var projects = [...data.getProjects]
            projects = [result.data.createProject, ...data.getProjects];
            proxy.writeQuery({ query: GET_PROJECTS_QUERY, data: { getProjects: projects } });
            items = projects;
            values.name = '';
        },
        variables: values
    });

    const [createProjectType] = useMutation(CREATE_PROJECT_TYPE_MUTATION, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_PROJECT_TYPES_QUERY
            });
            var projectTypes = [...data.getProjectTypes]
            projectTypes = [result.data.createProjectType, ...data.getProjectTypes];
            proxy.writeQuery({ query: GET_PROJECT_TYPES_QUERY, data: { getProjectTypes: projectTypes } });
            items = projectTypes;
            values.name = '';
        },
        variables: values
    });

    const [createLocation] = useMutation(CREATE_LOCATION_MUTATION, {
        update(proxy, result) {
            const data = proxy.readQuery({
                query: GET_LOCATIONS_QUERY
            });
            var locations = [...data.getLocations]
            locations = [result.data.createLocation, ...data.getLocations];
            proxy.writeQuery({ query: GET_LOCATIONS_QUERY, data: { getLocations: locations } });
            items = locations;
            values.name = '';
        },
        variables: values
    });

    async function addItemCallback() {
        switch(fieldType) {
            case "Project":
                await createProject();
                break;
            case "Project Type":
                await createProjectType();
                break;
            case "Location":
                await createLocation();
                break;
            default:
                break;
        }
        closeModal();
        selectDropdown(fieldType + "Dropdown", items[0].id, items[0].name);
        props.onFieldUpdate(fieldType.toLowerCase().replace(" ", "_"), items[0].id);
    };

    return (
        <FormFieldStyles>
            { items !== undefined &&
                <>
                <label>{fieldType}</label>
                <select 
                    id={fieldType + "Dropdown"} 
                    name={fieldType.toLowerCase().replace(" ", "_")} 
                    onChange={props.onFieldChange}
                    defaultValue={props.defaultValue !== null ? props.defaultValue : "instruction"}
                    className={items.length > 0 ? "field-box" : "field-box field-box-empty"}
                >
                    { items.length > 0 ?
                    <option disabled hidden value="instruction">Select {fieldType.toLowerCase()}</option>
                    :
                    <option disabled hidden value="instruction">Add your first {fieldType.toLowerCase()} to get started</option> }
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <UnderlineLink onClick={openModal}>Add a new {fieldType.toLowerCase()} +</UnderlineLink>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={ModalContainer}
                >
                    <ModalForm onSubmit={onSubmit}>
                        <InputLabel>Add new {fieldType.toLowerCase()}</InputLabel>
                        <InputField type="text" name="name" placeholder={fieldType} value={values.name} onChange={onChange}></InputField>
                        <ModalButton type="submit">Create new {fieldType.toLowerCase()}</ModalButton>
                    </ModalForm>
                </Modal>
            </>
            }
        </FormFieldStyles>
    )
}

export default FormField;