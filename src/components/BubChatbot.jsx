import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { getBubChatResponse } from '../lib/aiResumeAdvisor';
import { useAuth } from '../context/AuthContext';

export default function BubChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi there! I am BUB, your Placement Portal AI advisor. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth(); // If needed for context

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
        || import.meta.env.VITE_OPENAI_API_KEY
        || localStorage.getItem('placement_openrouter_api_key')
        || localStorage.getItem('placement_ai_api_key')
        || '';

      if (!apiKey) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'It seems the AI API key is not configured. Please set it in your environment variables or local storage.' }]);
        setIsLoading(false);
        return;
      }

      // Convert our messages to the history format expected
      const messageHistory = messages.map(m => ({ role: m.role, content: m.content }));
      
      const responseText = await getBubChatResponse({
        apiKey,
        messageHistory,
        userMessage
      });

      setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error: ' + err.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageSquare size={28} />
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '350px',
      height: '500px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 9999,
      border: '1px solid #e2e8f0'
    }}>
      <div style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={20} />
          <h3 style={{ margin: 0, fontSize: '1rem' }}>BUB Advisor</h3>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>
      </div>

      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: '#f8fafc' }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: m.role === 'user' ? 'var(--primary)' : '#e2e8f0',
            color: m.role === 'user' ? 'white' : '#0f172a',
            padding: '10px 14px',
            borderRadius: '18px',
            borderBottomRightRadius: m.role === 'user' ? '4px' : '18px',
            borderBottomLeftRadius: m.role === 'assistant' ? '4px' : '18px',
            maxWidth: '85%',
            fontSize: '0.9rem',
            lineHeight: 1.4
          }}>
            {m.content}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.8rem', padding: '0 8px' }}>
            BUB is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '12px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px', background: 'white' }}>
        <input 
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask BUB anything..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '20px',
            border: '1px solid #cbd5e1',
            outline: 'none',
            fontSize: '0.9rem'
          }}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: (isLoading || !input.trim()) ? 'not-allowed' : 'pointer',
            opacity: (isLoading || !input.trim()) ? 0.6 : 1
          }}
        >
          <Send size={18} style={{ marginLeft: '2px' }} />
        </button>
      </div>
    </div>
  );
}
