import React from 'react';

const Navbar = ({ currentView, setCurrentView, lang, handleLanguageChange, navContent, isTranslating }) => {
  return (
    <nav>
      <div className="nav-brand" onClick={() => setCurrentView('hero')}>
        <span className="dot"></span>
        {isTranslating ? "Translating..." : "VotePath"}
      </div>
      <div className="nav-tabs" role="tablist">
        <button 
          className={`nav-tab ${currentView === 'main' ? 'active' : ''}`}
          onClick={() => setCurrentView('main')}
          role="tab"
          aria-selected={currentView === 'main'}
        >
          📋 {navContent.timeline}
        </button>
        <button 
          className={`nav-tab ${currentView === 'quiz' ? 'active' : ''}`}
          onClick={() => setCurrentView('quiz')}
          role="tab"
          aria-selected={currentView === 'quiz'}
        >
          🧠 {navContent.quiz}
        </button>
        <button 
          className={`nav-tab ${currentView === 'glossary' ? 'active' : ''}`}
          onClick={() => setCurrentView('glossary')}
          role="tab"
          aria-selected={currentView === 'glossary'}
        >
          📖 {navContent.glossary}
        </button>
        <button 
          className={`nav-tab ${currentView === 'tracker' ? 'active' : ''}`}
          onClick={() => setCurrentView('tracker')}
          role="tab"
          aria-selected={currentView === 'tracker'}
        >
          ✅ {navContent.tracker}
        </button>
        <button 
          className={`nav-tab ${currentView === 'shield' ? 'active' : ''}`}
          onClick={() => setCurrentView('shield')}
          role="tab"
          aria-selected={currentView === 'shield'}
        >
          🛡️ {navContent.shield}
        </button>
        <button 
          className={`nav-tab ${currentView === 'local' ? 'active' : ''}`}
          onClick={() => setCurrentView('local')}
          role="tab"
          aria-selected={currentView === 'local'}
        >
          📍 {navContent.local}
        </button>
      </div>
      <div className="nav-lang">
        <select 
          value={lang} 
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="lang-select"
          aria-label="Select Language"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="or">ଓଡ଼ିଆ (Odia)</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="gu">ગુજરાતી (Gujarati)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="ml">മലയാളം (Malayalam)</option>
          <option value="pa">ପੰਜਾਬੀ (Punjabi)</option>
          <option value="as">অসমীয়া (Assamese)</option>
          <option value="mai">मैथिली (Maithili)</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
