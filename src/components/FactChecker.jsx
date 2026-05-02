import React, { useState } from 'react';
import axios from 'axios';
import { Volume2, ShieldCheck, ShieldAlert, ShieldQuestion, Loader2 } from 'lucide-react';
import { speak } from '../utils/speech';

const FactChecker = ({ title, lang }) => {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkFact = async () => {
    if (!claim.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/factcheck', { claim, lang });
      setResult(res.data);
    } catch (e) {
      console.error(e);
      setResult({ verdict: 'Error', explanation: 'Failed to verify. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleListen = () => {
    if (!result) return;
    speak(`${result.verdict}. ${result.explanation}`, lang);
  };

  const getIcon = () => {
    if (result.verdict === 'Verified') return <ShieldCheck color="#10b981" size={48} />;
    if (result.verdict === 'False') return <ShieldAlert color="#f87171" size={48} />;
    return <ShieldQuestion color="#f59e0b" size={48} />;
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <div className="view-heading">{title}</div>
        <div className="view-subheading">
          CivicAI Shield: Combatting election misinformation with official data
        </div>
      </div>

      <div className="fact-input-card">
        <textarea
          className="fact-textarea"
          placeholder="Paste an election-related claim or news here to verify..."
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
        />
        <button className="btn-primary" onClick={checkFact} disabled={loading || !claim.trim()}>
          {loading ? <Loader2 className="animate-spin" /> : '🛡️ Verify with CivicAI Shield'}
        </button>
      </div>

      {result && (
        <div className={`fact-result-card animate-in ${result.verdict.toLowerCase()}`}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            <div className="verdict-icon">{getIcon()}</div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}
              >
                <div className={`verdict-badge ${result.verdict.toLowerCase()}`}>
                  {result.verdict}
                </div>
                <button className="voice-btn voice-btn-sm" onClick={handleListen}>
                  <Volume2 size={18} />
                </button>
              </div>
              <div className="verdict-explanation">{result.explanation}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FactChecker;
