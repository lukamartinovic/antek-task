import React, {useEffect, useState} from 'react';
import {useRefetch} from '../hooks/useRefetch'
import axios from 'axios';
import Contact from './Contact'
import AddContact from "./AddContact";
import apiRoutes from "../api";

function Contacts() {
    const {host, routes} = apiRoutes;
    const [contacts, setContacts] = useState({});
    const [refetchStatus, refetch] = useRefetch();

    useEffect(() => {
        axios.get(host + routes.getAll)
            .then(res => setContacts(res.data))
            .catch(err => console.log(err))
    }, [refetchStatus, host, routes.getAll]);

    return (<>
            <AddContact
                refetch={refetch}
            />
            <div className="contacts">

                {contacts.length > 0 && contacts.map(contact =>
                    <Contact
                        name={contact.name}
                        email={contact.email}
                        number={contact.number}
                        key={contact.id}
                        id={contact.id}
                        refetch={refetch}
                    />
                )}
            </div>
        </>
    );
}

export default Contacts;