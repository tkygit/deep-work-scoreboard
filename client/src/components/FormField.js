import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Modal from 'react-modal';

import { ModalForm, ModalLabel, ModalInput, ModalButton, ModalContainer} from './styles/Modal';
import FormFieldStyles from './styles/FormFieldStyles';
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

    switch(fieldType) {
        case "Project":
            const { data: { getProjects: projects } = {} } = useQuery(GET_PROJECTS_QUERY);
            items = projects;
            break;
        case "Project Type":
            const { data: { getProjectTypes: projectTypes } = {} } = useQuery(GET_PROJECT_TYPES_QUERY);
            items = projectTypes;
            break;
        case "Location":
            const { data: { getLocations: locations } = {} } = useQuery(GET_LOCATIONS_QUERY);
            items = locations;
            break;
    }

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

    function addItemCallback() {
        switch(fieldType) {
            case "Project":
                createProject();
                break;
            case "Project Type":
                createProjectType();
                break;
            case "Location":
                createLocation();
                break;
        }
        closeModal();
        selectDropdown(fieldType + "Dropdown", items[0]);
    };

    return (
        <FormFieldStyles>
            { items != undefined &&
                <>
                <label>{fieldType}</label>
                <select 
                    id={fieldType + "Dropdown"} 
                    name={fieldType.toLowerCase().replace(" ", "_")} 
                    onChange={props.onFieldChange}
                    defaultValue={"instruction"}
                    className="field-box"
                >
                    <option disabled hidden value="instruction">Select {fieldType.toLowerCase()}</option>
                    {items.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <p className="link-to-modal" onClick={openModal}>Add a new {fieldType.toLowerCase()} +</p>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={ModalContainer}
                >
                    <ModalForm onSubmit={onSubmit}>
                        <ModalLabel>Add new {fieldType.toLowerCase()}</ModalLabel>
                        <ModalInput type="text" name="name" placeholder={fieldType} value={values.name} onChange={onChange}></ModalInput>
                        <ModalButton type="submit">Create new {fieldType.toLowerCase()}</ModalButton>
                    </ModalForm>
                </Modal>
            </>
            }
        </FormFieldStyles>
    )
}

export default FormField;