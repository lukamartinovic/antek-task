import React, {useState} from 'react';
import axios from 'axios';
import {useInput} from '../hooks/useInput'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserPlus} from '@fortawesome/free-solid-svg-icons'

function AddContact(props) {

    const [input, handleInput] = useInput();
    const [blurred, setBlurred] = useState({name: false, number: false});

    function handleBlurred(e){
        setBlurred({...blurred, [e.target.name]:true})
    }

    function postContact(e) {
        e.preventDefault();
        const {refetch} = props;
        axios.post('http://localhost:3000/post', {...input.inputData})
            .then(res => refetch())
            .catch(err => console.log(err.response))
    }

    return (
        <div className="addContact">
            <form className="addContactForm" noValidate>
                <div className="formInput">
                    <input value={input.inputData.name} required name="name" placeholder="Name" onChange={handleInput} onBlur={handleBlurred}/>
                    {(input.errors.name && blurred.name) && <label>Name is required</label>}
                    <input value={input.inputData.number} required name="number" placeholder="Number"
                           onChange={handleInput} onBlur={handleBlurred}/>
                    {(input.errors.number && blurred.number) && <label>Phone number is required</label>}
                    <input value={input.inputData.email} name="email" placeholder="Email" onChange={handleInput}/>
                </div>
                <button disabled={!input.valid} onClick={postContact}><FontAwesomeIcon icon={faUserPlus} size="3x"/>
                </button>
            </form>
        </div>
    );
};

export default AddContact;
