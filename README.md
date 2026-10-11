# Chetana's Hackathon Frontend Workspace

A beginner-friendly setup for the hackathon on 11 October 2026. The competition problem statement has not been supplied yet. This is preparation and a reusable UI example, not a completed competition solution.

## Start in two minutes

1. Download this repository with **Code → Download ZIP**, extract it, then open **index.html** in a browser.
2. Create a ChatGPT Project called **Hackathon Frontend Copilot** and paste **docs/CHATGPT_PROJECT_INSTRUCTIONS.txt** into its instructions. If you prefer this existing chat, just continue here.
3. Send the exact problem statement, deadline, judging criteria, and this repository link.

First message to copy:

> I am Chetana, a complete frontend beginner. Use https://github.com/chetanabonde6-dotcom/p and its AGENTS.md. Here is our exact hackathon problem statement: [paste/attach]. Our deadline is [time and timezone]. Our team's stack is [name or unknown]. Build the strongest small complete frontend demo flow, guide me one step at a time, and clearly distinguish mock data from real APIs.

## What is included

- A buildless, offline starter with responsive layout, search, category filters, bookmarks, a details dialog, loading/error/empty states, and reset.
- A separate mock/live API adapter: **api.js**. Demo mode is clearly labelled; failed live requests are never converted into fake success.
- Beginner ChatGPT Project instructions and prompts.
- A problem brief, backend contract template, and final demo checklist.
- Node syntax/data-adapter checks that need no installed packages.

## Files

| File | Purpose |
| --- | --- |
| index.html | Page structure and accessible controls |
| styles.css | Shared colors, layout, typography, mobile styles |
| api.js | Labelled mock data and explicit live API adapter |
| app.js | Search, filters, bookmarks, dialog, and UI states |
| AGENTS.md | Instructions for coding agents in this repository |
| docs/CHATGPT_PROJECT_INSTRUCTIONS.txt | Copy into the ChatGPT Project's instructions |
| docs/PROJECT_BRIEF.md | Requirements, selected flow, progress checkpoint |
| docs/PROMPTS.md | Copy-paste messages for build, improve, fix, connect, demo |
| docs/BACKEND_HANDOFF.md | API details to agree with the backend teammate |
| docs/DEMO_CHECKLIST.md | Checks and a two-minute presentation outline |

## Open and change it

There are no package installs or framework setup steps. Keep the HTML, CSS, and JavaScript files together. Double-click **index.html** for the mock demo. Bookmark storage is best-effort: browsers may restrict it for local files; the UI still works for the current session.

For a real backend, serve this folder over HTTP using the team's chosen development server. Edit the single **FrontendAPI.config** object in api.js after agreeing on the contract. Set **mode: 'live'** and an appropriate API base URL. Never place a private API key in these files. CORS and deployed backend access must be configured by the backend team.

If the team already has React or another framework, ask ChatGPT to port the useful pieces into that project and preserve the team's conventions. The mock example categories are UI patterns, not the competition's domain.

## Checks

If Node is installed, run:

```text
node --check app.js
node --check api.js
node tests/api.test.cjs
```

**Before presenting:** check the page in a browser, complete the main flow, test a phone-sized layout, and follow docs/DEMO_CHECKLIST.md. A GitHub repository URL is a source-code link; it is not a hosted app link.

## Scope and honesty

This setup cannot guarantee a win. The next high-value step is implementing the exact judging requirements with a reliable working demo. AI assistance does not replace trying the screens or understanding the contribution. No backend, authentication, AI predictions, or public deployment is claimed by this starter.

GitHub owner: **chetanabonde6-dotcom**. Account connection used for this setup: **Chetana**.
