# Project brief and checkpoint

## Hackathon requirements

- Participant: Chetana
- Date: 11 October 2026
- Exact competition problem statement: NOT SUPPLIED
- Submission deadline and timezone: UNKNOWN
- Judging criteria: UNKNOWN
- Target user and main demo flow: choose after reading the brief
- Team framework: UNKNOWN; reuse it once identified
- Required features: UNKNOWN
- Backend status and contract: UNKNOWN

## Current preparation

- Repository: https://github.com/chetanabonde6-dotcom/p
- Stack: buildless HTML, CSS, JavaScript; no external dependencies
- Open: download/extract the repository ZIP and open index.html
- Prepared: beginner instructions, prompts, team handoff, demo checklist
- Example flow: search/filter sample patterns → view details → save/remove bookmark
- Data: explicitly labelled demo data; optional live GET /items adapter
- Persistence: browser bookmarks only; no account or backend persistence
- Backend, authentication, AI inference: not implemented
- App deployment: not performed; repository URL is source code
- Verification: see the actual final handoff; browser layout must be checked where tools are available
- Next task: receive the actual problem statement and deadline, then implement the main judged flow

## Update this after each significant task

- Current commit/ZIP:
- Team stack:
- Run/open instructions:
- Finished requirements:
- Known bugs:
- API mode and endpoints:
- Last verified flow:
- Unverified checks:
- Next priority:

## PromptShield frontend checkpoint — 11 October 2026
- Problem: VORTEXA 3.0 C-03 Prompt Injection & Data-Exfiltration Defense.
- Deadline: two hours from user request (exact submission time not stated).
- Source branch: feature/frontend-dashboard (do not merge without integration review).
- Team framework: exception/unspecified; isolated Next.js App Router/TypeScript/Tailwind in frontend/; legacy starter retained.
- Pages: overview, scanner, simulator, policies, evaluation, review queue, audit logs, settings.
- Run: cd frontend && npm install && cp .env.example .env.local && npm run dev; visit http://localhost:3000.
- Build/typecheck: not verified in this environment; use npm run typecheck && npm run build.
- API mode: live-only; configured by NEXT_PUBLIC_API_BASE_URL; no mock success fallback. All API endpoints/schema and auth remain unconfirmed. See frontend/README.md.
- Known blockers: no Python API URL, schema samples, auth roles or CORS settings; cannot verify real scan or authorization.
- Next priority: backend team confirms POST /api/v1/scan JSON and launches endpoint; test one complete scan then verify rest.
