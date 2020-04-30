import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";




function App () {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
        setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositorio teste ${Date.now()}`,
      url: 'https://github.com/marxros',
      techs: [
        'NodeJs',
        'ReactJS',
        'React Native'
      ]
    })

    const repository = response.data; 
     
    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);

    const result = repositories.filter(
      repository => repository.id !== id
    );

    setRepositories(result);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        { 
          repositories.map(repository =>
            <li key={repository.id}>
              <p>{repository.title}</p>
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        } 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
