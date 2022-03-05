import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import ContactsContext from './ContactsContext';
import ContactsReducer from './ContactsReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  // eslint-disable-next-line
  FILTER_CONTACTS,
  // eslint-disable-next-line
  CLEAR_FILTER,
} from '../types';

const ContactsState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@gmail.com',
        phone: '555-555-5555',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Karen Williams',
        email: 'a@test.mail',
        phone: '555-555-5555',
        type: 'personal',
      },
    ],
    current: null,
  };
  const [state, dispatch] = useReducer(ContactsReducer, initialState);

  // Add contacts
  const addContact = (contact) => {
    contact.id = v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  const updateContact = (contact, newContact) => {
    dispatch({
      type: UPDATE_CONTACT,
      payload: {
        contact,
        newContact,
      },
    });
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts: state.contacts ?? initialState.contacts,
        current: state.current ?? initialState.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
      }}
    >
      {props.children}
    </ContactsContext.Provider>
  );
};

export default ContactsState;
