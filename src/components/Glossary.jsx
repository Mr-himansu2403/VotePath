import React from 'react';

const Glossary = ({ glossary, title }) => {
  return (
    <>
      <div className="view-header">
        <div className="view-heading">{title}</div>
        <div className="view-subheading">Key terms explained in simple language</div>
      </div>
      <div className="glossary-grid">
        {glossary.map((g, i) => (
          <div key={i} className="gloss-card animate-in" style={{ animationDelay: `${i * 0.04}s` }}>
            <div className="gloss-term">{g.term}</div>
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
