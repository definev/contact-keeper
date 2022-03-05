import { useReducer } from 'react';
import { EDIT_CONTACT } from '../types';
import ContactsFormContext from './ContactsFormContext';
import ContactsFormReducer from './ContactsFormReducer';

const ContactsFormState = (props) => {
  const initState = {
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  };
  const [contact, dispatch] = useReducer(ContactsFormReducer);

  const setContact = (contact) => {
    dispatch({ type: EDIT_CONTACT, payload: contact });
  };

  return (
    <ContactsFormContext.Provider
      value={{
        contact: contact ?? initState,
        setContact,
      }}
    >
      {props.children}
    </ContactsFormContext.Provider>
  );
};

export default ContactsFormState;
