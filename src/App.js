import React from 'react';
import Contacts from './components/Contacts'
import './style.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAddressBook} from '@fortawesome/free-solid-svg-icons'

function App() {
    return (
        <>
            <div className="topBar">
                <div className="title">
                    <h1>Contacts</h1>
                    <FontAwesomeIcon icon={faAddressBook} size="2x"/>
                </div>
            </div>
            <div className="app">
                <Contacts/>
            </div>
        </>
    );
}

export default App;
