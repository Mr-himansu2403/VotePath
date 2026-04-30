import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Chat from './components/Chat';
import Quiz from './components/Quiz';
import Glossary from './components/Glossary';
import VoterTracker from './components/VoterTracker';
import FactChecker from './components/FactChecker';
import ConstituencyGuide from './components/ConstituencyGuide';
import { INITIAL_STEPS, INITIAL_QUIZ, INITIAL_GLOSSARY, INITIAL_TRACKER } from './data/electionData';
import { stopSpeaking } from './utils/speech';
import { VolumeX } from 'lucide-react';
import axios from 'axios';

function App() {
  const [currentView, setCurrentView] = useState('hero');
  const [lang, setLang] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [quiz, setQuiz] = useState(INITIAL_QUIZ);
  const [glossary, setGlossary] = useState(INITIAL_GLOSSARY);
  const [tracker, setTracker] = useState(() => {
    const saved = localStorage.getItem('voter_tracker');
    return saved ? JSON.parse(saved) : INITIAL_TRACKER;
  });

  const [heroContent, setHeroContent] = useState({
    title: "Understand Democracy, One Step at a Time",
    sub: "An intelligent guide to India's electoral process — from voter registration to the declaration of results. Ask questions, explore timelines, and become a more informed citizen.",
    exploreBtn: "Explore the Journey",
    testBtn: "Test Your Knowledge",
    stats: ["Registered Voters", "Election Phases", "Lok Sabha Seats", "Days Process"]
  });
  const [navContent, setNavContent] = useState({
    timeline: "Timeline",
    quiz: "Quiz",
    glossary: "Glossary",
    tracker: "My Journey",
    shield: "Fact-Checker",
    local: "Local Guide"
  });

  useEffect(() => {
    localStorage.setItem('voter_tracker', JSON.stringify(tracker));
  }, [tracker]);

  const handleLanguageChange = async (newLang) => {
    if (newLang === 'en') {
      setLang('en');
      setHeroContent({
        title: "Understand Democracy, One Step at a Time",
        sub: "An intelligent guide to India's electoral process — from voter registration to the declaration of results. Ask questions, explore timelines, and become a more informed citizen.",
        exploreBtn: "Explore the Journey",
        testBtn: "Test Your Knowledge",
        stats: ["Registered Voters", "Election Phases", "Lok Sabha Seats", "Days Process"]
      });
      setNavContent({
        timeline: "Timeline",
        quiz: "Quiz",
        glossary: "Glossary",
        tracker: "My Journey",
        shield: "Fact-Checker",
        local: "Local Guide"
      });
      setSteps(INITIAL_STEPS);
      setQuiz(INITIAL_QUIZ);
      setGlossary(INITIAL_GLOSSARY);
      setTracker(INITIAL_TRACKER);
      return;
    }
    
    setLang(newLang);

    // Check Cache
    const cached = localStorage.getItem(`trans_${newLang}`);
    if (cached) {
      const data = JSON.parse(cached);
      if (data.hero) setHeroContent(data.hero);
      if (data.nav) setNavContent(data.nav);
      if (data.steps) setSteps(data.steps);
      if (data.quiz) setQuiz(data.quiz);
      if (data.glossary) setGlossary(data.glossary);
      if (data.tracker) setTracker(data.tracker);
      return;
    }

    setIsTranslating(true);

    try {
      const res = await axios.post('/api/translate', {
        text: {
          hero: {
            title: "Understand Democracy, One Step at a Time",
            sub: "An intelligent guide to India's electoral process — from voter registration to the declaration of results. Ask questions, explore timelines, and become a more informed citizen.",
            exploreBtn: "Explore the Journey",
            testBtn: "Test Your Knowledge",
            stats: ["Registered Voters", "Election Phases", "Lok Sabha Seats", "Days Process"]
          },
          nav: {
            timeline: "Timeline",
            quiz: "Quiz",
            glossary: "Glossary",
            tracker: "My Journey",
            shield: "Fact-Checker",
            local: "Local Guide"
          },
          steps: INITIAL_STEPS,
          quiz: INITIAL_QUIZ,
          glossary: INITIAL_GLOSSARY,
          tracker: INITIAL_TRACKER
        },
        targetLang: newLang
      });

      const data = res.data;
      if (data.hero) setHeroContent(data.hero);
      if (data.nav) setNavContent(data.nav);
      if (data.steps) setSteps(data.steps);
      if (data.quiz) setQuiz(data.quiz);
      if (data.glossary) setGlossary(data.glossary);
      if (data.tracker) setTracker(data.tracker);

      // Save to Cache
      localStorage.setItem(`trans_${newLang}`, JSON.stringify(data));
    } catch (e) {
      console.error("Translation failed", e);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div id="app">
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        lang={lang} 
        handleLanguageChange={handleLanguageChange}
        navContent={navContent}
        isTranslating={isTranslating}
      />

      {currentView === 'hero' && (
        <Hero 
          content={heroContent} 
          onExplore={() => setCurrentView('main')} 
          onQuiz={() => setCurrentView('quiz')} 
          lang={lang}
        />
      )}

      {currentView === 'main' && (
        <main className="main-view animate-in">
          <Timeline steps={steps} lang={lang} />
          <Chat lang={lang} />
        </main>
      )}

      {currentView === 'quiz' && (
        <section className="quiz-view animate-in">
          <Quiz quiz={quiz} lang={lang} />
        </section>
      )}

      {currentView === 'glossary' && (
        <section className="glossary-view animate-in">
          <Glossary glossary={glossary} title={navContent.glossary} lang={lang} />
        </section>
      )}

      {currentView === 'tracker' && (
        <section className="tracker-view animate-in">
          <VoterTracker tracker={tracker} setTracker={setTracker} title={navContent.tracker} lang={lang} />
        </section>
      )}

      {currentView === 'shield' && (
        <section className="shield-view animate-in">
          <FactChecker title={navContent.shield} lang={lang} />
        </section>
      )}

      {currentView === 'local' && (
        <section className="local-view animate-in">
          <ConstituencyGuide title={navContent.local} lang={lang} />
        </section>
      )}

      <button 
        className="floating-stop-btn" 
        onClick={stopSpeaking}
        title="Stop Audio"
        aria-label="Stop Audio"
      >
        <VolumeX size={18} /> Stop Audio
      </button>
    </div>
  );
}

export default App;
