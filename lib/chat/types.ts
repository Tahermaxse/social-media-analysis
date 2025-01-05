export interface Message {
    id: string;
    content: string;
    sender: "user" | "bot";
    timestamp: number;
  }
  
  export interface ChatState {
    isOpen: boolean;
    messages: Message[];
  }