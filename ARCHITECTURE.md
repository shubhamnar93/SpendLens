# Architecture.md — AI Spend Audit (Credex)

## Product Summary

This product is a free web application that audits a startup’s AI tool spending and instantly shows:

* Where they are overspending
* Which plans or tools they should switch to
* How much money they can save monthly and annually

After delivering value upfront, the app offers a **shareable report** and an **optional consultation**, helping companies optimize AI costs while generating qualified leads for Credex’s discounted AI infrastructure credits.

---

# Tech Stack

## Next.js
**Why**
* Built-in SSR, routing, and API layer
* Optimized for Vercel deployment
* Enables faster development

---

## TypeScript (Strict Mode)
**Why**
* Prevents runtime bugs via static typing
* Enables end-to-end type safety
* Makes APIs, database queries, and validation safer

---

## tRPC
**Why**
* End-to-end type safety between frontend and backend
* No need to write REST endpoints or Swagger documentation
* Faster development with fewer integration bugs

---

## PostgreSQL (Neon)
**Why**
* Reliable and scalable relational database
* ACID compliance and strong ecosystem
* Works well with serverless deployment

---

## Prisma
**Why**
* Type-safe database access
* Easy schema migrations
* Excellent developer experience
* Tight integration with TypeScript and PostgreSQL

---

## Tailwind CSS
**Why**
* Rapid UI development
* Consistent design system
* Small CSS bundle size

---

## Vercel
**Why**
* Zero-configuration deployment for Next.js
* Global CDN and serverless functions
* Automatic CI/CD from GitHub
* Preview deployments for every commit
* Ideal for fast MVP shipping

---

# Features To Be Implemented

## Landing Page

* CTA button → “Run Free AI Spend Audit”
* Navigates to the form page

---

## Input Form

Collect:

* AI tools used
* Monthly spend
* Team size
* Primary use case
* Custom tool input (optional)

Requirement:

* Form state must persist across page reloads.

---

## On-Screen Audit Results

The results page must show:

### Audit Insights

* Where the company is overspending
* What to switch or downgrade
* Total potential monthly and annual savings

### UI Requirements

For each tool:

* Current spend
* Recommended action
* Spend after recommendation
* Savings amount
* One-sentence reason

Summary section:

* Total monthly savings
* Total annual savings
* AI-generated summary (with fallback)

### Benchmark Mode

Display comparison such as:

> “Your AI spend per developer is X — companies your size average Y.”

---

## Email Registration

Capture:

* Email
* Company name
* Role
* Team size


### Lead Qualification Rule

If savings > **$500/month**:

* Offer option to book consultation
* Mark as high-value lead
### Email Workflow

* Send transactional confirmation email
* Inform user that Credex will reach out for high-savings cases

### Security

* hCaptcha required
* Prevent abuse and bot submissions

---

## Audit Engine Requirements

The audit engine uses a **static knowledge dataset** and must determine:

1. Are users on the correct plan for their usage?
2. Is there a cheaper plan from the same vendor?
3. Is there a significantly cheaper alternative tool with similar capabilities?

---

## Shareable Report URL

Must support:

* Open Graph tags for link previews
* Public page showing tools and savings numbers

---

## Performance Requirements

Lighthouse mobile scores on deployed URL:

* Performance ≥ 85
* Accessibility ≥ 90
* Best Practices ≥ 90

---

## Testing Requirements

* Minimum **5 tests** for the audit engine
* **80% test coverage**
* GitHub Actions CI workflow:

`.github/workflows/ci.yml`

Pipeline must run:

* Linting
* Tests on every push to main

---

# User Flow
```mermaid
flowchart TD
    A([🏠 Landing page]) --> B

    B["Run Free AI Spend Audit
    User clicks CTA button"]:::userAction

    B --> C

    C["Company info form
    Fill details + complete CAPTCHA"]:::userAction

    C --> D

    D["Audit engine
    Processes data in real time"]:::system

    D --> E

    E["Results displayed instantly"]:::system

    E --> F

    F["Enter email
    Unlock next step"]:::gate

    F -->|Download report| G
    F -->|High savings?| H

    G["Download PDF"]:::download
    H["Book consultation"]:::consult

    G --> I
    H --> I

    I["Confirmation email sent
    Report + next steps delivered"]:::system

    I --> J

    J["Share savings
    Public report URL generated"]:::userAction

    classDef userAction fill:#EEEDFE,stroke:#534AB7,color:#26215C
    classDef system    fill:#E1F5EE,stroke:#0F6E56,color:#04342C
    classDef gate      fill:#FAEEDA,stroke:#854F0B,color:#412402
    classDef download  fill:#E6F1FB,stroke:#185FA5,color:#042C53
    classDef consult   fill:#FAECE7,stroke:#993C1D,color:#4A1B0C
```

