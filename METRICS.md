# METRICS.md

## North Star Metric

**Monthly Credit Buyers Generated (MCBG)**

This is the number of users per month who complete the audit and purchase AI credits through Credex.

Why this metric:
SpendLens is not a retention-heavy SaaS; it is a high-intent acquisition funnel. The product’s entire purpose is to convert traffic into credit buyers. Measuring DAU or MAU would be misleading because users only need the tool occasionally. The only metric that directly captures business value is how many paying credit customers the tool generates each month.

If MCBG grows, revenue grows. If it stalls, the product is failing.

---

## Input Metrics That Drive the North Star

### 1) Visitor → Audit Completion Rate
Definition: % of landing page visitors who finish the AI spend audit.

Why it matters:
This measures how compelling the landing page and onboarding experience are. If users don’t start and complete the audit, the funnel never begins.

Target benchmark: **≥ 5%**

Key drivers:
- Landing page clarity
- Perceived value of the audit
- Time-to-complete

---

### 2) Audit → Credit Purchase Conversion Rate
Definition: % of completed audits that convert into a credit purchase.

Why it matters:
This is the most critical conversion in the funnel. It validates that the audit creates enough urgency and trust to drive purchasing behavior.

Target benchmark: **≥ 17%**

Key drivers:
- Quality of recommendations
- Savings visibility
- Trust in Credex
- CTA placement and friction

---

### 3) Cost per Qualified Visitor (CPQV)
Definition: Marketing spend divided by visitors who start the audit.

Why it matters:
Traffic quality matters more than raw traffic. Cheap but unqualified visitors destroy unit economics.

Target benchmark: **≤ $2 per visitor**

---

## What We’d Instrument First

Events to track immediately:

Top of funnel:
- Landing page viewed
- CTA clicked
- Audit started

Mid funnel:
- Audit completed
- Savings generated ($ amount)
- Recommendation viewed

Bottom funnel:
- Clicked “Buy Credits”
- Credit purchase completed
- Revenue per purchase

These events allow full funnel conversion tracking and CAC/LTV validation.

---

## Pivot Trigger

We would consider a major pivot if either condition persists for 8–10 weeks:

**Audit → Purchase conversion < 8%**

OR

**Blended CAC > $350**

Why these numbers:
At 8% conversion, LTV:CAC drops below sustainable levels and the tool stops being a viable acquisition engine. If this happens despite multiple iterations on positioning, UX, and messaging, the core value proposition is likely weak and requires a pivot.