A modern, responsive stock search and analysis dashboard built with Next.js 14, TypeScript, and shadcn/ui. Search stocks via Finnhub API, get AI-powered analysis, and manage your watchlist seamlessly.

✨ Features
🔍 Real-time Stock Search - Search by symbol or company name (AAPL, Tesla, INFY...)
📊 AI Stock Analysis - One-click detailed analysis for any stock
📱 Per-Card Info Display - Analysis stays in the card, no modals
⭐ Watchlist Management - Add stocks to your personal watchlist
⚡ Proper Authentication - Only registered users can obtain the functionality
📱 Fully Responsive - Works on mobile, tablet, desktop
🛡️ TypeScript - Full type safety end-to-end

Frontend: Next.js 14 (App Router) + TypeScript + TailwindCSS + shadcn/ui
Backend: Inngest (Background Jobs) + Nodemailer (Emails)
APIs: Finnhub + Custom AI Analysis(using Gemini)
Database: MongoDB
Email: Nodemailer
Deployment: Vercel + Inngest Cloud

🔌 API Endpoints
Endpoint	Method	Purpose	Request Body
/api/getinfo	POST	AI Stock Analysis	{ stockName: string, description: string }
/api/watchlist	POST	Add to Watchlist	{ stockName: string }


