## 1) The hardest bug you hit this week, and how you debugged it

The hardest bug this week was when the frontend suddenly stopped connecting to the backend. The application had been working earlier and responses were being generated correctly, so the failure appeared unexpectedly. I began by adding logs everywhere in both the client and server to identify where the request was failing. Surprisingly, the logs showed no obvious errors. Requests were not reaching the expected handlers, and nothing meaningful appeared in the console or server logs.

My next hypothesis was that a recent code change had broken something. I reviewed the recent commits and carefully inspected all modifications, but nothing stood out as a clear cause. Since the bug appeared right after the most recent changes, I tried reverting the latest commit entirely. The issue still persisted, which ruled out most of the application logic as the source.

At this point, I suspected a configuration or serialization issue. I revisited the configuration files and noticed that `superjson` had accidentally been placed outside the `createTRPCClient` configuration. Because of this, the client and server were no longer using the same transformer, which silently broke communication. After moving the configuration to the correct place, the client connected successfully again. This bug reinforced how small configuration mistakes can cause major failures and how systematic debugging is essential.

---

## 2) A decision you reversed mid-week

Mid-week, I reversed my earlier decision regarding the onboarding and scoring complexity. Initially, I wanted to implement a more complex scoring and input flow, assuming that more detailed inputs would improve the audit’s accuracy.

After rethinking the user experience, I realized that this approach added unnecessary friction. The tool is meant to feel fast and simple, not heavy or time-consuming. I decided to simplify the approach and prioritize clarity and usability over complexity. This reversal helped align the product better with its core goal of quick AI stack auditing.

---

## 3) What you would build in week 2 if you had it

If given another week, my primary focus would be improving the shareability and perceived polish of the product. I would design a stronger results UI and a more aggressive sharing experience so users feel motivated to share their audit publicly.

I would also improve the AI response experience. Currently, users must wait after clicking generate, which can feel slow. I would implement skeleton loaders in the AI summary area and generate the AI summary after the results page renders. This would improve perceived performance and make the app feel faster and more responsive.

---

## 4) How you used AI tools

I used AI mainly for improving documentation language, brainstorming ideas, writing test cases, and refining prompts. AI helped speed up exploration and iteration significantly.

However, I intentionally did not rely on AI for architecture decisions, data design, or choosing the tech stack. From past experience, I know that AI-generated setups can be difficult to fully understand and maintain.

One clear example of AI being wrong occurred when I provided an image and asked AI to recreate a UI exactly. The generated result did not match the design accurately, and I had to manually implement the UI myself. This reinforced that AI is helpful for acceleration but cannot replace verification and manual implementation.

---

## 5) Self-rating

**Discipline — 9/10**
I stayed consistent and completed the required work without major delays.

**Code Quality — 6/10**
The app works well but still needs refactoring and cleanup.

**Design Sense — 6/10**
The UI is functional but needs more polish and visual refinement.

**Problem Solving — 8/10**
I successfully diagnosed and fixed a difficult configuration bug.

**Entrepreneurial Thinking — 7/10**
I focused on improving usability and product shareability.
