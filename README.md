# QA Analyst Take-Home Assignment

This repository contains a small automated QA suite created for the QA Analyst take-home assignment.

The suite covers:

- Frontend testing against http://example.com
- Backend/API testing against https://dummy.restapiexample.com/

The project uses Playwright with TypeScript.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions

## Project Structure

qa-analyst-take-home-assignment/
- tests/frontend/example.spec.ts
- tests/api/employees.spec.ts
- docs/test-plan.md
- playwright.config.ts
- package.json
- README.md
- .github/workflows/playwright.yml

## Frontend Test Coverage

Target URL:

http://example.com

Covered checks:

- Page loads successfully
- Page title is correct
- Main heading is visible
- Main paragraph text is visible
- Learn more link is visible
- Learn more link has the expected URL

## API Test Coverage

Target API:

https://dummy.restapiexample.com/api/v1

Covered checks:

- GET all employees
- GET single employee by ID
- POST create employee
- PUT update employee
- DELETE employee
- Negative/edge test for invalid employee ID
- Basic response body validation

## Important Note About Public API Stability

dummy.restapiexample.com is a public dummy API and may sometimes return rate limiting responses or temporary service issues.

For that reason, the API tests allow HTTP 429 as an acceptable response in some cases. This keeps the test suite realistic while still validating successful responses when the API is available.

## How to Install

npm install
npx playwright install

## How to Run All Tests

npx playwright test

## How to Run Frontend Tests Only

npx playwright test tests/frontend

## How to Run API Tests Only

npx playwright test tests/api

## How to View HTML Report

npx playwright show-report

## QA Approach

The goal of this assignment is to demonstrate practical QA thinking:

- Clear test structure
- Meaningful assertions
- Separation between frontend and API coverage
- Positive and negative test scenarios
- Basic maintainability
- Awareness of public API limitations
- Simple CI integration through GitHub Actions

## Author

Vasyl Popovich
