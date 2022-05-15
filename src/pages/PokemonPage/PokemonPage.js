import React, { useContext, useState } from 'react';
import './PokemonPage.css';
import LanguageContext from '../../shared/contexts/LanguageContext/LanguageContext';
import useSendGETAPI from '../../shared/hooks/useSendGETAPI/useSendGETAPI';

const convertResponseToData = response => ({
  id: response.data.id,
  name: response.data.name,
  weight: response.data.weight,
  frontImage: response.data.sprites.front_default,
  backImage: response.data.sprites.back_default
});

const PokemonPage = () => {
  const language = useContext(LanguageContext);
  const [pokemonIdDisplayed, setPokemonIdDisplayed] = useState(1);
  
  const {isLoading, data, errorMessage } = useSendGETAPI({
    id: null,
    name: null,
    weight: null,
    frontImage: null,
    backImage: null
  },`https://pokeapi.co/api/v2/pokemon/${ pokemonIdDisplayed }`,  convertResponseToData);
  
  const pokemon = data;
  
  if(errorMessage) return <div style={{color: 'red'}}>{errorMessage}</div>
  return (
    <div className="pokemon-page">
      <div>ID: { pokemon.id } </div>
      <div>{ language === 'en' ? 'Name:' : 'Tên:' } { pokemon.name } </div>
      <div>{ language === 'en' ? 'Weight:' : 'Cân nặng:' } { pokemon.weight } </div>
      <div>
        <img src={ pokemon.frontImage } alt=""/>
        <img src={ pokemon.backImage } alt=""/>
      </div>
      <div>
        <button
          className="button__pokemon"
          onClick={ () => setPokemonIdDisplayed(pokemonIdDisplayed - 1) }
          disabled={ isLoading }
        >
          Previous
        </button>
        <button
          className="button__pokemon"
          onClick={ () => setPokemonIdDisplayed(pokemonIdDisplayed + 1) }
          disabled={ isLoading }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonPage;

