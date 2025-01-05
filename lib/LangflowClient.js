// lib/LangflowClient.js
class LangflowClient {
    constructor(baseUrl, applicationToken) {
        this.baseUrl = baseUrl;
        this.applicationToken = applicationToken;
    }

    async runFlow(flowId, langflowId, inputValue) {
        const response = await fetch(`${this.baseUrl}/api/v1/flows/${flowId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.applicationToken}`,
            },
            body: JSON.stringify({
                langflow_id: langflowId,
                inputs: {
                    input: inputValue
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Langflow API error: ${response.status}`);
        }

        return response.json();
    }
}

export default LangflowClient;