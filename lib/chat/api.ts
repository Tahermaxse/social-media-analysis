// lib/chat/api.ts
import { Message } from "./types";

class LangflowClient {
    private baseURL: string;
    private applicationToken: string;
    private flowId: string;
    private langflowId: string;

    constructor() {
        if (typeof window !== 'undefined') {
            throw new Error('LangflowClient should only be instantiated on the server side');
        }

        this.baseURL = 'https://api.langflow.astra.datastax.com';
        this.applicationToken = process.env.LANGFLOW_APPLICATION_TOKEN || '';
        this.flowId = process.env.LANGFLOW_FLOW_ID || 'e19bddaf-e312-4ed8-aefa-20b862f0dd5f';
        this.langflowId = process.env.LANGFLOW_ID || '231347d0-6bd8-49aa-a1c6-a2f67b308cd0';

        if (!this.applicationToken) {
            throw new Error('LANGFLOW_APPLICATION_TOKEN is required');
        }
    }

    private async post(endpoint: string, body: any) {
        const headers = {
            "Authorization": `Bearer ${this.applicationToken}`,
            "Content-Type": "application/json"
        };

        const url = `${this.baseURL}${endpoint}`;
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        return response.json();
    }

    async sendMessage(message: string): Promise<any> {
        const endpoint = `/lf/${this.langflowId}/api/v1/run/${this.flowId}?stream=false`;
        const tweaks = {
            "Prompt-afQuL": {},
            "OpenAIModel-Wb3Qu": {},
            "ChatInput-xJcBD": {},
            "ChatOutput-o6So5": {},
            "AstraDB-LNc2P": {},
            "ParseData-EogdC": {},
            "TextInput-CUixh": {},
            "Google Generative AI Embeddings-PjYj2": {},
            "File-A8gVU": {},
            "SplitText-jYILK": {},
            "AstraDB-tYtTl": {},
            "Google Generative AI Embeddings-h0d4W": {},
            "GoogleGenerativeAIModel-i95yB": {}
        };

        return this.post(endpoint, {
            input_value: message,
            input_type: 'chat',
            output_type: 'chat',
            tweaks
        });
    }
}

// This will be our API route handler
export async function createChatAPIRoute(req: Request) {
    try {
        const { message } = await req.json();
        
        if (!message || typeof message !== 'string') {
            throw new Error('Please provide a valid message');
        }

        const langflowClient = new LangflowClient();
        const response = await langflowClient.sendMessage(message);
        
        if (!response?.outputs?.[0]?.outputs?.[0]?.outputs?.message) {
            throw new Error('Invalid response format from Langflow');
        }

        const botMessage: Message = {
            id: Date.now().toString(),
            content: response.outputs[0].outputs[0].outputs.message.message.text,
            sender: 'bot',
            timestamp: Date.now()
        };

        return { status: 200, data: botMessage };
    } catch (error) {
        console.error('Chat API Error:', error);
        return {
            status: 500,
            data: {
                id: Date.now().toString(),
                content: error.message || "An unexpected error occurred",
                sender: 'bot',
                timestamp: Date.now()
            }
        };
    }
}

// Client-side API function
export async function sendMessage(message: string): Promise<Message> {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });

    if (!response.ok) {
        throw new Error('Failed to send message');
    }

    return response.json();
}