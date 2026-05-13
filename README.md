## Summary

SpendLens is an AI stack auditing web app that analyzes a user’s current AI tools, usage, and spending to generate personalized recommendations and cost-saving insights. It automatically calculates value scores, highlights overpriced or redundant tools, and produces a shareable AI-generated audit summary. The product is designed for developers, indie hackers, and small teams who want to optimize their AI tooling and reduce unnecessary monthly costs.

## Screenshots
(3 screenshot)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/spendlens.git
cd spendlens
```
### 2. Install dependencies
```bash
npm install
```
### 3. Setup environment variables
```bash
cp .env.example .env
```
### 4. Setup the database
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```
### 5. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser 

### 6. Deploy (Vercel)

The app is optimized for Vercel deployment:

1. Push the repo to GitHub
2. Import the project in Vercel
3. Add the same environment variables in Vercel settings
4. Deploy

## Decisions

Here are 5 key trade-offs made during the development of SpendLens:

1. **Next.js App Router over Pages Router**: Chose the App Router for its improved performance, nested layouts, and better SEO capabilities. Trade-off: It has a steeper learning curve and requires more careful handling of server components compared to the familiar Pages Router.

2. **Drizzle ORM over Prisma**: Opted for Drizzle due to its lightweight nature, excellent TypeScript integration, and simpler migration process. Trade-off: It offers fewer advanced features like database introspection and schema visualization compared to Prisma.

3. **tRPC over REST API**: Implemented tRPC for end-to-end type safety between frontend and backend, reducing runtime errors. Trade-off: It introduces additional complexity in the build setup and requires team members to be familiar with the tRPC paradigm.

4. **Tailwind CSS for styling**: Used Tailwind's utility-first approach for rapid UI development and consistent design. Trade-off: It can lead to verbose class strings in JSX, making components harder to read at a glance compared to traditional CSS frameworks.

5. **AI-powered audit summaries**: Integrated AI (via OpenAI) to generate personalized, insightful summaries. Trade-off: This adds operational costs and dependency on external AI services, but provides a unique value proposition that manual analysis couldn't match.

## deployed URL 

https://spend-lens-omega.vercel.app/