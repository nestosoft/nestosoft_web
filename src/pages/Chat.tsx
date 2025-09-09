import React, { useState, useRef, useEffect } from 'react';
import { chatApiService, ChatRequest, ChatResponse } from '../services/chatApi';
import ChatMessage from '../components/ChatMessage';
import MatrixTyping from '../components/MatrixTyping';
import CVUploadZone from '../components/CVUploadZone';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [showCVUpload, setShowCVUpload] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Initialize chat with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      content: 'Hello! I\'m your technical recruitment assistant. I can help you with interviews, CV analysis, and technical assessments. How can I assist you today?',
      isUser: false,
      timestamp: new Date().toISOString(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const generateMessageId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateMessageId(),
      content: inputMessage.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const chatRequest: ChatRequest = {
        message: userMessage.content,
        conversation_id: conversationId,
        user_id: userId,
      };

      const response: ChatResponse = await chatApiService.chat(chatRequest);

      // Update conversation and user IDs if they're new
      if (!conversationId) setConversationId(response.conversation_id);
      if (!userId) setUserId(response.user_id);

      const assistantMessage: Message = {
        id: generateMessageId(),
        content: response.response,
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Check if the response mentions CV upload to show upload zone
      const responseText = response.response.toLowerCase();
      if (responseText.includes('cv') || responseText.includes('resume') || 
          responseText.includes('upload') || responseText.includes('document')) {
        setShowCVUpload(true);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setError(error instanceof Error ? error.message : 'Failed to send message');
      
      const errorMessage: Message = {
        id: generateMessageId(),
        content: 'Sorry, I encountered an error processing your message. Please try again.',
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCVUpload = async (file: File) => {
    if (!conversationId) {
      setError('Please start a conversation first before uploading a CV');
      return;
    }

    try {
      setIsLoading(true);
      await chatApiService.uploadCV(file, conversationId);
      
      const uploadMessage: Message = {
        id: generateMessageId(),
        content: `CV uploaded successfully: ${file.name}`,
        isUser: true,
        timestamp: new Date().toISOString(),
      };

      const confirmationMessage: Message = {
        id: generateMessageId(),
        content: 'Great! I\'ve received your CV and analyzed it. I can now provide more personalized feedback and questions based on your background.',
        isUser: false,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, uploadMessage, confirmationMessage]);
      setShowCVUpload(false);
    } catch (error) {
      console.error('CV upload error:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload CV');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-xl border-b border-white/10 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-light">Technical Recruiter Chat</h1>
          <p className="text-white/60 text-sm">AI-powered recruitment assistant</p>
        </div>
      </div>

      {/* Chat Area - 70% of screen */}
      <div className="flex-1 flex flex-col" style={{ minHeight: '70vh' }}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto max-w-4xl">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            
            {/* Loading indicator with Matrix animation */}
            {isLoading && <MatrixTyping isVisible={true} />}
            
            {/* CV Upload Zone */}
            <CVUploadZone 
              isActive={showCVUpload && !isLoading}
              onFileUpload={handleCVUpload}
              className="my-4"
            />
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-4 mb-2">
            <div className="container mx-auto max-w-4xl">
              <div className="bg-red-600/20 border border-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm">
                {error}
                <button 
                  onClick={() => setError(null)}
                  className="ml-2 text-red-300 hover:text-red-100"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="bg-black/50 backdrop-blur-xl border-t border-white/10 p-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-white/10 disabled:text-white/50 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                {isLoading ? 'Sending...' : 'Send'}
              </button>
            </div>
            
            {/* CV Upload Toggle */}
            <div className="mt-3 flex justify-between items-center">
              <button
                onClick={() => setShowCVUpload(!showCVUpload)}
                className="text-white/60 hover:text-white/80 text-sm transition-colors"
              >
                {showCVUpload ? 'Hide CV Upload' : 'Upload CV'}
              </button>
              
              {conversationId && (
                <div className="text-xs text-white/40">
                  Session: {conversationId.slice(-8)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
