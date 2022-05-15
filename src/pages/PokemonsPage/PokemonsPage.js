import React, { useState, useMemo } from 'react';
import './PokemonsPage.css';
import useSendGETAPI from '../../shared/hooks/useSendGETAPI/useSendGETAPI';

const ORDERS_OPTIONS = {
  NONE: 'none',
  ASC: 'asc',
  DES: 'des'
};

const convertDataResponse = response => response.data.results;
const PokemonsPage = () => {
  const [searchText, setSearchText] = useState('');
  const [sortNameOrder, setSortNameOrder] = useState(ORDERS_OPTIONS.NONE);
  const { isLoading, data , errorMessage } = useSendGETAPI([], 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=40', convertDataResponse);
  const pokemons = data;
  console.log(pokemons);
  
  const pokemonsFiltered = useMemo(() => {
    console.log('calculate filtered');
    return pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase()))
  }, [pokemons, searchText]);
  
  const pokemonsSorted = useMemo(() => {
    const getPokemonSorted = () => {
      if (sortNameOrder === ORDERS_OPTIONS.NONE) return pokemonsFiltered;
      const order = sortNameOrder === ORDERS_OPTIONS.ASC ? 1 : -1;
      return pokemonsFiltered.sort((pokemon1, pokemon2) => {
        if (pokemon1.name.toLowerCase() < pokemon2.name.toLowerCase()) return -1 * order;
        if (pokemon1.name.toLowerCase() > pokemon2.name.toLowerCase()) return 1 * order;
        return 0;
      });
    };
    console.log('sort filtered');
    return getPokemonSorted()
  }, [pokemonsFiltered, sortNameOrder]);
  
  if (isLoading) return 'Loading';
  if (errorMessage) return errorMessage;
  return (
    <div className="pokemons__list">
      <input
        style={ { margin: 20 } }
        type="text"
        placeholder="Search for pokemons"
        value={ searchText }
        onChange={ evt => setSearchText(evt.target.value) }
      />
      <label>Sort name order</label>
      <select value={ sortNameOrder } onChange={ evt => setSortNameOrder(evt.target.value) }>
        <option value={ ORDERS_OPTIONS.ASC }>Name ASC</option>
        <option value={ ORDERS_OPTIONS.DES }>Name DES</option>
        <option value={ ORDERS_OPTIONS.NONE }>None</option>
      </select>
      { pokemonsSorted.map(pokemon => (
        <div className="pokemon-item" key={ pokemon.name }>
          <span style={ { margin: 15 } }>{ pokemon.name }</span>
          <a href={ pokemon.url }>{ pokemon.url }</a>
        </div>
      )) }
    </div>
  );
};

export default PokemonsPage;

