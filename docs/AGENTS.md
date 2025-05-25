done

Machine
Okay, next is the AGENTS.md file.

File 8 of 30

File Path: docs/AGENTS.md

Instructions for GitHub Web UI:

Go to your repository: https://github.com/Sm0k367/epicdev
Navigate into the docs directory (if you are at the root, click on the docs folder).
Click the "Add file" button.
Select "Create new file".
In the "Name your file..." box, type AGENTS.md.
Paste the content below into the editor.
Scroll down and click "Commit new file".
Content for docs/AGENTS.md:

# Epic Tech AI Dev 2.0 - AI Agent Responsibilities

This document outlines the roles and responsibilities of the modular AI agents within the Epic Tech AI Dev 2.0 platform. Each agent is a specialized microservice (or a component within one) designed to handle a specific aspect of the software development lifecycle. They communicate via the Shared Memory System (e.g., RabbitMQ, Redis Streams).

## Core Principles for Agents:
- **Single Responsibility (Largely):** Each agent focuses on a well-defined task domain.
- **Autonomous Operation:** Agents can perform their tasks without direct human intervention once triggered.
- **Event-Driven:** Agents react to events or tasks published on the shared memory system.
- **Idempotency:** Where possible, agent actions should be idempotent (multiple executions have the same effect as one).
- **Stateful/Stateless:** Some agents might be stateless, processing inputs to produce outputs, while others might maintain some state or interact with the Project & State Management database.

## Agent Definitions:

1.  **`PromptCompilerAgent`**
    *   **Responsibilities:**
        *   Parses natural language user prompts.
        *   Performs intent recognition and requirement inference.
        *   Identifies the desired application type.
        *   Infers or clarifies the technology stack.
        *   Determines deployment targets.
        *   May engage in a clarifying dialogue with the user if the prompt is ambiguous.
    *   **Inputs:** User prompt, user context.
    *   **Outputs:** A structured project plan/specification.
    *   **Publishes:** `plan.generated` event.

2.  **`CodeGenAgent`**
    *   **Responsibilities:**
        *   Generates source code for frontend and backend components.
        *   Supports a wide range of languages and frameworks (HTML, CSS, JS, React, Vue, Node.js, Python, etc.).
        *   Generates boilerplate code, folder structures, and initial component/module files.
        *   Implements business logic, API endpoints, and UI components.
    *   **Inputs:** Structured project plan, specific coding tasks.
    *   **Outputs:** Generated source code files.
    *   **Publishes:** `event.code.generated`, `task.test.generate_unit_tests.request`.
    *   *(Simulated output in `projects/sample_landing_page/`)*

3.  **`InfraAgent` (Infrastructure Agent)**
    *   **Responsibilities:**
        *   Generates infrastructure-as-code (IaC) configurations.
        *   Creates `Dockerfile`, `docker-compose.yml`.
        *   Generates CI/CD pipeline configurations (e.g., GitHub Actions workflows).
        *   Creates environment configuration files (e.g., `.env.template`).
    *   **Inputs:** Structured project plan, generated code context.
    *   **Outputs:** Configuration files for infrastructure, CI/CD.
    *   **Publishes:** `event.infra.configured`.
    *   *(Simulated output: `.gitignore` and `README.md` for `sample_landing_page`)*

4.  **`DBAgent` (Database Agent)**
    *   **Responsibilities:**
        *   Generates database schema definitions (SQL DDL, NoSQL schema validation).
        *   Creates migration files.
        *   Generates seed data.
        *   Sets up and configures databases on cloud platforms (Supabase, MongoDB Atlas, Firebase).
        *   Integrates backend application logic with the database.
    *   **Inputs:** Data model specifications, chosen database platform.
    *   **Outputs:** Schema files, migration scripts, seed data, connection details.
    *   **Publishes:** `event.db.configured`.

