import React, { useState } from 'react';
import axios from 'axios';
import { Volume2, MapPin, Search, Loader2 } from 'lucide-react';
import { speak } from '../utils/speech';

const ConstituencyGuide = ({ title, lang }) => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
    if (!/^\d{6}$/.test(pincode)) return;
    setLoading(true);
    try {
      const res = await axios.post('/api/constituency', { pincode, lang });
      setResult(res.data);
    } catch (e) {
      console.error(e);
      setResult({ name: 'Unknown', state: 'Unknown', details: 'Failed to fetch information.' });
    } finally {
      setLoading(false);
    }
  };

  const handleListen = () => {
    if (!result) return;
    speak(`${result.name} constituency in ${result.state}. ${result.details}`, lang);
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <div className="view-heading">{title}</div>
        <div className="view-subheading">
          Get localized election info based on your Indian Pincode
        </div>
      </div>

      <div className="local-input-card">
        <div className="pincode-input-group">
          <MapPin size={20} className="input-icon" />
          <input
            type="text"
            className="pincode-input"
            placeholder="Enter 6-digit Pincode (e.g., 110001)"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
          />
          <button
            className="btn-search"
            onClick={lookup}
            disabled={loading || pincode.length !== 6}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
          </button>
        </div>
      </div>

      {result && (
        <div className="local-result-card animate-in">
          <div className="local-header">
            <div>
              <div className="local-label">Constituency</div>
              <div className="local-name">{result.name}</div>
              <div className="local-state">{result.state}</div>
            </div>
            <button className="voice-btn" onClick={handleListen}>
              <Volume2 size={24} />
            </button>
          </div>
          <div className="local-body">
            <div className="local-label">Key Information</div>
            <div className="local-details">{result.details}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstituencyGuide;
