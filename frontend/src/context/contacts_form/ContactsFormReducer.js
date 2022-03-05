import { EDIT_CONTACT } from '../types';

const ContactsFormReducer = (state, action) => {
  switch (action.type) {
    case EDIT_CONTACT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default ContactsFormReducer;