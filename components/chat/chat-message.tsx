import { cn } from "@/lib/utils";
import { Message } from "@/lib/chat/types";
import { BotIcon } from "./bot-icon";

interface ChatMessageProps {
  message: Message;
  isThinking?: boolean;
}

export function ChatMessage({ message, isThinking }: ChatMessageProps) {
  const isBot = message.sender === "bot";
  
  const formatContent = (content: string) => {
    // Check if content contains bullet points (handling different bullet styles like •, -, *, etc.)
    const bulletPatterns = [ '• ', '- ', '* ' ]; // Extend this if needed
    
    let lines = content.split('\n');
    let formattedLines: string[] = [];
    let isListStarted = false;

    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (bulletPatterns.some(pattern => trimmedLine.startsWith(pattern))) {
        if (!isListStarted) {
          formattedLines.push('<ul class="list-disc pl-4">'); // Start an unordered list
          isListStarted = true;
        }
        formattedLines.push(`<li>${trimmedLine.slice(2)}</li>`); // Add list item
      } else {
        if (isListStarted) {
          formattedLines.push('</ul>'); // Close the unordered list if previously opened
          isListStarted = false;
        }
        formattedLines.push(line); // Add the non-list line
      }
    });

    // Ensure the list is properly closed at the end if it was started
    if (isListStarted) {
      formattedLines.push('</ul>');
    }

    return formattedLines.join('\n');
  };

  const renderMessageContent = () => {
    if (isThinking) {
      return <ThinkingIndicator />;
    }

    const formattedContent = formatContent(message.content);
    
    if (formattedContent.includes('<ul>')) {
      return (
        <div 
          className="message-content"
          dangerouslySetInnerHTML={{ __html: formattedContent }}
        />
      );
    }

    return message.content;
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
          "prose prose-ul:mt-1 prose-ul:mb-1 prose-li:mt-0 prose-li:mb-0",
          isBot
            ? "bg-secondary prose-li:text-gray-900"
            : "ml-auto bg-[#D94E1E] text-white prose-li:text-white"
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
