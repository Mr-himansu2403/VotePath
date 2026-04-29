import React from 'react';
import { Volume2 } from 'lucide-react';
import { speak } from '../utils/speech';

const Glossary = ({ glossary, title, lang }) => {
  return (
    <>
      <div className="view-header">
        <div className="view-heading">{title}</div>
        <div className="view-subheading">Key terms explained in simple language</div>
      </div>
      <div className="glossary-grid">
        {glossary.map((g, i) => (
          <div key={i} className="gloss-card animate-in" style={{ animationDelay: `${i * 0.04}s` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="gloss-term">{g.term}</div>
              <button 
                className="voice-btn voice-btn-sm" 
                onClick={() => speak(`${g.term}. ${g.def}`, lang)}
                title="Listen"
              >
                <Volume2 size={16} />
              </button>
            </div>
            <div className="gloss-def">{g.def}</div>
            <div className={`gloss-badge ${g.badge}`} style={{ background: 'transparent', border: '1px solid currentColor', fontSize: '0.68rem', padding: '2px 8px' }}>
              {g.badgeLabel}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Glossary;
