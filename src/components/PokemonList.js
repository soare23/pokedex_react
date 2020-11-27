import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import PokemonDetail from './PokemonDetail';

function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${page}`)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((pokemon) => {
          console.log(pokemon);
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`)
            .then((res) => res.json())
            .then((data) => {
              setPokemons((prevData) => [...prevData, data]);
              console.log(data);
            });
        });
      });
    return function cleanUp() {
      setPokemons([]);
    };
  }, [page]);

  function previousPage() {
    if (page > 0) {
      setPage(page - 10);
    }
  }

  function nextPage() {
    setPage(page + 10);
  }

  return (
    <div>
      <div className="row align-items-center">
        {pokemons.map((pokemon) => (
          <div className="card-wrapper">
            <PokemonDetail
              pokemonDetails={pokemon}
              key={pokemon.id}
            ></PokemonDetail>
          </div>
        ))}
      </div>

      <div className="changePageBtnContainer">
        <button onClick={previousPage} className="btn btn-primary">
          Previous
        </button>
        <button onClick={nextPage} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
