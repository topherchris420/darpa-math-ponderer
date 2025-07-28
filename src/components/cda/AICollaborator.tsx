import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AICollaborator = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Welcome to the AI Collaborator. How can I assist you in the selected domain?', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const newMessages: Message[] = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { text: `Thinking about "${input}"...`, sender: 'ai' },
      ]);
    }, 1000);
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
