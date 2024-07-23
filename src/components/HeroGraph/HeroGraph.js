import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const HeroGraph = ({ hero }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const fetchHeroDetails = async () => {
      try {
        console.log('Fetching details for hero:', hero);
        // fetch film details for the hero
        const filmRequests = hero.films.map((url) => axios.get(url));
        const filmResponses = await Promise.all(filmRequests);
        const films = filmResponses.map((response) => response.data);
        // fetch starship details for each film
        const shipRequests = films.flatMap((film) =>
          film.starships.map((url) => axios.get(url)),
        );
        const shipResponses = await Promise.all(shipRequests);
        const starships = shipResponses.map((response) => response.data);
        // create nodes for each film
        const filmNodes = films.map((film, index) => ({
          id: film.url,
          data: { label: film.title },
          position: { x: 250, y: 100 + index * 150 },
        }));
        // create nodes for each starship
        const starshipNodes = starships.map((starship, index) => ({
          id: starship.url,
          data: { label: starship.name },
          position: { x: 500, y: 100 + index * 100 },
        }));
        // create edges between the hero and each film
        const filmEdges = films.map((film) => ({
          id: `e${hero.url}-${film.url}`,
          source: hero.url,
          target: film.url,
        }));
        // create edges between each film and its starships
        const starshipEdges = films.flatMap((film) =>
          film.starships.map((starshipUrl) => ({
            id: `e${film.url}-${starshipUrl}`,
            source: film.url,
            target: starshipUrl,
          })),
        );
        // combine hero node, film nodes, and starship nodes
        const newNodes = [
          {
            id: hero.url,
            data: { label: hero.name },
            position: { x: 250, y: 0 },
          },
          ...filmNodes,
          ...starshipNodes,
        ];
        // combine film edges and starship edges
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
  // render the ReactFlow component with nodes and edges
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
