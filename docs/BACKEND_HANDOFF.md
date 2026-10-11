# Backend contract

Copy this message manually to the teammate; it has not been sent:

> I am building the frontend. Please send the API base URL, each endpoint and HTTP method, sample request and success/error response JSON, authentication mechanism, allowed frontend origin/CORS, and the first API that will be ready. Let's agree on one complete demo flow so I can build the UI now and integrate your real API when it is ready.

CORS means the backend permits requests from the frontend's web address.

| Screen/action | Method and endpoint | Request | Success response | Error response | Ready? |
| --- | --- | --- | --- | --- | --- |
| Main task | To agree | Needed | Needed | Needed | Unknown |
| Results/detail | To agree | Needed | Needed | Needed | Unknown |
| Save/submit, if required | To agree | Needed | Needed | Needed | Unknown |

- Development base URL:
- Deployed base URL:
- Allowed frontend origin:
- Authentication mechanism:
- Limits/pagination/filter conventions:
- Known unavailable features:
- Teammate's integration time:

Do not include private credentials. The starter's optional GET /items endpoint is an example contract, not an assumption about your backend. It expects an array of items with string fields id, title, category, description, tip, and optionally icon. Change the adapter to match the actual agreed contract.

Current mock example bookmarks are stored only on the user's browser. They are not saved to the backend.
