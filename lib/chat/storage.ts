"use client";

import { ChatState, Message } from "./types";

const CHAT_STATE_KEY = "chatbot_state";

export function loadChatState(): ChatState {
  if (typeof window === "undefined") return { isOpen: false, messages: [] };
  
  const saved = localStorage.getItem(CHAT_STATE_KEY);
  if (!saved) {
    const initialState: ChatState = {
      isOpen: false,
      messages: [{
        id: "welcome",
        content: "Hello! How can I help you today?",
        sender: "bot",
        timestamp: Date.now()
      }]
    };
    saveChatState(initialState);
    return initialState;
  }
  
  return JSON.parse(saved);
}

export function saveChatState(state: ChatState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CHAT_STATE_KEY, JSON.stringify(state));
}