import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import styles from './phonebook.module.css';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  filteredContact = ({ name }) => {
    const { contacts } = this.state;
    const normalizeName = name.toLowerCase();

    const dublicate = contacts.find(item => {
      const normalizedCurrentName = item.name.toLowerCase();
      return normalizedCurrentName === normalizeName;
    });

    return Boolean(dublicate);
  };

  addContact = data => {
    if (this.filteredContact(data)) {
      return alert(`Contact ${data.name} already in list`);
    }

    this.setState(({ contacts }) => {
      const newContacts = {
        id: nanoid(),
        ...data,
      };

      return {
        contacts: [...contacts, newContacts],
      };
    });
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(item => item.id !== id);

      return {
        contacts: newContacts,
      };
    });
  };

  changeFitler = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLowerCase();

      return normalizedName.includes(normalizedFilter);
    });

    return filteredContacts;
  }

  render() {
    const { addContact, deleteContact, changeFitler } = this;
    const contacts = this.getFilteredContacts();
    return (
      <div className={styles.wrapper}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <p className={styles.text}>Find contact by name</p>
        <input type="text" name="filter" onChange={changeFitler} className={styles.filter} />
        {/* <Filter /> */}
        <ContactList items={contacts} deleteContact={deleteContact} />
      </div>
    );
  }
}

export default Phonebook;
