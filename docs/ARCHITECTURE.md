# Epic Tech AI Dev 2.0 - System Architecture

This document outlines the proposed system architecture for Epic Tech AI Dev 2.0, a fully autonomous AI DevOps platform.

## 1. Guiding Principles

- **Modularity:** The system is composed of independent, specialized AI agents.
- **Scalability:** Designed to handle a growing number of users, projects, and deployment targets.
- **Extensibility:** New agents, technologies, and deployment platforms can be added with relative ease.
- **Autonomy:** Agents operate with minimal human intervention, driven by user prompts and system events.
- **Resilience:** The system should be fault-tolerant, with mechanisms for error recovery and retries.
- **Security:** Security is a core consideration at all levels of the architecture.

## 2. Overall System Architecture

Epic Tech AI Dev 2.0 will employ a **microservices-based architecture** where each AI Agent (or a closely related group of agents) can be considered a microservice. These agents communicate and collaborate via a **shared memory system / event bus**.

+-----------------------------------+ +-----------------------------------+ +-----------------------------------+ | User Interfaces |------>| API Gateway |<----->| Authentication Service | | (Web Dashboard, CLI, External API)| | (REST/GraphQL) | | (OAuth2, Token Management) | +-----------------------------------+ +-----------------------------------+ +-----------------------------------+ ^ | | | | (User Prompts, Commands) | (Internal API Calls, Events) | | v +------------+------V-----------------+ +-----------------------------------+ +-----------------------------------+ | Prompt Processing & Orchestration|------>| Shared Memory System |<----->| AI Agent Services | | (e.g., PromptCompilerAgent Core)| | (Redis Streams / Kafka/RabbitMQ) | | (CodeGen, Infra, Deploy, DB, etc.)| +-----------------------------------+ +-----------------------------------+ +-----------------------------------+ | ^ ^ | | | (Tasks, Status Updates) | | (Agent-to-Agent Communication, Data Sharing) | | | | +------------+------V-----------------+ +------------+------V-----------------+ +-----------------------------------+ | Project & State Management | | Logging & Monitoring Service | | External Platform Integrations | | (Database for projects, history) | | (Sentry, PostHog, Custom Stack) | | (GitHub, Vercel, AWS, Cloudflare APIs)| +-----------------------------------+ +-----------------------------------+ +-----------------------------------+


### Components:

1.  **User Interfaces:**
    *   **Web Dashboard:** Primary interface for users to submit prompts, view progress, manage projects, and access analytics. (Proof-of-concept HTML/CSS/JS provided).
    *   **CLI (Command Line Interface):** For power users and automation scripts. (Conceptual design in `CLI_SPEC.md`).
    *   **External API:** For integration with other developer tools or custom workflows. (Conceptual design in `API_SPEC.md`).

2.  **API Gateway:**
    *   Single entry point for all incoming requests from user interfaces.
    *   Routes requests to appropriate backend services.
    *   Handles request validation, rate limiting.
    *   Likely to expose both **RESTful and GraphQL APIs**.

3.  **Authentication Service:**
    *   Manages user identities, authentication (e.g., OAuth2), and authorization (RBAC).
    *   Issues and validates access tokens.

4.  **Prompt Processing & Orchestration:**
    *   The "brain" that receives user prompts.
    *   The `PromptCompilerAgent` would be central here.
    *   Orchestrates the workflow by dispatching tasks to other AI agents via the Shared Memory System.

5.  **Shared Memory System / Event Bus:**
    *   Facilitates asynchronous communication and data sharing between AI agents.
    *   **Chosen Technology (Conceptual): RabbitMQ, Redis Streams, or Apache Kafka.**
    *   Supports: Task Queues, Event Sourcing, Pub/Sub.

6.  **AI Agent Services:**
    *   Collection of microservices, each representing specialized AI agents (e.g., `CodeGenAgent`, `InfraAgent`).
    *   Each agent service is self-contained and independently deployable.
    *   Subscribes to tasks/events, performs its function, publishes results.

7.  **Project & State Management:**
    *   A persistent database (e.g., PostgreSQL, MongoDB) to store project details, user info, deployment history, etc.

8.  **Logging & Monitoring Service:**
    *   Aggregates logs, metrics, and errors from all services.
    *   Integrates with tools like Sentry, Prometheus, Grafana.

9.  **External Platform Integrations:**
    *   Modules for interacting with third-party platforms (GitHub API, Vercel API, etc.).

## 3. Frontend Architecture (Dashboard - PoC Implementation)

-   **Framework Choice (Conceptual for full build): React, Vue, or Svelte.**
    *   **PoC Implementation:** Vanilla HTML, CSS, and JavaScript for simplicity and to demonstrate core UI concepts.
-   **State Management (Conceptual):** Redux Toolkit, Zustand, or Context API.
-   **Styling (PoC):** Modern CSS with custom properties, Flexbox, and Grid.
-   **Real-time Updates (Conceptual):** WebSockets.

## 4. Backend Architecture (AI Agent Services & Core Logic - Conceptual)

-   **Language Choice (Conceptual): Node.js (TypeScript), Go, or Python.**
    *   **PoC Server:** Node.js (plain JavaScript) for serving static files.
-   **Frameworks (Conceptual Examples):** Express.js, NestJS (Node.js); Flask, Django (Python); Gin Gonic (Go).
-   **Containerization (Conceptual):** Docker for all backend services/agents.
-   **Serverless Support (Conceptual):** Design agents for potential deployment as serverless functions.

## 5. Shared Memory System (Detailed - Conceptual)

-   **Purpose:** Decouple agents, enable asynchronous processing, manage task distribution.
-   **Technology Choice Rationale (Example: RabbitMQ):** Robust, mature, supports complex routing, message queuing, persistence, and various messaging patterns suitable for inter-agent communication.
-   **Key Streams/Topics/Exchanges (Examples):**
    *   `prompts.new`: For new user prompts.
    *   `plans.generated`: For `PromptCompilerAgent` outputs.
    *   `tasks.codegen.requests`: For `CodeGenAgent`.
    *   `events.code.generated`: Notifications from `CodeGenAgent`.
    *   `events.deployments.status`: Updates from `DeployAgent`.
-   **Message Format:** JSON or Protobuf.

## 6. Data Models (High-Level Examples for Project & State Management DB - Conceptual)

### User
    - userId (PK), username, email, authProvider, roles, createdAt, updatedAt

### Project
    - projectId (PK), userId (FK), projectName, originalPrompt, status, sourceRepoUrl, liveUrls, createdAt, updatedAt

### Deployment
    - deploymentId (PK), projectId (FK), platform, status, deploymentUrl, logs, initiatedAt, completedAt

### AgentTask
    - taskId (PK), projectId (FK), agentName, taskType, inputPayload, status, resultPayload, createdAt, updatedAt

## 7. Hosting and Infrastructure (Conceptual Production)

-   **Cloud Provider:** AWS, GCP, or Azure.
-   **Container Orchestration:** Kubernetes (EKS, GKE, AKS).
-   **Database Hosting:** Managed database services (RDS, Cloud SQL, MongoDB Atlas).
-   **Object Storage:** S3, GCS, Azure Blob Storage.
-   **CDN:** Cloudflare, CloudFront, etc.

This architecture provides a flexible and scalable foundation. The PoC server (`server.js`) and frontend files (`dashboard/`, `projects/`) demonstrate a small slice of the "User Interfaces" and how generated code might look.
Please confirm once you have added docs/ARCHITECTURE.md.
