# AI Tools Benchmark & Pricing Comparison

> Scores are estimates based on publicly available model evaluations (SWE-bench, MMLU, HumanEval, WritingBench, GAIA, etc.). Value Score = normalized score ÷ price, scaled to 100. Free tiers score high on value by design.These are approximate and for comparative guidance only.
>
> **Context window note:** Most providers do not publish exact token counts per subscription tier. Where official figures exist they are listed; otherwise community-verified estimates are used and marked with `~`. "Usage limit" refers to rolling per-session or per-hour token budgets, which is different from the maximum context window size a single conversation can hold.

---

## Cursor

> Cursor is an IDE wrapper. Context window depends on the underlying model selected (Claude, GPT, Gemini). The figures below reflect the model context window available through each plan.

| Plan | Price | Context Window | Usage Limit | Coding | Writing | Data | Research | Mixed | Value |
|------|-------|----------------|-------------|--------|---------|------|----------|-------|-------|
| Hobby | Free | ~200K tokens | Limited (slow model) | 72 | 50 | 55 | 52 | 60 | 🟢 High |
| Pro | $20/mo | 200K tokens | ~44K tok/5hr window | 85 | 58 | 68 | 62 | 74 | 🟡 Good |
| Pro+ | $60/mo | 200K–1M tokens | Higher quota | 90 | 62 | 74 | 67 | 79 | 🟡 Moderate |
| Ultra | $200/mo | 1M tokens | Max quota | 94 | 64 | 78 | 70 | 83 | 🔴 Low |
| Teams | $40/mo | 200K tokens | Team-shared quota | 87 | 59 | 70 | 64 | 76 | 🟡 Good |

**Best for:** IDE-integrated coding workflows. Cursor Pro is the sweet spot for individual developers.

---

## GitHub Copilot

> Copilot Chat context window is 64K tokens standard, expandable to 192K in VS Code with supported models. Agent/Cloud mode is capped at ~128K usable prompt tokens (with system overhead, effective usable space is ~60–70% of headline figure).

| Plan | Price | Context Window | Usage Limit | Coding | Writing | Data | Research | Mixed | Value |
|------|-------|----------------|-------------|--------|---------|------|----------|-------|-------|
| Free | Free | 64K tokens | Very limited | 70 | 45 | 52 | 48 | 57 | 🟢 High |
| Pro | $10/mo | 64K tokens | Moderate | 82 | 50 | 60 | 55 | 68 | 🟢 High |
| Pro+ | $39/mo | 192K tokens | Higher | 88 | 54 | 66 | 60 | 74 | 🟡 Good |
| Business | $19/mo | 64K–192K tokens | Team quota | 84 | 52 | 63 | 58 | 71 | 🟡 Good |
| Enterprise | $39/mo | 192K tokens | Enterprise quota | 89 | 56 | 68 | 63 | 76 | 🟡 Moderate |

**Best for:** GitHub-native teams. Pro ($10/mo) offers exceptional value for coding-focused users.

---

## Claude (Anthropic)

> All paid plans include a **200K token context window** in the standard chat interface. Enterprise plans get **500K tokens**. In Claude Code, Max / Team / Enterprise plans get **1M tokens** automatically with Opus 4.7 / Sonnet 4.6. Usage limits (per-session token budgets) differ by plan tier; Anthropic does not publish exact counts but has shared relative multipliers vs. Pro.

