import { useEffect, useState } from "react";
import personService from './services/persons'
import Notification from "./components/Notification";
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterQuery, setFilterQuery]= useState("")
  const[errorMessage, setErrorMessage] =useState("some error")
  useEffect(()=>{
    personService
    .getAll()
    .then(initialPersons=>{
      setPersons(initialPersons)
    })
  },[])
  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find(person=> person.name === newName)) {
      setErrorMessage(`${newName} is already added to phonebook`);
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.create(personObject)
      .then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))
        setNewName("");
        setNewNumber("");
      })
    const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook, replace the old one with a new one?`
    )
    if(confirmUpdate){
      personService.phoneUpdate(personObject)
      .then(returnedPerson=>{
        setNewNumber(newNumber.concat(returnedPerson))
      })
    }
      
    }
  };
  const removePerson =(id)=>{
    const personFound = persons.find(p=>id===p.id)
    if(window.confirm(`Delete ${personFound.name}`)){
      personService.deletePerson(id)
    .then(response=>{
      setPersons(persons.filter(p=>p.id!==response.id))
    })
    }
    
  }
  

  const handleChange=(setValue)=> {
    return (event) => setValue(event.target.value);
  }
  //setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
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
          <button type ="button" onClick={()=>removePerson(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
