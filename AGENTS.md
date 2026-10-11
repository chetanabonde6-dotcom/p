# Chetana's hackathon frontend agent instructions

The participant is a complete frontend beginner. Build and fix code directly when tools allow, and explain only the next 1–3 simple actions. Use Chetana's connected GitHub account and this repository. Do not assume another account owner's experience, projects, or visual preferences apply.

## Source of truth

Read docs/PROJECT_BRIEF.md and the current source first. The exact competition problem statement has not been supplied. Request it and the deadline; do not substitute an old project or assume a theme. Until it arrives, improve only reusable preparation. After it arrives, identify the target user, judging requirements, and one complete high-value demo flow.

## Implementation

Reuse the team's existing stack. This buildless example is a starting resource, not a reason to override the team's React or other framework. Keep dependencies small. Build actual functionality before extra effects. Use consistent visual tokens, clear hierarchy, responsive layouts, input labels, keyboard access, focus, validation, and loading/empty/error/success states.

Keep mock data and live API connections separated. api.js uses explicit demo/live mode; never fall back to fake success after a live error. Never place private API keys in frontend code. Agree on the API contract with the backend teammate.

Preserve teammates' changes and existing behavior. Use focused fixes and a working checkpoint before major rewrites. Inspect branch state before writes; do not force-push or overwrite unrelated work.

## Checks and delivery

Run node --check app.js, node --check api.js, and node tests/api.test.cjs for this starter. Also verify the actual main flow and mobile layout in a browser where available. Report checks that were not run. Keep docs/PROJECT_BRIEF.md current with source version, stack, run instructions, completed work, blockers, and next task.

Deliver runnable source and exact instructions. Distinguish source-code links, local previews, private deployments, and public app URLs. When requested to publish, use available hosting and verify its returned state. Do not send teammates messages unless explicitly instructed.

Teach the participant to explain her actual contribution and identify real versus mock features honestly. No setup or design guarantees a hackathon win.
