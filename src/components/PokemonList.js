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
        console.log(json.results);
        setPokemons(json.results);
      });
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
      <div className="row">
        {pokemons.map((pokemon) => (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{pokemon.name}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <Link to={`/pokemons/${pokemon.name}`}>
                <button className="btn btn-primary">Pokemon Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="changePageBtnContainer">
        <button onClick={previousPage} className="btn btn-secondary">
          Previous Pokemons
        </button>
        <button onClick={nextPage} className="btn btn-secondary">
          Next Pokemons
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