1. User lands on the landing page
2. Clicks **Run Free AI Spend Audit**
3. Fills company information and completes CAPTCHA
4. Audit engine processes data
5. Results are displayed instantly
6. User enters email to:
   * Download report, or
   * Book free consultation (if high savings)
7. Confirmation email is sent
8. User can share the savings via public report URL

---
# Database Desgin

```mermaid
erDiagram
    User {
        String id PK
        String email
        String companyName
        String role
        Int teamSize
        Boolean consultationRequested
        Boolean consultationCompleted
        DateTime createdAt
        DateTime updatedAt
    }

    Audit {
        String id PK
        String userId FK
        Float monthlySaving
        Float annualSaving
        Float totalCurrentSpend
        Float totalOptimizedSpend
        String summary
        Int teamSize
        String shareLinkId
        DateTime createdAt
        DateTime updatedAt
    }

    Tool {
        String id PK
        String auditId FK
        String toolName
        Int seats
        String useCase
    }

    Recommendation {
        String id PK
        String auditId FK
        String toolName
        String action
        String reason
        Float currentSpend
        Float newSpend
        Float savings
    }

    User ||--o{ Audit : "has"
    Audit ||--o{ Tool : "uses"
    Audit ||--o{ Recommendation : "has"
```

---

# Detailed Data Flow

## Audit genration 
```mermaid
flowchart TD
    A([User submits form]) --> B[Frontend\ntrpc.audit.run]

    B --> C

    subgraph Server
        C[Input validation\nZod schema]
        C --> D[Load knowledge dataset\nStatic data]
        D --> E[Run audit engine]
        E --> F[(Store results\nDB)]
    end

    E --> G([Return audit results\nRendered in UI])
```

1. User submits form.
2. Frontend calls trpc.audit.run.
3. Server performs:
    * Input validation (Zod)
    * Load static knowledge dataset
    * Run audit engine
    * Store results in DB
4. Return audit results to UI.

# Email Unlock Flow
```mermaid
flowchart TD
    A([Audit complete\nCost calculated]) --> B{Cost < $100/mo?}

    B -->|Yes| C[/"&quot;Looks healthy — want an arch review checklist?&quot;"/]
    C --> H

    B -->|No >$100| D[High spend — show options]
    D --> E{User chooses?}
    E -->|Book consulting| F[Book consulting]
    E -->|Download report| G[Download report]
    F --> H[User enters email]
    G --> H

    subgraph Server
        H --> I[Verify hCaptcha]
        I --> J[Save user record\nDB write]
        J --> K{Booked consulting?}

        K -->|Yes — >$100 only| L[Send confirmation\n+ report email]
        K -->|No — >$100 only| M[Send report email]
        K -->|<$100 path| N2[No email sent]

        L --> N{Savings > $500?}
        M --> N

        N -->|Yes| O[Mark high-value lead]
        N -->|No| P[Done — standard lead]
    end
```
1. For audits showing cost <$100/mo show - You’re spending looks healthy want a deeper architecture review checklist
2. For above it give them option to book consulting or download report to cature email
4. User enters email.
5. Server:
    * Verifies hCaptcha
    * Saves user record
    * Sends confirmation email with report for people who have booked cosulting
    * Sends report who havent booked consulting cost >$100/mo
    * Marks high-value leads if savings > $500


# Caching Strategy
Because the dataset is static:

| Layer               | Strategy                  |
| ------------------- | ------------------------- |
| Knowledge dataset   | In-memory cache           |
| Public report pages | Edge caching (Vercel CDN) |
| tRPC responses      | No caching                |

# Security Architecture
## Input Security
* Zod validation for all API inputs
* Server-side validation only (never trust client)
## Abuse Prevention
* hCaptcha on email submission
## Data Protection
* No passwords stored
* Only business email + company info
* HTTPS enforced by Vercel
## Secrets Management
* Environment variables stored in Vercel

# Performance Strategy
## Key Optimizations
### Server
* Server Components by default
* Streaming SSR for results page
* Edge rendering for public reports
### Client
* Minimal JS bundle
* Tailwind tree-shaking
* Image optimization
### Database
Indexes required:

| Table | Index       |
| ----- | ----------- |
| User  | email       |
| Audit | userId      |

# CI/CD Pipeline

GitHub Actions workflow must run on every push.
Pipeline steps:

1. Install dependencies
2. Type check
3. Lint
4. Run tests
5. Build Next.js app

Failure blocks deployment.