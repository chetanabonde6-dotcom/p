# PromptShield — C-03 Hackathon Frontend

**Cybersecurity & Digital Trust | Chetana's frontend contribution**

PromptShield is a responsive cybersecurity dashboard for demonstrating prompt-injection detection and data-exfiltration defense. The current build is a **browser-only heuristic demo**, **not** a production middleware or secure AI model.

## Open the working interface
1. Open the repository at https://github.com/chetanabonde6-dotcom/p
2. Select **Code → Download ZIP**, extract the folder and double-click `index.html`.
3. Or serve it locally: `python3 -m http.server 8000` and visit http://localhost:8000.

There are no dependencies or build steps.

## Two-minute presentation flow
1. At **Threat scanner**, select **User message** and choose **Direct injection** → **Analyze content**. Show BLOCK with reason.
2. Select **Indirect injection**. Note that **tool output** has lower trust. Inspect findings and the decision.
3. Try **Safe content**. Show ALLOW. Then test **Exfiltration** and inspect the outcome.
4. Scroll to **Detection policy**. Toggle a rule and demonstrate that the decision can change.
5. Show **Detection benchmark**. Explain recall, false positives, and misses in the 12 labelled cases; this is not an industry-scale validation.
6. Show the session-only **Recent scan activity** log.

## Files
- `index.html`: accessible responsive dashboard
- `styles.css`: dark security visual design and mobile layout
- `app.js`: working scan input, policy controls, result UI, evaluation and activity
- `shield.js`: local heuristic engine, fixed demo corpus, confusion matrix
- `api.js`: unused legacy starter data adapter; it does not screen prompts
- `tests/shield.test.cjs`: basic detection/evaluation checks
- `docs/PROJECT_BRIEF.md`: implementation checkpoint
- `docs/BACKEND_HANDOFF.md`: proposed integration contract

## Test commands
```sh
node --check app.js
node --check shield.js
node --check api.js
node tests/shield.test.cjs
node tests/api.test.cjs
```
Checks require Node but no `npm install`. Review the GitHub Actions status or run locally; this handoff does not claim browser/device verification.

## Security limitation
Regexes and string rules miss sophisticated paraphrases, encodings and multilingual payloads, and may flag harmless quotations. `allow`, `block`, `sanitize`, `escalate` here are demo classifications only. Sanitized text must not be trusted for downstream model execution until server-side policy and rigorous validation are implemented. The frontend does not protect secrets or enforce a trusted policy. No data is transmitted from the scanner; policy and logs reset on refresh. A backend teammate must implement actual enforcement and API integration.

Repository link is **source code**, not a public hosted app.

See AGENTS.md and docs/BACKEND_HANDOFF.md for team instructions and integration.
