import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onUpdate = (name, value) => {
        setValues({ ...values, [name]: value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        callback();
    };

    return {
        onChange,
        onUpdate,
        onSubmit,
        values
    };
};

export const selectDropdown = (id, valueId, valueName) => {
    var item = document.getElementById(id);
    item.value = valueId;
    item.name = valueName;
}