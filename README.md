# devios.ai
 
A full-stack AI SaaS platform built with Next.js 14 that brings together multiple generative AI capabilities — conversation, image generation, music generation, video generation, and code generation — under a single dashboard with a freemium subscription model powered by Stripe.
 
## Features
 
**AI Tools**
- **Conversation** — Chat with GPT-3.5 Turbo via the OpenAI API
- **Image Generation** — Generate images from text prompts using OpenAI's DALL·E (configurable resolution and batch size)
- **Music Generation** — Create music from text prompts using Replicate's Riffusion model
- **Video Generation** — Generate short videos from text prompts using Replicate's Zeroscope V2 XL model
- **Code Generation** — Get AI-generated code snippets with explanations, rendered in Markdown
**Platform**
- Authentication and user management via Clerk (sign-up, sign-in, session handling)
- Freemium model with 5 free API calls, then upgrade to Pro ($20/month)
- Stripe integration for subscription checkout, billing portal, and webhook-based payment processing
- Persistent API usage tracking per user (MySQL via Prisma ORM)
- Pro subscription modal with one-click upgrade flow
- Real-time free-tier usage counter in the sidebar
- Responsive layout with mobile sidebar support
- Crisp live chat widget for customer support
- Landing page with animated typewriter hero and testimonials section
## Tech Stack
 
| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, tailwindcss-animate |
| UI Components | Radix UI (Dialog, Avatar, Select, Progress, Label), shadcn/ui, Lucide icons |
| Auth | Clerk |
| Database | MySQL with Prisma ORM |
| AI — Text & Image | OpenAI API (GPT-3.5 Turbo, DALL·E) |
| AI — Music & Video | Replicate API (Riffusion, Zeroscope V2 XL) |
| Payments | Stripe (Checkout, Billing Portal, Webhooks) |
| State Management | Zustand |
| Forms | React Hook Form + Zod validation |
| HTTP Client | Axios |
| Notifications | react-hot-toast |
| Live Chat | Crisp SDK |
 
## Project Structure
 
```
devios-ai/
├── app/
│   ├── (auth)/               # Clerk sign-in / sign-up pages
│   ├── (dashboard)/          # Protected dashboard routes
│   │   └── (routes)/
│   │       ├── dashboard/    # Tool selection hub
│   │       ├── conversation/ # Chat interface
│   │       ├── image/        # Image generation UI
│   │       ├── music/        # Music generation UI
│   │       ├── video/        # Video generation UI
│   │       ├── code/         # Code generation UI
│   │       └── settings/     # Subscription management
│   ├── (landing)/            # Public landing page
│   └── api/
│       ├── conversation/     # OpenAI chat completions
│       ├── image/            # OpenAI image generation
│       ├── music/            # Replicate Riffusion
│       ├── video/            # Replicate Zeroscope
│       ├── code/             # OpenAI code generation
│       ├── stripe/           # Checkout session creation
│       └── webhook/          # Stripe webhook handler
├── components/               # Shared UI components
├── hooks/                    # Custom hooks (useProModal)
├── lib/                      # Utilities (Prisma client, Stripe, API limits, subscription checks)
├── prisma/                   # Database schema
└── public/                   # Static assets (logo, images)
```
 
## Getting Started
 
### Prerequisites
 
- Node.js 18+
- MySQL database
- API keys for: OpenAI, Replicate, Clerk, Stripe
### 1. Clone the repository
 
```bash
git clone https://github.com/e-man07/devios-ai.git
cd devios-ai
```
 
### 2. Install dependencies
 
```bash
npm install
```
 
### 3. Set up environment variables
 
Create a `.env` file in the project root:
 
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
 
# OpenAI
OPENAI_API_KEY=
 
# Replicate
REPLICATE_API_TOKEN=
 
# Database
DATABASE_URL=
 
# Stripe
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
 
### 4. Initialize the database
 
```bash
npx prisma db push
```
 
### 5. Run the development server
 
```bash
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) to see the app.
 
## Database Schema
 
The app uses two Prisma models:
 
- **UserApiLimit** — Tracks the number of API calls per user for free-tier enforcement (max 5 free generations)
- **UserSubscription** — Stores Stripe subscription data (customer ID, subscription ID, price ID, period end date) to validate Pro access
## Subscription Flow
 
1. Free users get 5 AI generations across all tools
2. After exhausting free uses, a Pro modal prompts the user to upgrade
3. Clicking "Upgrade" initiates a Stripe Checkout session for $20/month
4. On successful payment, a Stripe webhook writes the subscription to the database
5. Pro users get unlimited generations; subscription status is validated on every API call
