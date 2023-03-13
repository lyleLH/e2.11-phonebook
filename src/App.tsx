import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise",response.data)
      setPersons(response.data)
    });
  };
  useEffect(hook, []);

  const [newName, setNewName] = useState("new name");
  const [newNumber, setNewNumber] = useState("new number");
  const [keyword, setKeyword] = useState("");

  const newNameInput = (event: { target: { value: any } }) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const newNumberInput = (event: any) => {
    setNewNumber(event.target.value);
  };

  const keywordsInput = (event: any) => {
    const tKeyword = event.target.value;
    setKeyword(tKeyword);
  };

  const filteredPersons = (keywordIn: string) => {
    const newPersons: any[] = [];
    persons.forEach((person:any) => {
      let containsTag = person.name.includes(keywordIn);
      if (containsTag) newPersons.push(person);
    });
    console.log("newperson", newPersons);
    return newPersons;
  };

  const submitNewPerson = (event: any) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    console.log(persons);
    let containsTemp = false;
    persons.forEach((person:any) => {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
        containsTemp = true;
      }
    });

    if (containsTemp) {
    } else {
      setPersons(persons.concat(newPerson as any));
      setNewName("");
    }
  };
  return (
    <div className="App">
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input value={keyword} onChange={keywordsInput}></input>
      </div>

      <h2>add a new </h2>
      <ul>
        <form onSubmit={submitNewPerson}>
          <div>
            name : <input value={newName} onChange={newNameInput}></input>
          </div>

          <div>
            number: <input value={newNumber} onChange={newNumberInput}></input>
          </div>

          <div>
            <button type="submit"> add</button>
          </div>
        </form>
      </ul>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons(keyword).map((person) => (
          <p>
            {person.name} {person.number}
          </p>
        ))}
      </ul>
    </div>
  );
}

export default App;