5.  **`DeployAgent`**
    *   **Responsibilities:**
        *   Manages code deployment to various hosting and cloud platforms (GitHub Pages, Vercel, Netlify, Cloudflare, etc.).
        *   Initializes Git repositories, manages branches, commits.
        *   Interacts with platform APIs or CLIs for deployment.
        *   Configures DNS records if necessary.
    *   **Inputs:** Path to code and infra configs, target platform credentials, project plan.
    *   **Outputs:** Deployment status, live URLs.
    *   **Publishes:** `event.deployment.inprogress`, `event.deployment.success`, `event.deployment.failure`.

6.  **`UXAgent` (User Experience Agent)**
    *   **Responsibilities:**
        *   Provides guidance on UI/UX design during planning.
        *   Can refine frontend code for responsiveness, accessibility, and modern design patterns.
        *   Suggests or implements UI improvements.
    *   **Inputs:** Project plan, generated frontend code.
    *   **Outputs:** Improved frontend code, UI/UX recommendations.
    *   **Publishes:** `event.ux.refined`.

7.  **`SecurityAgent`**
    *   **Responsibilities:**
        *   Manages secure storage and retrieval of sensitive credentials.
        *   Handles OAuth2 flows for platform integrations.
        *   Implements Role-Based Access Control (RBAC) for the platform.
        *   Maintains audit logs.
        *   Can scan generated code for common vulnerabilities.
    *   **Inputs:** Credential requests, user auth events, code for scanning.
    *   **Outputs:** Secure credentials, audit logs, vulnerability reports.
    *   **Publishes:** `event.security.scan.complete`, `event.audit.logged`.

8.  **`ScraperAgent` (Conceptual - For Learning & Knowledge Base Building)**
    *   **Responsibilities:**
        *   (Long-term/Advanced Feature) Crawls public code repositories, forums, documentation.
        *   Extracts best practices, UI paradigms, deployment workflows, solutions.
        *   Populates a knowledge base for other agents.
    *   **Inputs:** Target URLs, crawling parameters.
    *   **Outputs:** Structured data for the knowledge base.
    *   **Publishes:** `event.knowledgebase.updated`.

9.  **`TestAgent`**
    *   **Responsibilities:**
        *   Generates unit tests (Jest, Mocha, PyTest).
        *   Generates integration tests.
        *   (Potentially) Generates basic end-to-end tests (Playwright, Cypress).
        *   Runs linters and type checkers.
        *   Calculates code coverage.
    *   **Inputs:** Generated source code, project plan.
    *   **Outputs:** Test files, test results, coverage reports.
    *   **Publishes:** `event.tests.generated`, `event.tests.passed`, `event.tests.failed`.

10. **`DocsAgent` (Documentation Agent)**
    *   **Responsibilities:**
        *   Generates `README.md` files for projects.
        *   Generates `CHANGELOG.md`, `CONTRIBUTING.md`.
        *   Generates API documentation (Swagger/OpenAPI).
    *   **Inputs:** Generated code, project plan, API definitions.
    *   **Outputs:** Markdown files, API specification files.
    *   **Publishes:** `event.docs.generated`.
    *   *(Simulated output: `README.md` for `sample_landing_page` and core project docs)*

11. **`MonitorAgent`**
    *   **Responsibilities:**
        *   Collects deployment logs, application performance metrics, error reports.
        *   Integrates with external monitoring services (Sentry, PostHog).
        *   Provides data for the real-time dashboard.
        *   Can trigger alerts.
    *   **Inputs:** Logs and metrics from deployed applications.
    *   **Outputs:** Aggregated analytics, alerts, dashboard updates.
    *   **Publishes:** `event.monitoring.data.updated`, `event.alert.triggered`.

12. **`FeedbackAgent`**
    *   **Responsibilities:**
        *   Collects explicit user feedback.
        *   Analyzes implicit feedback (successful/failed builds, user corrections).
        *   Uses feedback to train/fine-tune models for other agents.
    *   **Inputs:** User feedback, system performance data.
    *   **Outputs:** Insights for model retraining, platform improvement suggestions.
    *   **Publishes:** `event.feedback.processed`, `event.model.retrain.request`.

These agent definitions provide a modular framework for the complex operations of Epic Tech AI Dev 2.0.
