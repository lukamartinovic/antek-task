import React, {useEffect, useState} from 'react';
import {useRefetch} from '../hooks/useRefetch'
import axios from 'axios';
import Contact from './Contact'
import AddContact from "./AddContact";

function Contacts() {
    const [contacts, setContacts] = useState({});
    const [refetchStatus, refetch] = useRefetch();

    useEffect(() => {
        axios.get("http://localhost:3000/get")
            .then(res => setContacts(res.data))
            .catch(err => console.log(err))
    }, [refetchStatus]);

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
};

export default Contacts;