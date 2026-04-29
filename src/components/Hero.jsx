import React from 'react';
import { Volume2 } from 'lucide-react';
import { speak } from '../utils/speech';

const Hero = ({ content, onExplore, onQuiz, lang }) => {
  const handleListen = () => {
    speak(`${content.title}. ${content.sub}`, lang);
  };

  return (
    <section className="hero-view animate-in">
      <div className="hero-badge">🇮🇳 India General Election Guide · AI-Powered</div>
      <div className="hero-title-container">
        <h1 className="hero-title">
          {content.title.split(',').map((part, i) => (
            <React.Fragment key={i}>
              {i === 1 ? <em>{part}</em> : part}
              {i === 0 && <br />}
            </React.Fragment>
          ))}
        </h1>
        <button 
          className="voice-btn" 
          onClick={handleListen} 
          title="Listen"
          aria-label="Listen to description"
        >
          <Volume2 size={24} />
        </button>
      </div>
      <p className="hero-sub">{content.sub}</p>
      <div className="hero-actions">
        <button className="btn-primary" onClick={onExplore}>
          🗳️ {content.exploreBtn}
        </button>
        <button className="btn-secondary" onClick={onQuiz}>
          🧠 {content.testBtn}
        </button>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <div className="stat-num">97 Cr</div>
          <div className="stat-label">{content.stats[0]}</div>
        </div>
        <div className="stat">
          <div className="stat-num">10</div>
          <div className="stat-label">{content.stats[1]}</div>
        </div>
        <div className="stat">
          <div className="stat-num">543</div>
          <div className="stat-label">{content.stats[2]}</div>
        </div>
        <div className="stat">
          <div className="stat-num">45+</div>
          <div className="stat-label">{content.stats[3]}</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
