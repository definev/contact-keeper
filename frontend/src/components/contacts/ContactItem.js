import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import ContactsContext from '../../context/contacts/ContactsContext';
import ContactsFormContext from '../../context/contacts_form/ContactsFormContext';

const ContactItem = ({ contact }) => {
  const contactsContext = useContext(ContactsContext);
  const contactsForm = useContext(ContactsFormContext);
  const { id, name, email, phone, type } = contact;
  const { deleteContact, clearCurrent } = contactsContext;
  const onEdit = () => {
    contactsContext.updateContact(contact, contactsForm.contact);
  };
  const onDelete = () => {
    deleteContact(id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={`badge ${
            type === 'personal' ? 'badge-success' : 'badge-primary'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <FontAwesomeIcon icon={faEnvelope} /> {email}
          </li>
        )}
        {phone && (
          <li>
            <FontAwesomeIcon icon={faPhoneAlt} /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={onEdit}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
