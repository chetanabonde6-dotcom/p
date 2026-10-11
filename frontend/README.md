# PromptShield · VORTEXA 3.0 C-03
Next.js frontend in an isolated `frontend/` directory. This is a frontend-only integration candidate; backend API contract is not yet confirmed.
## Run
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000. Configure NEXT_PUBLIC_API_BASE_URL to the Python backend origin.
## Routes
/ overview · /scanner scanner · /simulator attack simulator · /policies policies · /evaluation evaluation lab · /review-queue review queue · /audit-logs audit logs · /settings health/settings.
## API expectations (UNCONFIRMED)
POST /api/v1/scan: {content,source,context?} → {scan_id,decision,risk_level?,matched_rules?,explanation?,sanitized_output?,source_trust?,policy_version?,timestamp?}.
GET /api/v1/dashboard (new proposal, **not** in original anticipated routes) → {total_scans,threats_detected,blocked,sanitized,escalated,allowed,trend,recent_events,evaluation}.
GET /api/v1/policies → Policy[]; PUT /api/v1/policies/:id → updated policy.
GET /api/v1/evaluations → Evaluation[]; POST /api/v1/evaluations/run.
GET /api/v1/review-queue → ReviewCase[]; POST /api/v1/review-queue/:id/decision.
GET /api/v1/audit-events?page=1&limit=20&... → Event[] or {items,total}.
GET /api/v1/health → {status,database?}.
Authentication uses cookie credentials; server **must** enforce admin/reviewer roles and CSRF controls. Never use frontend hiding for security. No scan content is forwarded to an LLM by the frontend.
## Verify
`npm run typecheck` and `npm run build`. Manually verify navigation, responsive layouts, error/loading/empty states, and API calls against a live backend. No tests/build claimed without running them.
## Integration blockers
Confirm routes and response shape (especially dashboard), session authentication, CORS, CSRF, policies/version semantics, evaluation runs, review case decisions and redaction. The scanner intentionally reports unavailable network/API instead of fabricating success.
