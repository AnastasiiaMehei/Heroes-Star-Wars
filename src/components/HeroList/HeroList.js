import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeroList = ({ onSelectHero }) => {
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        // fetch heroes from the Star Wars API for the current page
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${page}`,
        );
        const heroesWithImages = response.data.results.map((hero) => ({
          ...hero,
          imageUrl: `https://starwars-visualguide.com/assets/img/characters/${
            hero.url.match(/\/(\d+)\/$/)[1]
          }.jpg`,
        }));
        // update the state with the new heroes
        setHeroes((prevHeroes) => [...prevHeroes, ...heroesWithImages]);
      } catch (error) {
        console.error('Error fetching heroes:', error);
      }
    };

    fetchHeroes();
  }, [page]);

  // function to load more heroes by incrementing the page number
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="hero-list-container">
      <ul className="hero-list">
        {heroes.map((hero) => (
          <li
            key={hero.name}
            onClick={() => onSelectHero(hero)}
            className="cursor-pointer flex items-center mb-2"
          >
            <img src={hero.imageUrl} alt={hero.name} className="hero-image" />
            {hero.name}
          </li>
        ))}
      </ul>
      {heroes.length > 0 && (
        <button onClick={loadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default HeroList;
