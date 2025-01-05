"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./chat-header";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";
import { Message } from "@/lib/chat/types";
import { loadChatState, saveChatState } from "@/lib/chat/storage";
import { sendMessage } from "@/lib/chat/api";
import { cn } from "@/lib/utils";

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const state = loadChatState();
    setIsOpen(state.isOpen);
    setMessages(state.messages);
  }, []);

  useEffect(() => {
    saveChatState({ isOpen, messages });
  }, [isOpen, messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: Date.now(),
    };

    // Add thinking indicator message
    const thinkingMessage: Message = {
      id: 'thinking',
      content: 'thinking',
      sender: 'bot',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage, thinkingMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botMessage = await sendMessage(input);
      // Replace thinking message with actual response
      setMessages(prev => prev.filter(msg => msg.id !== 'thinking').concat(botMessage));
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "Sorry, I couldn't process your message. Please try again.",
        sender: "bot",
        timestamp: Date.now(),
      };
      setMessages(prev => prev.filter(msg => msg.id !== 'thinking').concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed z-50 bottom-4 right-4 w-auto">
      {isOpen ? (
        <Card className={cn(
          "flex flex-col shadow-lg transition-all duration-300",
          "fixed inset-0 rounded-none md:relative md:inset-auto",
          "md:w-[400px] md:h-[550px] md:rounded-lg"
        )}>
          <ChatHeader onClose={() => setIsOpen(false)} />
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message}
                  isThinking={message.id === 'thinking'} 
                />
              ))}
            </div>
          </ScrollArea>
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            isLoading={isLoading}
          />
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "rounded-md full shadow-lg transition-all duration-300",
            "h-14 md:h-12",
            "bg-[#D94E1E] hover:bg-[#D94E1E]/90 text-white",
            "flex items-center justify-center gap-2"
          )}
        >
          <Sparkles className="h-4 w-4" />
          <span className="">Ask Ai</span>
        </Button>
      )}
    </div>
  );
}