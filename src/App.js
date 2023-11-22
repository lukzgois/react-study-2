import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [breeds, setBreeds] = useState([])
  const fetchAllDogs = () => {
    fetch('http://localhost:8080/dogs')
    .then(data => data.json())
    .then(data => { setBreeds(data)})
  }

  useEffect(() => {
    fetchAllDogs()
  }, [])

  const [search, setSearch] = useState('')
  const searchByName = (name) => {
    fetch('http://localhost:8080/dogs?name=' + name)
    .then(data => data.json())
    .then(data => { setBreeds(data)})
  }

  useEffect(() => {
    if (!search || search.length <= 3) {
      fetchAllDogs()
    }

    if (search && search.length > 3) {
      searchByName(search)
    }
  }, [search])

  return (
    <div className="App">
      <h1>Bem vindo aos doguinhos!</h1>
      <h4>Confira abaixo uma lista dos doguinhos!</h4>

      <input 
        type="text" 
        placeholder="Filtar por raça"
        onChange={event => { setSearch(event.target.value) }}
      />

      <ul>
        {breeds.map(breed => <li key={breed.name}>{breed.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
