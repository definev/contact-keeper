import React from 'react';
import ContactsFormState from '../../context/contacts_form/ContactsFormState';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';

const Home = () => {
  return (
    <ContactsFormState>
      <div className='container grid-2'>
        <ContactForm />
        <Contacts />
      </div>
    </ContactsFormState>
  );
};

export default Home;
