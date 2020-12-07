import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';

function PokemonDetail({ pokemonDetails }) {
  const [isFlipped, setIsFlip] = useState(false);

  useEffect(() => {
    fetchPokemon();
  }, []);

  const [pokemon, setPokemon] = useState({
    abilities: [{}],
    stats: [],
    sprites: [],
  });

  const [stats, setStats] = useState([]);

  const fetchPokemon = async () => {
    const fetchPokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonDetails.name}/`
    );

    const pokemon = await fetchPokemon.json();
    setPokemon(pokemon);
    setStats(pokemon.stats);
  };

  function flipCard() {
    setIsFlip(!isFlipped);
  }

  let cardBody;

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    cardBody = (
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        key={pokemon.id}
      >
        <div className="card-wrapper">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{pokemon.name}</h5>
              <img
                src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
                alt="pokemon"
                className="pokemonPicture"
              ></img>
              <button className="btn btn-primary" onClick={flipCard}>
                Stats
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="card-wrapper">
            <div className="card">
              <div className="card-body">
                <div className="card-body-text">
                  {stats.map((stat, index) => (
                    <p key={index}>
                      {stat.stat.name}: {stat.base_stat}
                    </p>
                  ))}
                  <p>weight: {pokemon.weight}</p>
                </div>
                <button className="btn btn-primary btn-back" onClick={flipCard}>
                  ⇆
                </button>
              </div>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    );
  } else {
    cardBody = (
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        key={pokemon.id}
      >
        <div className="card-wrapper" onMouseOver={flipCard}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{pokemon.name}</h5>
              <img
                src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
                alt="pokemon"
                className="pokemonPicture"
              ></img>
              <button className="btn btn-primary">Stats</button>
            </div>
          </div>
        </div>
        <div>
          <div className="card-wrapper" onMouseLeave={flipCard}>
            <div className="card">
              <div className="card-body">
                <div className="card-body-text">
                  {stats.map((stat, index) => (
                    <p key={index}>
                      {stat.stat.name}: {stat.base_stat}
                    </p>
                  ))}
                  <p>weight: {pokemon.weight}</p>
                </div>
                <button className="btn btn-primary btn-back">⇆</button>
              </div>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    );
  }

  return <>{cardBody}</>;
}

export default PokemonDetail;
