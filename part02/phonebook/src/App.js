import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-12345", id: "1" },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery]= useState("")
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(person=> person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (setValue) => (event) =>
    setValue(event.target.value);
  //setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with<input value={filterQuery} onChange={handleNameChange(setFilterQuery)}/></p>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>
            name:{" "}
            <input value={newName} onChange={handleNameChange(setNewName)} />
          </div>
          <div>
            phone:
            <input
              value={newNumber}
              onChange={handleNameChange(setNewNumber)}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person=>person.name.toLowerCase().includes(filterQuery)).map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
