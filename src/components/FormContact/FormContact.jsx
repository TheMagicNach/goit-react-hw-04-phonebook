import { useState  } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './FormContact.module.css';

const FormContact =({onAddContact })=> {
 const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const  handleChange = event => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

 const  handleSubmit = event => {
    event.preventDefault();
 
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };
      onAddContact(newContact);
      setName('');
      setNumber('');
  };
}

  
    return (
      <div className={css.container}>
        <form 
          onSubmit={handleSubmit}
        >
        
         <label htmlFor="name" className={css.label}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
            className={css.input}
          />
          <label htmlFor="number" className={css.label}>
            Number:
          </label>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
            className={css.input}
          />
            <br />
          <button type="submit" className={css.button}>
            Add Contact
          </button>
        </form>
      </div>

    )
  }



FormContact.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAddContact: PropTypes.func.isRequired,
};

export default FormContact;