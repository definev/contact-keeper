import {
  ADD_CONTACT,
  CLEAR_CURRENT,
  DELETE_CONTACT,
  SET_CURRENT,
  UPDATE_CONTACT,
} from '../types';

const ContactsReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case DELETE_CONTACT:
      const id = action.payload;
      const contacts = state.contacts.filter((value) => value.id !== id);

      return {
        ...state,
        contacts,
      };
    case SET_CURRENT:
      const contact = action.payload;
      return {
        ...state,
        current: contact,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_CONTACT: {
      const { contact, newContact } = action.payload;
      const contacts = state.contacts;
      const index = contacts.findIndex((value) => value.id === contact.id);
      contacts[index] = newContact;
      return {
        ...state,
        contacts,
      };
    }
    default:
      break;
  }
};

export default ContactsReducer;
