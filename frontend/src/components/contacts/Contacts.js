import React, { useContext } from 'react';
import ContactsContext from '../../context/contacts/ContactsContext';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactsContext = useContext(ContactsContext);
  const { contacts } = contactsContext;

  return (
    <div>
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default Contacts;
