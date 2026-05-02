import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speak } from '../utils/speech';

const Quiz = ({ quiz, lang }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const q = quiz[index];

  const handleAnswer = (idx) => {
    if (answered) return;
    setAnswered(true);
    setSelected(idx);
    if (idx === q.ans) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (index + 1 < quiz.length) {
      setIndex((prev) => prev + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
    setShowResult(false);
  };

  if (showResult) {
    const pct = Math.round((score / quiz.length) * 100);
    return (
      <div className="quiz-wrap">
        <div className="quiz-card animate-in">
          <div className="quiz-score">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗳️</div>
            <div className="score-num">{score}</div>
            <div className="score-total">/ {quiz.length}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.75rem 0' }}>{pct}%</div>
            <button className="btn-primary" onClick={restart}>
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-wrap">
      <div className="view-header">
        <div className="view-heading">Election Quiz</div>
        <div className="view-subheading">Test your knowledge</div>
      </div>
      <div className="quiz-card animate-in" key={index}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div className="quiz-num">
            QUESTION {index + 1} / {quiz.length} &nbsp;·&nbsp; Score: {score}
          </div>
          <button
            className="voice-btn voice-btn-sm"
            onClick={() => speak(`${q.q}. Options are. ${q.opts.join('. ')}`, lang)}
            title="Listen"
          >
            <Volume2 size={16} />
          </button>
        </div>
        <div className="quiz-q">{q.q}</div>
        <div className="quiz-options">
          {q.opts.map((o, i) => (
            <button
              key={i}
              className={`quiz-opt ${answered ? (i === q.ans ? 'correct' : i === selected ? 'wrong' : '') : ''}`}
              onClick={() => handleAnswer(i)}
              disabled={answered}
            >
              {o}
            </button>
          ))}
        </div>
        {answered && (
          <div className="quiz-explanation animate-in">
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
              <div>💡 {q.exp}</div>
              <button
                className="voice-btn voice-btn-sm"
                onClick={() => speak(q.exp, lang)}
                title="Listen to explanation"
              >
                <Volume2 size={14} />
              </button>
            </div>
            <br />
            <button
              className="btn-secondary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
              onClick={nextQuestion}
            >
              Next Question →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
