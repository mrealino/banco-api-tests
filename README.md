# Banco API Tests

## Overview

This project contains automated tests for the REST API available at:
https://github.com/juliodelimas/banco-api

The goal is to validate API behavior, ensuring endpoints function
correctly, reliably, and consistently.

## Objective

-   Validate API endpoints (CRUD operations)
-   Ensure response integrity and status codes
-   Enable regression testing through automation
-   Provide clear HTML reports for analysis

## Tech Stack

-   JavaScript (Node.js)
-   Mocha (Test framework)
-   Chai (Assertions)
-   Supertest (HTTP requests)
-   Mochawesome (HTML reports)
-   dotenv (Environment variables)

## Project Structure

    ├── test/
    │   ├── login.test.js
    │   ├── transfer.test.js
    │   └── transferV2.test.js
    ├── mochawesome/        # Generated HTML reports
    ├── .env                # Environment variables (must be created)
    ├── .gitignore
    ├── package.json
    └── README.md

## Environment Configuration

Create a `.env` file in the root directory with the following content:

    BASE_URL=http://localhost:3000

Replace the URL according to your environment.

## Running Tests

### Install dependencies

    npm install

### Run tests

    npm test

### Run tests with report generation

    npm run test:report

## Test Reports

After execution, open the HTML report located in:

    /mochawesome/index.html

## Documentation Links

-   Mocha: https://mochajs.org/
-   Chai: https://www.chaijs.com/
-   Supertest: https://github.com/visionmedia/supertest
-   Mochawesome: https://github.com/adamgruber/mochawesome
-   dotenv: https://github.com/motdotla/dotenv

## Notes

-   Ensure the API is running before executing tests
-   The `.env` file is required for proper configuration
-   Reports are automatically generated when using the report script
