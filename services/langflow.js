// src/services/langflow.js
async function main(inputValue, inputType = 'chat', outputType = 'chat', stream = false) {
    const flowIdOrName = 'e19bddaf-e312-4ed8-aefa-20b862f0dd5f';
    const langflowId = '231347d0-6bd8-49aa-a1c6-a2f67b308cd0';
    const applicationToken = 'AstraCS:kgDvZpwmhGgtYuMoisuKrpHk:96a31c593f945b3fa9227e3210c1379d48aa684e43c9bde19aa35ca78d895158';
    const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

    try {
        const tweaks = {};
        const response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            inputValue,
            inputType,
            outputType,
            tweaks,
            stream,
            (data) => console.log("Received:", data.chunk), // onUpdate
            (message) => console.log("Stream Closed:", message), // onClose
            (error) => console.error("Stream Error:", error) // onError
        );

        if (!stream && response && response.outputs) {
            const posts = response.outputs[0]?.outputs || [];

            const totalEngagement = posts.reduce(
                (acc, post) => ({
                    likes: acc.likes + (post.likes || 0),
                    shares: acc.shares + (post.shares || 0),
                    comments: acc.comments + (post.comments || 0),
                }),
                { likes: 0, shares: 0, comments: 0 }
            );

            const categoryData = posts.map(post => ({
                category: post.type || "Unknown",
                likes: post.likes || 0,
                shares: post.shares || 0,
                comments: post.comments || 0,
            }));

            const totalPosts = posts.length || 1;
            const averageEngagement = {
                likes: ((totalEngagement.likes / totalPosts) || 0).toFixed(2),
                shares: ((totalEngagement.shares / totalPosts) || 0).toFixed(2),
                comments: ((totalEngagement.comments / totalPosts) || 0).toFixed(2),
            };

            return { totalEngagement, categoryData, averageEngagement };
        }
    } catch (error) {
        console.error('Main Error:', error.message);
    }
}

export default main;
