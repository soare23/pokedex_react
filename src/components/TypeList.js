import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PokemonDetail from './PokemonDetail';
import BackToTopArrow from './BackToTopArrow';

export default function TypeList() {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState('');
  const [pokemonsByType, setPokemonsByType] = useState([]);
  let typeSelected = document.getElementById('typeSelected');
  let alert = document.getElementById('alert');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type/')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setTypes(json.results);
      });
  }, []);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.pokemon);
        setPokemonsByType(json.pokemon);
      });
    return function cleanUp() {
      setPokemonsByType();
    };
  }, [type]);

  function getPokemonsByType(e) {
    e.preventDefault();
    console.log(e.target.value);
    alertTypeSelected(e.target.value);
    setTimeout(() => {
      alert.style.visibility = 'hidden';
    }, 2000);
    setType(e.target.value);
  }

  function alertTypeSelected(selectedType) {
    typeSelected.innerHTML = selectedType;
    console.log(alert);
    alert.style.visibility = 'visible';
  }

  let cardBody;

  if (pokemonsByType !== undefined && pokemonsByType.length > 1) {
    cardBody = (
      <div className="row align-items-center">
        {pokemonsByType.map((pokemon) => (
          <div className="card-wrapper">
            <PokemonDetail
              pokemonDetails={pokemon.pokemon}
              key={pokemon.id}
            ></PokemonDetail>
          </div>
        ))}
      </div>
    );
  } else {
    cardBody = '';
  }

  return (
    <div>
      <div className="row">
        {types.slice(0, types.length - 2).map((type) => (
          <div className="col">
            <button
              onClick={getPokemonsByType}
              className="type-button"
              value={type.name}
            >
              <img
                className="type-img"
                src={`/pokemonTypesImg/${type.name}.png`}
                alt="type-logo-button"
              ></img>
            </button>
          </div>
        ))}
      </div>
      <div className="alert-container">
        <div className="alert alert-success" id="alert">
          <span id="typeSelected"> </span>&nbsp;type pokemons below
        </div>
      </div>
      {cardBody}
      <BackToTopArrow></BackToTopArrow>
    </div>
  );
}
