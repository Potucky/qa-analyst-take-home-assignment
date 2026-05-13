# Test Plan

## Objective

The objective of this test suite is to validate basic frontend behavior for example.com and core API behavior for dummy.restapiexample.com.

This test suite is intentionally small, but structured to show how automated QA coverage can be organized and expanded.

## Scope

### In Scope

Frontend:

- Page load validation
- Title validation
- Main content validation
- Link visibility and URL validation

API:

- GET employees
- GET employee by ID
- POST create employee
- PUT update employee
- DELETE employee
- Invalid employee ID scenario
- Basic response structure validation

### Out of Scope

- Performance testing
- Security testing
- Accessibility testing
- Visual regression testing
- Full schema validation
- Database validation
- Authentication testing

## Tools

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Test Data

API test data is created directly inside the test files because the tested API is a public dummy API and does not persist real business data.

Example test payload:

name: Vasyl QA Test
salary: 70000
age: 35

## Risks and Limitations

The API under test is a public dummy API. It may occasionally return rate limiting responses or temporary errors.

Known risk:

- API may return HTTP 429 due to rate limits.
- API responses may not behave like a production-grade backend.
- Created, updated, or deleted data may not persist permanently.

## Test Execution

Run all tests:

npx playwright test

Run frontend tests only:

npx playwright test tests/frontend

Run API tests only:

npx playwright test tests/api

## Future Improvements

Possible future improvements:

- Add JSON schema validation for API responses
- Add retry strategy for unstable public API responses
- Add accessibility checks for frontend page
- Add visual snapshot testing
- Add more negative API scenarios
- Add environment-based configuration
- Add detailed test reporting in CI
