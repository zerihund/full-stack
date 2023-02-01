import { useEffect, useState } from "react";
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery]= useState("")
  useEffect(()=>{
    axios.get("http://localhost:3008/persons").then(response=>{
      setPersons(response.data)
    })
  },[])
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
     // setNewName("");
      //setNewNumber("");
    }
  };

  const handleChange=(setValue)=> {
    return (event) => setValue(event.target.value);
  }
  //setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with<input value={filterQuery} onChange={handleChange(setFilterQuery)}/></p>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>
            name:{" "}
            <input value={newName} onChange={handleChange(setNewName)} />
          </div>
          <div>
            phone:
            <input
              value={newNumber}
              onChange={handleChange(setNewNumber)}
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
