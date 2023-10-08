import React, { useState } from 'react';
import { useGetContactsQuery, useCreateContactMutation, useDeleteContactMutation } from 'redux/contact';

function ContactsForm() {
  const { data: contacts, isError, isLoading, error } = useGetContactsQuery();
  const [createContact] = useCreateContactMutation();
  const [deleteContact] = useDeleteContactMutation();

  const [nameInput, setNameInput] = useState('');
  const [numberInput, setNumberInput] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);  

  const handleNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumberInput(event.target.value);
  };

  const handleFilteredContacts = (e) => {
    const filterValue = e.target.value.toLowerCase().trim();

    const filteredContacts = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filterValue) && filterValue !== '';
    });

    setFilteredContacts(filteredContacts);  
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = nameInput.trim();
    const number = numberInput.trim();

    const existingContact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());

    if (existingContact) {
      alert('Este contacto ya existe.');
    } else {
      createContact({
        name,
        number
      });

      setNameInput('');
      setNumberInput('');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Name</h2>
          <input type="text" name='name' placeholder='name' value={nameInput} onChange={handleNameChange} required />
          <h2>Number</h2>
          <input type="number" name='number' placeholder='number' value={numberInput} onChange={handleNumberChange} required />
          <br />
          <br />
          <button>Subir</button>
        </form>
      </div>

      <div>
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              <p>{contact.name}: {contact.number}</p>
              <button onClick={() => deleteContact(contact.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <form>
        <h2>Find contacts by name</h2>
        <input name='filter' type="text" placeholder="Filtrar contactos por nombre" onChange={handleFilteredContacts} />
        <ul>
          {filteredContacts.map(contact => (
            <li key={contact.id}>
              <p>{contact.name}: {contact.number}</p>
            </li>
          ))}
        </ul>
      </form>
    </div>
  )
}

export default ContactsForm;
