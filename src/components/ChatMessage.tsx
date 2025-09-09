import React from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-3 rounded-lg ${
            isUser
              ? 'bg-blue-600 text-white ml-4'
              : 'bg-white/10 text-white mr-4 border border-white/10'
          } ${isTyping ? 'animate-pulse' : ''}`}
        >
          <div className="whitespace-pre-wrap break-words">
            {isTyping ? (
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            ) : (
              message
            )}
          </div>
        </div>
        <div
          className={`text-xs text-white/40 mt-1 ${
            isUser ? 'text-right mr-4' : 'text-left ml-4'
          }`}
        >
          {formatTime(timestamp)}
        </div>
      </div>
      
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
        isUser
          ? 'order-1 bg-blue-600 text-white'
          : 'order-2 bg-green-600 text-white'
      }`}>
        {isUser ? 'U' : 'AI'}
      </div>
    </div>
  );
};

export default ChatMessage;
