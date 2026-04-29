import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ lang }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Namaste! 🙏 I'm CivicAI, your election guide. I can explain India's election process, voter rights, candidate rules, EVMs, and much more. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const sendMessage = async (text = input) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    const newMessages = [...messages, { role: 'user', content: trimmedText }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('/api/chat', {
        messages: newMessages.slice(-10)
      });
      const reply = response.data.content?.[0]?.text || "I'm having trouble connecting. Please try again!";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "⚠️ I'm having trouble connecting to my knowledge base right now. Please check your internet connection and try again!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-top">
        <div className="ai-avatar">🤖</div>
        <div style={{ flex: 1 }}>
          <div className="ai-name">CivicAI</div>
          <div className="ai-status">Online · Election Expert</div>
        </div>
      </div>
      <div className="quick-prompts">
        <span className="qp" onClick={() => sendMessage('How do I register to vote in India?')}>🪪 Register to vote</span>
        <span className="qp" onClick={() => sendMessage('What is the Model Code of Conduct?')}>📜 Model Code</span>
        <span className="qp" onClick={() => sendMessage('How does EVM voting work?')}>🗳️ EVM process</span>
        <span className="qp" onClick={() => sendMessage('Who is eligible to be a candidate?')}>👤 Candidate rules</span>
      </div>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === 'assistant' ? 'ai' : 'user'}`}>
            <div className={`msg-avatar ${m.role === 'assistant' ? 'ai' : 'user'}`}>
              {m.role === 'assistant' ? '🤖' : '👤'}
            </div>
            <div className="msg-bubble">
              {m.content.split('\n').map((line, j) => <React.Fragment key={j}>{line}<br/></React.Fragment>)}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="msg ai">
            <div className="msg-avatar ai">🤖</div>
            <div className="msg-bubble" style={{ padding: '10px 14px' }}>
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input-area">
        <input 
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about elections..."
        />
        <button className="btn-send" onClick={() => sendMessage()} disabled={isTyping}>➤</button>
      </div>
    </div>
  );
};

export default Chat;
