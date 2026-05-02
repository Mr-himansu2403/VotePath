import React from 'react';

const BackgroundEffects = () => {
  return (
    <div className="bg-container">
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      {/* Dynamic Floating Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      {/* Animated Glow Lines */}
      <div className="glow-lines">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
      </div>
    </div>
  );
};

export default BackgroundEffects;
