import { useState, useEffect } from "react";
import FormContact from './FormContact/FormContact'
import ContactList from "./ContactList/ContactList";
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';
import css from './App.module.css';

const KEY = 'contacts';

export const App =()=> {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  });

 
  
  useEffect(() => {
      localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);




  const handleFilterChange = event => {
   setFilter( event.target.value );
  };


  const handleAddContact = newContact => {
  
    const isExistingContact = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const  handleDeleteContact = contactId => {
  setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };



    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );


    return (
      <div className={css.wraper} >
        <h1>Phonebook</h1>
        <FormContact contacts={contacts} onAddContact={handleAddContact}/>

        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange}/>
        <ContactList contacts={filteredContacts}
        onDeleteContact={handleDeleteContact} />
      </div>
    )
  
}
App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};