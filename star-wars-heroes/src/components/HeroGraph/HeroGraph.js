import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';

const HeroGraph = ({ hero }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const fetchHeroDetails = async () => {
      try {
        console.log('Fetching details for hero:', hero);

        // Запити до фільмів
        const filmRequests = hero.films.map((url) => axios.get(url));
        const filmResponses = await Promise.all(filmRequests);
        const films = filmResponses.map((response) => response.data);

        // Запити до космічних кораблів
        const shipRequests = films.flatMap((film) =>
          film.starships.map((url) => axios.get(url)),
        );
        const shipResponses = await Promise.all(shipRequests);
        const starships = shipResponses.map((response) => response.data);

        // Створення нод для фільмів
        const filmNodes = films.map((film, index) => ({
          id: film.url,
          data: { label: film.title },
          position: { x: 250, y: 100 + index * 150 },
        }));

        // Створення нод для космічних кораблів
        const starshipNodes = starships.map((starship, index) => ({
          id: starship.url,
          data: { label: starship.name },
          position: { x: 500, y: 100 + index * 100 },
        }));

        // Створення зв'язків від героя до фільмів
        const filmEdges = films.map((film) => ({
          id: `e${hero.url}-${film.url}`,
          source: hero.url,
          target: film.url,
        }));

        // Створення зв'язків від фільмів до космічних кораблів
        const starshipEdges = films.flatMap((film) =>
          film.starships.map((starshipUrl) => ({
            id: `e${film.url}-${starshipUrl}`,
            source: film.url,
            target: starshipUrl,
          })),
        );

        // Встановлення нод та зв'язків графа
        const newNodes = [
          {
            id: hero.url,
            data: { label: hero.name },
            position: { x: 250, y: 0 },
          },
          ...filmNodes,
          ...starshipNodes,
        ];

        const newEdges = [...filmEdges, ...starshipEdges];

        console.log('Graph nodes:', newNodes);
        console.log('Graph edges:', newEdges);
        setNodes(newNodes);
        setEdges(newEdges);
      } catch (error) {
        console.error('Error fetching hero details:', error);
      }
    };

    fetchHeroDetails();
  }, [hero]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        style={{ width: '100%', height: '100%' }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default HeroGraph;
