/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsBook } from './App.staled';
import { Component } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const startContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: startContacts,
    filter: '',
  };

  componentDidMount() {
    const saveContacts = localStorage.getItem('current-contacts');
    if (saveContacts !== null) {
      this.setState({
        contacts: JSON.parse(saveContacts),
      });
    }
  }

  componentDidUpdate(_, prevSate) {
    if (prevSate.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(
        'current-contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleAddContact = newContact => {
    const { contacts } = this.state;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return alert(`${newContact.name} is already in contacts`);
    }
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  handleChangeNameFilter = newName => {
    this.setState({
      filter: newName,
    });
  };

  handleGetVisibleContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  resetContacts = () => {
    if (
      confirm(
        'Are you sure you want to return Contacts to their starting positions?'
      )
    ) {
      this.setState({
        contacts: startContacts,
      });
    }
  };

  render() {
    const { filter } = this.state;
    const visibleContact = this.handleGetVisibleContact();

    return (
      <ContactsBook>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter nameFilter={filter} onChange={this.handleChangeNameFilter} />
        <ContactList
          onReset={this.resetContacts}
          items={visibleContact}
          onDelete={this.handleDeleteContact}
        />
      </ContactsBook>
    );
  }
}
