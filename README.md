# Built with Next.js 15, React 19, Tailwind v4, and a fully modern AI-first toolchain.

📲 [Visit project here!](https://nextagent-app.vercel.app/)

# Key features:
🚀 Next.js 15 + React 19
🎨 Tailwind v4 + Shadcn/ui
📡 tRPC for full-stack type safety
🔁 Inngest background jobs
🧠 Inngest agent toolkit
🔐 Clerk authentication
💳 Clerk billing
🧱 Component and app generation from AI prompts
🗂️ Live project preview with URL access
🖥️ E2B cloud sandboxes for runtime execution
🐳 Docker-based sandbox templating
🧠 AI model support (OpenAI, Anthropic, Grok)
📦 Prisma + Neon for database integration
🤖 CodeRabbit AI-powered PR reviews
🧾 Built-in credit system with usage tracking
🧪 Preview + code explorer toggle

### 1. Setup

- Setup Next.js project
  - Confirm environment:
    - Node.js
    - npm
- Verify files & versions
- Setup Shadcn/UI
- Create GitHub repository

### 2. Database

- PostgreSQL database (Neon)
- Setup Prisma
  - Add schema
  - Basic migrations
  - Database studio
  - Database reset

### 3. Setup tRPC

- Experiment with client component
- Experiment with server component
- Preview prefetching

### 5. AI Jobs

- Choose your AI provider
  - OpenAI ✅
    - Best choice 🏆
    - gpt-4.1
    - Normal rate limit, fast reset ✅
  - Anthropic (Claude) ✅
    - claude-sonnet-3.5
    - claude-sonnet-4
    - Strict rate limit, 24h+ reset ❌

### 6. E2B Sandboxes

- Setup E2B
  - Create an account
  - Install CLI
  - Connect to your account
  - Create a Dockerfile template
  - Install Docker
  - Push the template to E2B
- Preview Next.js app inside a Sandbox
  - Start a sandbox in inngest with new template

### 7. Agent Tools

- Add tools to agent
  - "terminal"
  - "createOrUpdateFiles"
  - "readFiles"
- Add a new prompt
- Add agent network & routers

### 8. Messages

- Create "Message" schema
- Create "Fragment" schema
- Save User prompt as message
- Save AI Response as message & fragment

### 9. Projects

- Create "Project" schema
- Add "Message" relations
- Create new project on user prompt
- Preserve "projectId" in background jobs

### 10. Messages UI

- Create Project view
- Create Messages container
  - Create Message card
  - Create Message form
- Modify Messages "getMany" procedure

### 11. Project Header

- Create Project Header
- Add Fragment selection
- Add Loading state

### 12. Fragment View

- Create Fragment View

### 13. Code View

- Create Tabs in Project View
- Create File Explorer
  - Create Code View
  - Create Tree View
  - Create File path Breadcrumbs

### 14. Home Page

- Create Home layout
- Create Home page
  + Create Project form
  + Create Project list

### 15. Theme

- Pick nad apply new theme

### 16. Authentication

- Create a Clerk account
- Setup Clerk
  + Update .env
  + Add ClerkProvider
  + Add Sign in and Sign up screens
  + Add middleware
- Create home layout Navbar
- Create User Control component
- Create protected tRPC procedures
- Update Prisma Schema

### 17. Billing

- Enable billing in Clerk
- Create pricing page
- Add Rate limiting
  + Update prisma schema
  + Create util
- Create Usage component
- Update procedures to trigger credit spend

### 18. Agent Memory

- Add previous messages context
- Add fragment title generation
- Add response message generation

### 19. Bug Fixes

- Increase Sandbox expiration
- Make E2B Template private
- Improve Conversation history
- Improve Error handling

### 20. Deployment

- Deploy to Vercel
- Update Environment variables
  + Redeploy
- Connect Inngest to Vercel
  + Redeploy
- Test the app