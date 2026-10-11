# Project brief and checkpoint

## Competition — C-03 PromptShield
- Participant/frontend developer: Chetana
- Date: 11 October 2026; submission deadline: one hour after the request (approximately 11:20 IST, confirm with organizers)
- Domain: Cybersecurity & Digital Trust
- Challenge: scan direct prompts and lower-trust document/tool outputs for instruction override, protected information requests, data exfiltration and disguised payloads; provide allow/block/sanitize/escalate decisions with reasons; configurable policy; labelled evaluation and honest misses/false positives.
- Team framework: "team exception" (ambiguous). Existing repository is buildless HTML/CSS/JS, retained to meet deadline.
- Target: hackathon judges and developers testing prompt security controls.
- Core demo flow: choose source -> paste/load sample -> analyze -> inspect decision and reason -> change policy -> rerun benchmark -> inspect audit history.

## Current implementation
- Stack: static HTML + CSS + JavaScript; zero dependencies; browser-only heuristics.
- Files: index.html, styles.css, app.js (dashboard), shield.js (demo inspection/evaluation logic), api.js (legacy starter adapter, unused by PromptShield UI).
- Run: download/extract repository ZIP, open index.html, or serve folder with `python3 -m http.server 8000`.
- Implemented: responsive accessible dashboard, trust-source selection, four decisions, reason/indicators, local sanitize example, five editable policy switches, fixed labelled 12-case benchmark, recall and false positive rate, confusion matrix, session-only activity log, empty and error validation.
- Demo mode only: there is NO live middleware connection, model inference, protected secret store, live API or real-world security enforcement. Detection is heuristic, with known misses and false positives. Frontend policy cannot be changed by the scanned text in normal UI usage, but the browser is not a trusted policy enforcement environment.
- Data: no text submitted to a server in this interface. Activity is held only in memory until reload.
- Tests: run `node --check app.js`, `node --check api.js`, `node --check shield.js`, `node tests/api.test.cjs`, `node tests/shield.test.cjs`. Browser/device verification not yet performed.
- Backend required: production detection must run server-side with server-owned immutable policy, guarded secret matching, durable audits, evaluation corpus and real LLM/tool pipeline hooks. Agree on POST /scan request and response from docs/BACKEND_HANDOFF.md before integrating.
- Known limitation: phrase/regex matching does not robustly detect paraphrases or arbitrary encodings. Sanitize must be vetted before real use. Metrics reflect only the small fixed demo dataset.
- Next: run tests, verify mobile layout, obtain middleware endpoint and integrate demo/live API boundary, demonstrate real cases.
