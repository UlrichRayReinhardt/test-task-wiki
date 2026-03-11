## Getting Started

## Install Dependencies
npm install

## Run Tests Locally
npx playwright test

## Run Tests in Docker
docker compose up --build

## Test Report
## After execution, the HTML report is available at:
playwright-report/index.html


## Framework Architecture

This project focuses on building a flexible and scalable automation framework rather than maximizing test coverage.

Page Object Model (POM): Separates page logic from test scripts for better maintainability.

Custom Fixtures: Manage page objects, logging, and automatic session cleanup.

Multi-Browser Authentication Strategy: Different browser engines handle session cookies differently. The framework generates separate session states for Chromium, Firefox, and WebKit to ensure consistent test stability.


## Test Coverage

Data-Driven Testing (DDT): Implemented for the language switch test to demonstrate handling multiple data sets with a single test logic.

Negative Scenarios: Not included to focus on the framework infrastructure and positive flow stability across browsers.

## Credentials & Environment

NOTE: There is no parallel execution because the test depends on server-side race conditions.

Sensitive data is managed via a .env file.

Local Run: Copy .env.example to .env and add your credentials.

CI/CD & Docker: The framework prioritizes process.env for credentials. In Docker, pass environment variables through docker-compose.yml.

Example docker-compose.yml snippet:

environment:
  - CI=true
  - USERNAME=${USERNAME}
  - PASSWORD=${PASSWORD}


## Docker & Reporting

Isolated Environment: Run tests in Docker to avoid local environment issues.

Report Mapping: Docker volumes map test reports and artifacts to your host:

Reports: ./playwright-report/

Screenshots and traces (on failure): ./test-results/