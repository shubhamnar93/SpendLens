
## Summary

SpendLens is an AI stack auditing web app that analyzes a user’s current AI tools, usage, and spending to generate personalized recommendations and cost-saving insights. It automatically calculates value scores, highlights overpriced or redundant tools, and produces a shareable AI-generated audit summary. The product is designed for developers, indie hackers, and small teams who want to optimize their AI tooling and reduce unnecessary monthly costs.

## Screenshots
<img width="1920" height="923" alt="Screenshot 2026-05-13 170014" src="https://github.com/user-attachments/assets/1bb757ab-46b6-429d-ab81-5c69545665e6" />
<img width="1919" height="923" alt="Screenshot 2026-05-13 170033" src="https://github.com/user-attachments/assets/b572e8e9-8210-4d95-9335-24069ad4d6d8" />
<img width="1919" height="930" alt="Screenshot 2026-05-13 170108" src="https://github.com/user-attachments/assets/2a43b2ab-4cc5-42e9-a73d-0a06c05982ec" />
<img width="1913" height="921" alt="Screenshot 2026-05-13 170143" src="https://github.com/user-attachments/assets/87968e45-2390-4071-b340-34b9defab1f5" />


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
