import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

function PokemonDetail({ match }) {
  useEffect(() => {
    fetchPokemon();
  }, []);

  const [pokemon, setPokemon] = useState({
    abilities: [{}],
    stats: [],
    sprites: [],
  });

  const [stats, setStats] = useState([]);
  const [sprites, setSprites] = useState([]);

  const fetchPokemon = async () => {
    const fetchPokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${match.params.name}/`
    );

    const pokemon = await fetchPokemon.json();
    setPokemon(pokemon);
    console.log(pokemon);
    setStats(pokemon.stats);
    setSprites(pokemon.sprites);
    console.log(pokemon.sprites.front_default);
  };

  return (
    <>
      <div className="row">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{pokemon.name}</h5>
            <div>
              <img src={sprites.front_default} alt="pokemon"></img>
            </div>
            <div>
              {stats.map((stat) => (
                <p>
                  {stat.stat.name}: {stat.base_stat}
                </p>
              ))}
              <p>weight: {pokemon.weight}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PokemonDetail;
