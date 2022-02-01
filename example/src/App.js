import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ItemList from './components/ItemList';
import Button from './components/Button';
import PokemonDetails from './components/PokemonDetails';

import './App.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [listPokemons, setListPokemons] = useState(false);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    axios.get(`${process.env.REACT_APP_API}/pokemon`)
      .then((resp) => {
        const { data } = resp;

        setListPokemons(data);
      }).catch(() => {
        setError(true);
      }).finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getListPokemons = (url) => {
    setIsLoading(true);

    axios.get(url)
      .then((resp) => {
        const { data } = resp;

        setListPokemons(data);
      }).catch(() => {
        setError(true);
      }).finally(() => {
        setIsLoading(false);
      });
  }

  const getPokemon = (url) => {
    axios.get(url)
      .then((resp) => {
        const { data } = resp;

        setPokemon(data);
      }).catch(() => {
        
      }).finally(() => {
        
      });
  }

  if (isLoading) {
    return (
      <div className="Loading">
        Carregando...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="Error">
        Erro ao buscar informações, tente novamente.
      </div>
    );
  }

  const {results, next, previous} = listPokemons;

  return (
    <>
      <div className="App">
        {results.map((result, key) => <ItemList key={key} onClick={() => getPokemon(result.url)}>{result.name}</ItemList>)}
        <div className="App-pagination">
          <Button onClick={() => getListPokemons(previous)} disabled={!previous}>Anterior</Button>
          <Button onClick={() => getListPokemons(next)} disabled={!next}>Próximo</Button>
        </div>
      </div>

      {pokemon && <PokemonDetails dataPokemon={pokemon} onClose={() => setPokemon(null)}/>}
    </>
  );
}

export default Home;
