import React, {useState} from 'react';
import axios from 'axios';
import {useInput} from "../hooks/useInput";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faPen, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons'
import defaultProfilePic from '../images/defaultProfilePic.png'

function Contact(props) {

    const {number, name, email, id, refetch} = props;
    const [editing, setEditing] = useState(false);
    const [input, handleInput] = useInput({
        inputData: {name: name, email: email, number: number},
        valid: true,
        errors: {name: null, number: null}
    });

    function deleteContact() {
        axios.delete('http://localhost:3000/delete/' + id)
            .then(res => refetch())
            .catch(res => console.log(res.error))
    }

    function putEdit() {
        axios.put('http://localhost:3000/put', {
            id: id,
            name: input.inputData.name,
            email: input.inputData.email,
            number: input.inputData.number
        })
            .then(res => refetch())
            .catch(res => {
                console.log(res.body);
                debugger
            })
    }

    const contactInfo =
        <>
            <div className="contactInfo">
                {name}<br/>
                {number}<br/>
                {email}<br/>
            </div>
            <div className="contactButtons">
                <button onClick={deleteContact}><FontAwesomeIcon icon={faTrash}/></button>
                <button onClick={() => {
                    setEditing(!editing)
                }}><FontAwesomeIcon icon={faPen}/></button>


            </div>
        </>;

    const editContact =
        <>
            <div className="contactInfo">
                <input className={input.errors.name && "invalid"} name="name" value={input.inputData.name} onChange={handleInput}/>
                <input name="email" value={input.inputData.email} onChange={handleInput}/>
                <input name="number" value={input.inputData.number} onChange={handleInput}/>
            </div>
            <div className="contactButtons">
                <button disabled={!input.valid} onClick={() => {
                    setEditing(!editing);
                    putEdit()
                }}><FontAwesomeIcon icon={faCheck}/></button>
                <button onClick={() => {
                    setEditing(!editing)
                }}><FontAwesomeIcon icon={faTimes}/></button>

            </div>
        </>;

    return (
        <div className="contact">
            <div className="userIcon">
                <img alt="Contact" src={defaultProfilePic}/>
            </div>
            {!editing ? contactInfo : editContact}
        </div>
    );
};

export default Contact;
