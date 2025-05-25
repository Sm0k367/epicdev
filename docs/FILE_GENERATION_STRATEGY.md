# Epic Tech AI Dev 2.0 - File Generation Strategy (Conceptual)

This document outlines the strategy and types of files that the Epic Tech AI Dev 2.0 platform, primarily through its `CodeGenAgent`, `InfraAgent`, `DBAgent`, and `DocsAgent`, would autonomously generate based on user prompts and inferred requirements.

## Core Principles of File Generation:

-   **Prompt-Driven:** File content and structure are derived from the user's natural language prompt, as interpreted by the `PromptCompilerAgent`.
-   **Modularity:** Generate code in a modular way (components, services, modules) for better organization and maintainability.
-   **Best Practices:** Adhere to industry best practices for the chosen languages, frameworks, and platforms.
-   **Configurability:** Allow for user preferences (e.g., choice of framework, styling library) to influence generation.
-   **Extensibility:** The system should be designed to easily add support for generating new file types or for new technologies.
-   **Idempotency (where applicable):** Regenerating files based on the same plan should ideally produce the same output, or intelligently merge changes.

## Types of Files to be Generated:

### 1. Source Code (Primarily by `CodeGenAgent`)

-   **Frontend:**
    -   HTML files (`index.html`, templates, partials)
    -   CSS files (`styles.css`, component-specific CSS, SASS/LESS files)
    -   JavaScript files (vanilla JS, framework-specific components like React `.jsx`/`.tsx`, Vue `.vue`, Svelte `.svelte`)
    -   Image assets (placeholders, or potentially AI-generated simple graphics/logos)
    -   Font files (if specific fonts are chosen or self-hosted)
-   **Backend:**
    -   Server-side language files (e.g., Node.js `.js`/`.ts`, Python `.py`, PHP `.php`, Go `.go`, Java `.java`, Ruby `.rb`)
    -   API endpoint handlers/controllers
    -   Business logic modules/services
    -   Models/entities for data representation
    -   Utility functions
    -   Middleware configurations
-   **Mobile (Conceptual - Future Extension):**
    -   Swift/Objective-C (iOS), Kotlin/Java (Android), Dart (Flutter), JavaScript/TypeScript (React Native)

### 2. Configuration Files (Primarily by `InfraAgent`)

-   **Environment Variables:**
    -   `.env` (template or example, actual secrets managed by `SecurityAgent` and vault)
    -   `.env.example`
-   **Version Control:**
    -   `.gitignore`
-   **Package Management:**
    -   `package.json` (Node.js)
    -   `requirements.txt` or `Pipfile` (Python)
    -   `composer.json` (PHP)
    -   `go.mod` (Go)
    -   `pom.xml` or `build.gradle` (Java)
    -   `Gemfile` (Ruby)
-   **Containerization:**
    -   `Dockerfile`
    -   `docker-compose.yml`
    -   `.dockerignore`
-   **Platform-Specific Deployment:**
    -   `vercel.json` (Vercel)
    -   `netlify.toml` (Netlify)
    -   `wrangler.toml` (Cloudflare Workers)
    -   `fly.toml` (Fly.io)
    -   `render.yaml` (Render)
    -   `firebase.json` (Firebase)
    -   `supabase/config.toml` (Supabase)
-   **Linters & Formatters:**
    -   `.eslintrc.js`, `.prettierrc.js`, `pyproject.toml` (for Black/Flake8), etc.
-   **Build Tools:**
    -   `webpack.config.js`, `vite.config.js`, `tsconfig.json`, etc.

### 3. CI/CD Pipeline Configurations (Primarily by `InfraAgent`)

-   **GitHub Actions:** Workflow YAML files (e.g., `.github/workflows/main.yml`) for build, test, deploy.
-   **GitLab CI:** `.gitlab-ci.yml`
-   **Jenkins:** `Jenkinsfile` (declarative or scripted pipeline)
-   **CircleCI:** `.circleci/config.yml`

### 4. Database Related Files (Primarily by `DBAgent`)

-   **Schema Definitions:**
    -   SQL DDL scripts (`schema.sql`)
    -   NoSQL schema validation rules (e.g., JSON Schema for MongoDB)
    -   ORM model definitions (e.g., Prisma schema, TypeORM entities)
-   **Migration Files:**
    -   Timestamped migration scripts (e.g., for tools like Flyway, Alembic, Knex migrations, Prisma Migrate)
-   **Seed Data:**
    -   SQL insert scripts, JSON files, CSV files for populating initial data.
-   **Database Configuration:**
    -   Connection configurations (templates, actual values from vault).

### 5. Documentation Files (Primarily by `DocsAgent`)

-   `README.md` (project-specific and main platform)
-   `LICENSE` (e.g., MIT, Apache 2.0, based on user choice or default)
-   `CONTRIBUTING.md`
-   `CHANGELOG.md`
-   API Documentation:
    -   OpenAPI/Swagger JSON or YAML files
    -   Postman collections
    -   Markdown API reference
-   Code comments and docstrings.

### 6. Testing Files (Primarily by `TestAgent`)

-   Unit test files (e.g., `*.test.js`, `*_test.py`)
-   Integration test files
-   End-to-end test scripts (e.g., Playwright, Cypress)
-   Test configuration files (e.g., `jest.config.js`, `pytest.ini`)
-   Mock data / fixtures for tests.

## Generation Process (Conceptual):

1.  `PromptCompilerAgent` creates a structured project plan.
2.  This plan is dispatched to relevant agents (`CodeGenAgent`, `InfraAgent`, etc.).
3.  Agents use a combination of:
    -   **Pre-defined Templates:** For common boilerplate and structures.
    -   **Code Generation Models (AI):** Large Language Models (LLMs) fine-tuned for code, or specialized code generation models.
    -   **Rule-Based Systems:** For specific, deterministic parts of code or configuration.
    -   **Heuristics:** To make intelligent choices based on context.
4.  Generated files are stored (e.g., in a temporary workspace, then committed to a Git repository).
5.  Iterative refinement might occur based on feedback from other agents (e.g., `TestAgent` finding issues, `UXAgent` suggesting UI changes).

The goal is to produce a complete, working, and well-structured set of files that constitute the requested application and its supporting infrastructure. The PoC (`projects/sample_landing_page/`) demonstrates a simplified version of this for a static site.
Please confirm once you have added docs/FILE_GENERATION_STRATEGY.md.
