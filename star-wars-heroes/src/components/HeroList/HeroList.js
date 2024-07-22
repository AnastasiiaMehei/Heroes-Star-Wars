import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeroList = ({ onSelectHero }) => {
  const [heroes, setHeroes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${page}`,
        );
        const heroesWithImages = response.data.results.map((hero) => ({
          ...hero,
          imageUrl: `https://starwars-visualguide.com/assets/img/characters/${
            hero.url.match(/\/(\d+)\/$/)[1]
          }.jpg`,
        }));
        setHeroes((prevHeroes) => [...prevHeroes, ...heroesWithImages]);
      } catch (error) {
        console.error('Error fetching heroes:', error);
      }
    };

    fetchHeroes();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <ul>
        {heroes.map((hero) => (
          <li
            key={hero.name}
            onClick={() => onSelectHero(hero)}
            className="cursor-pointer flex items-center mb-2"
          >
            <img
              src={hero.imageUrl}
              alt={hero.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            {hero.name}
          </li>
        ))}
      </ul>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

export default HeroList;