| Plan | Price | Context Window | ~Usage Budget (5hr) | Coding | Writing | Data | Research | Mixed | Value |
|------|-------|----------------|----------------------|--------|---------|------|----------|-------|-------|
| Free | Free | 200K tokens | Very limited | 70 | 82 | 72 | 80 | 77 | 🟢 High |
| Pro (annual) | $17/mo | 200K tokens | ~44K tokens | 78 | 90 | 82 | 88 | 86 | 🟢 High |
| Pro (monthly) | $20/mo | 200K tokens | ~44K tokens | 78 | 90 | 82 | 88 | 86 | 🟢 High |
| Max (5×) | $100/mo | 200K / 1M (Code) | ~220K tokens | 85 | 94 | 88 | 93 | 91 | 🟡 Moderate |
| Team Standard (annual) | $20/mo | 200K tokens | ~55K tokens (1.25×) | 79 | 91 | 83 | 89 | 87 | 🟢 High |
| Team Standard (monthly) | $25/mo | 200K tokens | ~55K tokens (1.25×) | 79 | 91 | 83 | 89 | 87 | 🟢 High |
| Team Premium (annual) | $100/mo | 200K / 1M (Code) | ~275K tokens (6.25×) | 86 | 95 | 89 | 94 | 92 | 🟡 Moderate |
| Team Premium (monthly) | $125/mo | 200K / 1M (Code) | ~275K tokens (6.25×) | 86 | 95 | 89 | 94 | 92 | 🟡 Low |
| Enterprise | $20+/mo | **500K tokens** | Custom | 80 | 91 | 84 | 90 | 87 | 🟢 High |

### Claude API (Direct)

> API models have no subscription usage cap — you pay per token. All models support up to **1M token context window** (Sonnet 4.6 and Opus 4.7). Output capped at 64K tokens per response (standard).

| Model | Input | Output | Context Window | Coding | Writing | Data | Research | Mixed |
|-------|-------|--------|----------------|--------|---------|------|----------|-------|
| Opus 4.7 | $5/Mtok | $25/Mtok | 1M tokens | 88 | 95 | 90 | 95 | 93 |
| Sonnet 4.6 | $3/Mtok | $15/Mtok | 1M tokens | 84 | 90 | 86 | 90 | 88 |
| Haiku 4.5 | $1/Mtok | $5/Mtok | 200K tokens | 72 | 78 | 74 | 76 | 75 |

**Best for:** Writing, research, and long-context reasoning. Claude Pro is the strongest all-rounder at the $20 price point. Opus 4.7 via API is best-in-class for writing and research.

---

## ChatGPT (OpenAI)

> ChatGPT context windows vary by model mode. GPT-5 Instant: 32K tokens. GPT-5 Thinking/Pro mode: 196K tokens. ChatGPT Pro plan gets 128K (4× Plus). Business plan: 196K for Thinking/Pro modes, 32K for Instant. OpenAI does not publish per-message rate limits publicly — "virtually unlimited" on Business/Pro is subject to fair-use guardrails.

| Plan | Price | Context Window | Usage Limit | Coding | Writing | Data | Research | Mixed | Value |
|------|-------|----------------|-------------|--------|---------|------|----------|-------|-------|
| Go | $4.24/mo | 32K tokens | Limited | 68 | 80 | 72 | 78 | 75 | 🟢 High |
| Plus | $21.22/mo | 32K tokens (Instant) / 196K (Thinking) | 3,000 msg/wk on Thinking | 80 | 88 | 82 | 86 | 85 | 🟢 High |
| Pro | $113.58/mo | **128K tokens** | Virtually unlimited | 87 | 92 | 88 | 91 | 90 | 🟡 Moderate |
| Business | $19.11/mo | 196K tokens (Thinking) | Virtually unlimited | 79 | 87 | 81 | 85 | 84 | 🟢 High |

### OpenAI API (Direct)

> GPT-5 API supports up to 400K context; GPT-4.1 (via API) supports 1M tokens. Subscription plans cap context lower than raw API access.

| Model | Input | Output | Context Window | Coding | Writing | Data | Research | Mixed |
|-------|-------|--------|----------------|--------|---------|------|----------|-------|
| GPT-5.5 | $5/Mtok | $30/Mtok | 400K tokens | 89 | 93 | 90 | 93 | 92 |
| GPT-5.4 | $2.5/Mtok | $15/Mtok | 128K tokens | 84 | 88 | 85 | 88 | 87 |
| GPT-5.4 mini | $0.75/Mtok | $4.5/Mtok | 128K tokens | 74 | 78 | 75 | 76 | 76 |

