# QA Analyst Take-Home Assignment

Lightweight Playwright + TypeScript QA automation suite covering:

- Frontend smoke checks for `http://example.com`
- API checks for `https://dummy.restapiexample.com/`

## Project Structure

```text
.
├── tests/
│   ├── api.spec.ts
│   └── frontend.spec.ts
├── package.json
├── playwright.config.ts
└── README.md
```

## Prerequisites

- Node.js 18 or newer
- npm

## Setup

```bash
npm install
npx playwright install chromium
```

## Run Tests

Run the full test suite:

```bash
npm test
```

Run frontend tests only:

```bash
npm run test:frontend
```

Run API tests only:

```bash
npm run test:api
```

Open the last HTML report:

```bash
npm run report
```

## Tooling Choice

Playwright with TypeScript was selected because it supports both browser UI testing and API testing in one framework. That keeps the setup small and easy to review for a lightweight take-home assignment.

Playwright also provides readable assertions, useful HTML reporting, screenshots/traces on failure, and a simple test runner. TypeScript adds type safety and makes helper functions and response validation easier to maintain.

## Test Purpose / Coverage

The suite demonstrates a small but practical QA strategy:

- `tests/frontend.spec.ts` loads `http://example.com` and verifies `Example Domain` content. This is a frontend smoke test and a simple regression check for expected page content.
- `tests/frontend.spec.ts` verifies the IANA information link exists. This covers UI/navigation validation and acts like a lightweight integration check to confirm the page links to the expected external domain.
- `tests/api.spec.ts` checks the employees list endpoint. This is an API smoke test with contract and data validation.
- `tests/api.spec.ts` checks employee `1` by ID. This is a focused regression check with data validation for a known resource.
- `tests/api.spec.ts` calls an invalid endpoint and verifies it does not return the successful employees contract. This demonstrates negative testing.
- The employees list test includes a response-time assertion. This is a basic performance awareness check, not a full performance test.

## Assumptions and Trade-offs

`https://dummy.restapiexample.com/` is a public demo API, so it may rate-limit requests, return 5xx errors, return non-JSON content, or return incomplete demo data.

The API tests skip live contract assertions only when the public API is unavailable or unusable. When a successful `200` JSON response with usable data is returned, the tests validate the response contract and data shape.

In a real project, a stable QA environment, seeded test data, or a mocked service would be preferred for deterministic automated tests. This suite stays intentionally lightweight because the assignment is scoped for a short 1-2 hour exercise.

## Future Improvements

- Add CI/CD with GitHub Actions.
- Use a stable mock API or dedicated QA test environment.
- Add stricter JSON schema validation.
- Expand negative and edge case coverage.
- Publish HTML reports as CI artifacts.
- Add test data management for predictable API assertions.
- Add security checks for headers and invalid input handling.
- Broaden browser coverage if the product risk requires it.
