'use client';
import { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import styles from './AssistantWidget.module.css';

export default function AssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I am the GenAI Stadium Assistant. How can I help?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.message || 'Error occurred.' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Connection failed.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={styles.widgetButton}
        aria-label="Open AI Assistant"
      >
        <Bot size={20} />
        <span>Ask AI</span>
      </button>

      {isOpen && (
        <div className={styles.widgetContainer}>
          <div className={styles.widgetHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={18} /> <strong>GenAI Assistant</strong>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close Assistant" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>
          
          <div className={styles.widgetBody}>
            {messages.map((msg, idx) => (
              <div key={idx} className={msg.role === 'assistant' ? styles.msgAssistant : styles.msgUser}>
                {msg.text}
              </div>
            ))}
            {loading && <div className={styles.msgAssistant}>Thinking...</div>}
          </div>

          <form onSubmit={sendMessage} className={styles.widgetFooter}>
            <label htmlFor="ai-input" className="sr-only" style={{ display: 'none' }}>Ask AI</label>
            <input 
              id="ai-input"
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about navigation, crowds..." 
              className={styles.inputField}
            />
            <button type="submit" disabled={loading || !input.trim()} className={styles.sendBtn} aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