**Best for:** General-purpose use with strong writing and data capabilities. ChatGPT Plus ($21/mo) and Business ($19/mo) are compelling mid-tier options. Go plan offers surprising value for light users.

---

## Gemini (Google)

> Gemini Pro (web) provides a **1M token context window** — the largest available in a consumer subscription. Gemini Free uses Flash models with up to 200K tokens. API access via Gemini 1.5 Pro supports up to **2M tokens**.

| Plan | Price | Context Window | Usage Limit | Coding | Writing | Data | Research | Mixed | Value |
|------|-------|----------------|-------------|--------|---------|------|----------|-------|-------|
| Free | Free | 200K tokens (Flash) | Limited | 65 | 78 | 70 | 76 | 73 | 🟢 High |
| Plus | $4.24/mo | 1M tokens | Moderate | 73 | 83 | 76 | 81 | 79 | 🟢 High |
| Pro | $20.7/mo | **1M tokens** | High | 80 | 87 | 82 | 86 | 84 | 🟢 High |

**Best for:** Google Workspace-integrated workflows and large-document analysis. Gemini Pro's 1M context at $20/mo is unmatched value for long-context tasks. Very competitive pricing overall.

---

## Windsurf

> Windsurf context window depends on the underlying model selected. Max plan prioritizes access to largest available models (Claude Sonnet 4.6 = 1M, GPT-5 = 400K).

| Plan | Price | Context Window | Usage Limit | Coding | Writing | Data | Research | Mixed | Value |
|------|-------|----------------|-------------|--------|---------|------|----------|-------|-------|
| Free | Free | ~64K tokens | Very limited | 68 | 46 | 52 | 48 | 56 | 🟢 High |
| Pro | $20/mo | 200K tokens | Moderate | 83 | 54 | 65 | 58 | 72 | 🟡 Good |
| Max | $200/mo | 200K–1M tokens | Max quota | 92 | 60 | 76 | 66 | 81 | 🔴 Low |
| Teams | $40/mo | 200K tokens | Team quota | 85 | 56 | 67 | 60 | 74 | 🟡 Good |

**Best for:** Coding-focused users who prefer the Windsurf IDE experience. Max tier competes with Cursor Ultra on coding. Weak on writing/research compared to general-purpose tools.

---

## v0 (Vercel)

> v0 is purpose-built for UI generation (React/Next.js). Context window is not publicly disclosed; estimated at ~32–64K tokens based on user reports.

| Plan | Price | Context Window | Usage Limit | Coding | Writing | Data | Research | Mixed | Value |
|------|-------|----------------|-------------|--------|---------|------|----------|-------|-------|
| Free | Free | ~32K tokens | Very limited | 60 | 48 | 45 | 42 | 50 | 🟡 Moderate |
| Teams / Business | $30/mo | ~64K tokens | Moderate | 74 | 56 | 55 | 50 | 63 | 🟡 Moderate |

**Best for:** UI/frontend generation specifically (React, Next.js). Not a general-purpose tool — benchmark scores reflect this narrow focus. Pair with another tool for non-frontend tasks.

---

## Head-to-Head: Best Picks by Use Case

### 🖥️ Coding

| Rank | Plan | Score | Price | Notes |
|------|------|-------|-------|-------|
| 1 | Cursor Ultra | 94 | $200/mo | Top IDE experience |
| 2 | Windsurf Max | 92 | $200/mo | Close competitor |
| 3 | OpenAI API: GPT-5.5 | 89 | Pay-per-use | Best if building |
| 4 | Copilot Enterprise | 89 | $39/mo | Best value at high end |
| 5 | Cursor Pro+ | 90 | $60/mo | Best mid-tier IDE |
| ⭐ Value pick | Copilot Pro | 82 | $10/mo | Exceptional ROI |

### ✍️ Writing

