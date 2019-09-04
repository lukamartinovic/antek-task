import {useState} from 'react';

const defaultState = {
    inputData: {
        name: "",
        number: "",
        email: ""
    },
    errors: {
        name: "Contact name is required",
        number: "Contact phone number is required"
    },
    valid: false
};

export function useInput(initialState = defaultState) {
    const [input, setInput] = useState(initialState);

    function handleInput(e) {
        const {name, value} = e.target;
        let errors = {...input.errors};
        let valid = input.valid;
        if (name === "name" || name === "number") {
            value === "" ?
                Object.assign(errors, {[name]: `contact ${name} is required`}) :
                Object.assign(errors, {[name]: null});
            valid = (errors.name === null && errors.number === null)
        }

        let newInput = {
            ...input,
            inputData: {...input.inputData, [name]: value},
            errors: errors,
            valid: valid
        };
        setInput(newInput);
    }


    return [input, handleInput];
}
