// pages/index.js
import React, { useState } from 'react';
import HeroList from '../components/HeroList';
import HeroGraph from '../components/HeroGraph';

const Home = () => {
  const [selectedHero, setSelectedHero] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Star Wars Heroes</h1>
      <div className="flex" style={{ height: '80vh' }}>
        <div className="w-1/3">
          <HeroList
            onSelectHero={(hero) => {
              console.log('Selected hero:', hero);
              setSelectedHero(hero);
            }}
          />
        </div>
        <div className="w-2/3" style={{ height: '100%', position: 'relative' }}>
          {selectedHero && <HeroGraph hero={selectedHero} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
