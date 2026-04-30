import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="nav-clock">
      <span className="clock-date">{formatDate(dateTime)}</span>
      <span className="clock-time">{formatTime(dateTime)}</span>
    </div>
  );
};

export default Clock;
