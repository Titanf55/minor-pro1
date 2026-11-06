import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hallucination Detector — SLM meets LLM',
  description: 'Adaptive evidence-grounded hallucination detection using confidence-based routing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="min-h-screen bg-[#f0f4f8] text-slate-800">
        {children}
      </body>
    </html>
  );
}
