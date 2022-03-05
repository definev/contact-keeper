import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NavBar = ({ title, icon }) => {
  return (
    <div className='navbar bg-primary'>
      <div className='row'>
        <FontAwesomeIcon className='m-1' icon={faIdCardAlt} size="2x" />
        <h1>{title}</h1>
      </div>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
      </div>
    </div>
  );
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

NavBar.defaultProps = {
  title: 'Contact Tracker',
  icon: 'fas fa-id-card-alt',
};

export default NavBar;
