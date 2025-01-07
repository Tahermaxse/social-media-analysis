import { cn } from "@/lib/utils";
import { Message } from "@/lib/chat/types";
import { BotIcon } from "./bot-icon";

interface ChatMessageProps {
  message: Message;
  isThinking?: boolean;
}

export function ChatMessage({ message, isThinking }: ChatMessageProps) {
  const isBot = message.sender === "bot";

  // Helper function to handle newlines in text
  const formatTextWithNewlines = (text: string) => {
    return text.split('\\n').map((line, index, array) => (
      <span key={index}>
        {line}
        {index < array.length - 1 && <br />}
      </span>
    ));
  };

  const formatMetricResponse = (content: string) => {
    const metricMatch = content.match(/^(Total \w+(?:\s+\w+)*) is ([\d,]+)/i);
    if (!metricMatch) {
      return null;
    }

    const sections = {
      metric: metricMatch[0],
      keyInsight: content.includes('Key Insight:') ? 
        content.split('Key Insight:')[1].split('Context:')[0].trim() : null,
      context: content.includes('Context:') ? 
        content.split('Context:')[1].split('Next Steps:')[0].trim() : null,
      nextSteps: content.includes('Next Steps:') ? 
        content.split('Next Steps:')[1].trim() : null
    };

    return (
      <div className="metric-response space-y-3">
        <div className="font-semibold text-lg">
          {formatTextWithNewlines(sections.metric)}
        </div>
        
        {sections.keyInsight && (
          <div>
            <h3 className="font-medium mb-1">Key Insight</h3>
            <p>{formatTextWithNewlines(sections.keyInsight)}</p>
          </div>
        )}
        
        {sections.context && (
          <div>
            <h3 className="font-medium mb-1">Context</h3>
            <p>{formatTextWithNewlines(sections.context)}</p>
          </div>
        )}
        
        {sections.nextSteps && (
          <div>
            <h3 className="font-medium mb-1">Next Steps</h3>
            <p>{formatTextWithNewlines(sections.nextSteps)}</p>
          </div>
        )}
      </div>
    );
  };

  const formatNumberedInsights = (content: string) => {
    if (!content.includes('Based on the data provided, here are the insights:')) {
      return null;
    }

    const insights = content
      .replace('Based on the data provided, here are the insights:', '')
      .trim()
      .split(/(?=\d+\.)/)
      .filter(insight => insight.trim());

    const formatInsight = (insight: string) => {
      const [title, ...points] = insight
        .split(/\n|\\n/)
        .map(line => line.trim())
        .filter(Boolean);
      return {
        title: title.replace(/^\d+\./, '').trim(),
        points: points.filter(point => point.startsWith('-')).map(point => point.substring(1).trim())
      };
    };

    const formattedInsights = insights.map(formatInsight);

    return (
      <div className="insights-response">
        <h3 className="font-semibold text-lg mb-4">Key Insights</h3>
        {formattedInsights.map((insight, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-medium mb-2">{index + 1}. {formatTextWithNewlines(insight.title)}</h4>
            <ul className="list-disc pl-4 space-y-1">
              {insight.points.map((point, pointIndex) => (
                <li key={pointIndex}>{formatTextWithNewlines(point)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const formatAnalyticsContent = (content: string) => {
    const hasAnalyticsStructure = content.includes('KEY FINDING:') && 
                                 content.includes('DETAILED METRICS:') && 
                                 content.includes('RECOMMENDATIONS:');

    if (!hasAnalyticsStructure) {
      return null;
    }

    const sections = {
      keyFinding: content.split('DETAILED METRICS:')[0].replace('KEY FINDING:', '').trim(),
      detailedMetrics: content.split('DETAILED METRICS:')[1].split('RECOMMENDATIONS:')[0].trim(),
      recommendations: content.split('RECOMMENDATIONS:')[1].trim()
    };

    const metrics = sections.detailedMetrics
      .split(/\n|\\n/)
      .map(metric => metric.trim())
      .filter(metric => metric.startsWith('-'))
      .map(metric => metric.substring(1).trim());

    const recommendations = sections.recommendations
      .split(/\n|\\n/)
      .map(rec => rec.trim())
      .filter(rec => rec.match(/^\d+\./))
      .map(rec => rec.replace(/^\d+\./, '').trim());

    return (
      <div className="analytics-response">
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Key Finding</h3>
          <p>{formatTextWithNewlines(sections.keyFinding)}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Detailed Metrics</h3>
          <ul className="list-disc pl-4 space-y-1">
            {metrics.map((metric, index) => (
              <li key={index}>{formatTextWithNewlines(metric)}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
          <ol className="list-decimal pl-4 space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index}>{formatTextWithNewlines(rec)}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  };

  const renderMessageContent = () => {
    if (isThinking) {
      return <ThinkingIndicator />;
    }

    const content = message.content;

    // Try each format in order
    const metricResponse = formatMetricResponse(content);
    if (metricResponse) {
      return metricResponse;
    }

    const analyticsContent = formatAnalyticsContent(content);
    if (analyticsContent) {
      return analyticsContent;
    }

    const numberedInsights = formatNumberedInsights(content);
    if (numberedInsights) {
      return numberedInsights;
    }

    // If no special formatting applies, return with newline formatting
    return <div>{formatTextWithNewlines(content)}</div>;
  };

  return (
    <div className="flex items-start gap-2">
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D94E1E] flex items-center justify-center text">
          <BotIcon />
        </div>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-lg p-3 break-words",
          "prose prose-headings:mt-0 prose-headings:mb-2",
          "prose-ul:mt-1 prose-ul:mb-1 prose-li:mt-0 prose-li:mb-0",
          "prose-h4:text-base prose-h4:font-medium",
          isBot
            ? "bg-secondary prose-li:text-gray-900 prose-headings:text-gray-900"
            : "ml-auto bg-[#D94E1E] text-white prose-li:text-white prose-headings:text-white"
        )}
      >
        {renderMessageContent()}
      </div>
    </div>
  );
}

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-2 h-2 rounded-full bg-[#D94E1E] animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="w-2 h-2 rounded-full bg-[#D94E1E] animate-bounce" style={{ animationDelay: '0.2s' }} />
      <div className="w-2 h-2 rounded-full bg-[#D94E1E] animate-bounce" style={{ animationDelay: '0.4s' }} />
    </div>
  );
}