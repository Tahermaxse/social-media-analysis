import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { ChatBot } from '@/components/chat/chat-bot';

const JetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'], // Choose the weights you want
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'FERRANAX - Social Media Analysis',
  description: 'Social Media Analysis Dashboard built with Next.js and Tailwind CSS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-mono overflow-x-hidden">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        <ChatBot />
        </ThemeProvider>
        </body>
    </html>
  );
}
