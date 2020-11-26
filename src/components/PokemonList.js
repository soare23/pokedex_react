import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            <div className="card" key={pokemon.id}>
              <div className="card-body" key={pokemon.id}>
                <h5 className="card-title">{pokemon.name}</h5>
                <img
                  src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
                  alt="pokemon"
                  className="pokemonPicture"
                ></img>
                <Link to={`/pokemons/${pokemon.name}`}>
                  <button className="btn btn-primary">Pokemon Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="changePageBtnContainer">
        <button onClick={previousPage} className="btn btn-primary">
          Previous Pokemons
        </button>
        <button onClick={nextPage} className="btn btn-primary">
          Next Pokemons
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
