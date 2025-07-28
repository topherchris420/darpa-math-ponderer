import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppContext } from '@/context/AppContext';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AICollaborator = () => {
  const { selectedDomain } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      { text: `Welcome to the AI Collaborator. How can I assist you in the ${selectedDomain || 'selected'} domain?`, sender: 'ai' },
    ]);
  }, [selectedDomain]);

  const getAIResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('risk')) {
      return 'Identifying potential risks in this domain... One major risk is the possibility of a surprise attack on our satellite network.';
    }
    if (lowerInput.includes('strategy')) {
      return 'A potential strategy would be to increase our naval presence in the South China Sea to deter aggression.';
    }
    if (lowerInput.includes('vulnerability')) {
      return 'A key vulnerability is our reliance on a single point of entry for our supply chain.';
    }
    return `I'm not sure how to respond to that. I can help with identifying risks, developing strategies, and finding vulnerabilities.`;
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessages: Message[] = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages([...newMessages, { text: aiResponse, sender: 'ai' }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="p-4 rounded-lg bg-slate-800 border border-teal-500/30 h-[500px] flex flex-col">
      <h2 className="text-lg font-light text-white mb-4">AI Collaborator</h2>
      <ScrollArea className="flex-grow mb-4 pr-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg max-w-xs bg-slate-700 text-slate-300">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="bg-slate-700 border-slate-600 text-white"
        />
        <Button onClick={handleSendMessage} className="bg-teal-600 hover:bg-teal-500">
          Send
        </Button>
      </div>
    </div>
  );
};

export default AICollaborator;
