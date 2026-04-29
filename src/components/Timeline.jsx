import React, { useState } from 'react';

const Timeline = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const s = steps[currentStep];

  const pct = Math.round(((currentStep + 1) / steps.length) * 100);

  return (
    <>
      <div className="timeline-panel">
        <div className="panel-header">
          <div className="panel-icon blue">🗓️</div>
          <div>
            <div className="panel-title">Election Roadmap</div>
            <div className="panel-sub">India's democratic process, step by step</div>
          </div>
        </div>
        <div style={{ padding: '0 4px' }}>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }}></div>
          </div>
          <div className="progress-label">Step {currentStep + 1} of {steps.length}</div>
        </div>
        <div className="steps-container">
          {steps.map((step, i) => (
            <div 
              key={step.id}
              className={`step-item ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
              onClick={() => setCurrentStep(i)}
            >
              <div className={`step-circle ${i < currentStep ? 'done' : i === currentStep ? 'active' : 'upcoming'}`}>
                {step.emoji}
              </div>
              <div className="step-info">
                <div className="step-name">{step.name}</div>
                <div className="step-meta">{step.meta}</div>
                <span className={`step-tag tag-${step.tag}`}>{step.tagLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="right-panel">
        <div className="detail-card animate-in" key={currentStep}>
          <div className="detail-header">
            <div className="detail-step-num">STEP {String(currentStep + 1).padStart(2, '0')}</div>
            <div className="detail-step-title">{s.title}</div>
            <div className="detail-step-sub">{s.subtitle}</div>
          </div>
          <div className="detail-body">
            {s.sections.map((sec, i) => (
              <div className="detail-section" key={i}>
                <div className="detail-section-title">{sec.title}</div>
                <ul className="detail-list">
                  {sec.items.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              </div>
            ))}
            <div className="detail-section">
              <div className="detail-section-title">Key Terms</div>
              <div className="detail-chips">
                {s.chips.map((c, i) => <span className="chip" key={i}>{c}</span>)}
              </div>
            </div>
            <div className="timeline-nav" style={{ marginTop: '1rem' }}>
              <button 
                className="btn-nav" 
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                ← Previous
              </button>
              <button 
                className="btn-nav" 
                disabled={currentStep === steps.length - 1}
                onClick={() => setCurrentStep(prev => prev + 1)}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;