| Rank | Plan | Score | Price | Notes |
|------|------|-------|-------|-------|
| 1 | Claude Team Premium | 95 | $100–125/mo | Best-in-class |
| 2 | Claude API: Opus 4.7 | 95 | Pay-per-use | Matched at top |
| 3 | Claude Max | 94 | $100/mo | Strong value at tier |
| 4 | ChatGPT Pro | 92 | $113.58/mo | Close competitor |
| 5 | OpenAI API: GPT-5.5 | 93 | Pay-per-use | API alternative |
| ⭐ Value pick | Claude Pro | 90 | $17–20/mo | Best writing per dollar |

### 📊 Data Analysis

| Rank | Plan | Score | Price | Notes |
|------|------|-------|-------|-------|
| 1 | Claude Team Premium | 89 | $100–125/mo | Narrowly leads |
| 2 | Claude API: Opus 4.7 | 90 | Pay-per-use | Top API option |
| 3 | ChatGPT Pro | 88 | $113.58/mo | Strong code interpreter |
| 4 | OpenAI API: GPT-5.5 | 90 | Pay-per-use | Matched at API level |
| 5 | Claude Max | 88 | $100/mo | Tied with ChatGPT Pro |
| ⭐ Value pick | Gemini Pro | 82 | $20.7/mo | Excellent value |

### 🔍 Research

| Rank | Plan | Score | Price | Notes |
|------|------|-------|-------|-------|
| 1 | Claude API: Opus 4.7 | 95 | Pay-per-use | Best reasoning |
| 2 | Claude Team Premium | 94 | $100–125/mo | Best subscription |
| 3 | Claude Max | 93 | $100/mo | Close behind |
| 4 | OpenAI API: GPT-5.5 | 93 | Pay-per-use | Matched at API |
| 5 | ChatGPT Pro | 91 | $113.58/mo | Strong all-round |
| ⭐ Value pick | Claude Pro | 88 | $17–20/mo | Outstanding value |

### ⚡ Mixed (All-rounder)

| Rank | Plan | Score | Price | Notes |
|------|------|-------|-------|-------|
| 1 | Claude API: Opus 4.7 | 93 | Pay-per-use | Overall leader |
| 2 | OpenAI API: GPT-5.5 | 92 | Pay-per-use | Matches for coding |
| 3 | Claude Team Premium | 92 | $100–125/mo | Best subscription |
| 4 | ChatGPT Pro | 90 | $113.58/mo | Strong generalist |
| 5 | Claude Max | 91 | $100/mo | Best value at top tier |
| ⭐ Value pick | Claude Pro | 86 | $17–20/mo | Best all-round value |

---

## Summary: Who Should Use What

| Profile | Recommended Plan | Price |
|---------|-----------------|-------|
| Solo developer (coding focus) | Copilot Pro or Cursor Pro | $10–20/mo |
| Power developer (IDE) | Cursor Pro+ or Windsurf Pro | $20–60/mo |
| Writer / content creator | Claude Pro | $17–20/mo |
| Researcher / analyst | Claude Pro or Gemini Pro | $17–21/mo |
| Data scientist | ChatGPT Plus or Claude Pro | $20–21/mo |
| General all-rounder (budget) | Claude Pro or ChatGPT Plus | $17–21/mo |
| Frontend/UI builder | v0 Teams + Claude Pro | $30 + $20/mo |
| Enterprise (coding) | Copilot Enterprise or Cursor Teams | $39–40/mo |
| Enterprise (general) | Claude Enterprise or ChatGPT Business | $19–20/mo |
| API builder (performance) | Claude Opus 4.7 or GPT-5.5 | Pay-per-use |
| API builder (cost-efficient) | Claude Sonnet 4.6 or GPT-5.4 mini | Pay-per-use |

---

*Last updated: May 2025. Prices converted to USD. Scores are estimates for comparative purposes — verify with provider benchmarks before making purchasing decisions.*
