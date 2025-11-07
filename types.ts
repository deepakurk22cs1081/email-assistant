
export interface Message {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface Email {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  snippet: string;
  messages: Message[];
}
   