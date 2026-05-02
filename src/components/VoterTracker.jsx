import React from 'react';
import { Volume2, CheckCircle2, Circle } from 'lucide-react';
import { speak } from '../utils/speech';

const VoterTracker = ({ tracker, setTracker, title, lang }) => {
  const toggleTask = (id) => {
    setTracker((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const handleListen = () => {
    const completedCount = tracker.filter((t) => t.completed).length;
    const pending = tracker
      .filter((t) => !t.completed)
      .map((t) => t.task)
      .join('. ');
    const text = `You have completed ${completedCount} out of ${tracker.length} steps. Your remaining tasks are: ${pending}`;
    speak(text, lang);
  };

  const completedPct = Math.round(
    (tracker.filter((t) => t.completed).length / tracker.length) * 100
  );

  return (
    <div className="view-container">
      <div
        className="view-header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <div className="view-heading">{title}</div>
          <div className="view-subheading">Track your personal preparation for the elections</div>
        </div>
        <button className="voice-btn" onClick={handleListen} title="Listen to status">
          <Volume2 size={24} />
        </button>
      </div>

      <div className="tracker-progress-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span>Overall Progress</span>
          <span style={{ color: 'var(--gold)' }}>{completedPct}%</span>
        </div>
        <div className="progress-track" style={{ height: '8px' }}>
          <div
            className="progress-fill"
            style={{ width: `${completedPct}%`, background: 'var(--gold)' }}
          ></div>
        </div>
      </div>

      <div className="tracker-list">
        {tracker.map((item) => (
          <div
            key={item.id}
            className={`tracker-item ${item.completed ? 'completed' : ''}`}
            onClick={() => toggleTask(item.id)}
          >
            <div className="tracker-check">
              {item.completed ? (
                <CheckCircle2 className="icon-check" />
              ) : (
                <Circle className="icon-circle" />
              )}
            </div>
            <div className="tracker-info">
              <div className="tracker-task">{item.task}</div>
              <div className="tracker-tip">{item.tip}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoterTracker;
