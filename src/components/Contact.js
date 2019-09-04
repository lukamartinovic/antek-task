import React, {useState} from 'react';
import axios from 'axios';
import {useInput} from "../hooks/useInput";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCheck, faPen, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons'
import defaultProfilePic from '../images/defaultProfilePic.png'
import apiRoutes from "../api";

function Contact(props) {
    const {host, routes} = apiRoutes;
    const {number, name, email, id, refetch} = props;
    const [editing, setEditing] = useState(false);
    const [input, handleInput] = useInput({
        inputData: {name: name, email: email, number: number},
        valid: true,
        errors: {name: null, number: null}
    });

    function deleteContact() {
        axios.delete(host + routes.deleteEntry + id)
            .then(res => refetch())
            .catch(res => console.log(res.error))
    }

    function putEdit() {
        axios.put(host + routes.editEntry, {
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
                <span className="contactName">{name}</span>
                <span className="contactNumber">{number}</span>
                <span className="contactEmail">{email}</span>
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
                <input className={input.errors.name && "invalid"} name="name" value={input.inputData.name}
                       onChange={handleInput}/>
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
}

export default Contact;
