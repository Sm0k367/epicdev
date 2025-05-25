# Epic Tech AI Dev 2.0 - API Specification (Conceptual)

This document outlines the conceptual RESTful and GraphQL API design for Epic Tech AI Dev 2.0.

## 1. API Design Principles

- **Resource-Oriented:** Design based on resources and standard HTTP methods for REST.
- **GraphQL for Flexibility:** Offer a GraphQL endpoint for complex queries and specific data needs.
- **Versioning:** API versioning via URL path (e.g., `/api/v1/`).
- **Authentication:** Secure token-based authentication (e.g., JWT via OAuth2).
- **Standard Error Responses:** Consistent error handling and status codes.
- **Pagination:** For list endpoints.
- **Rate Limiting:** To prevent abuse.
- **Clear Documentation:** (This document, and potentially auto-generated Swagger/OpenAPI for a full build).

## 2. Base URL (Conceptual)

-   **Production:** `https://api.epictechaidev.com/v1`
-   **Development (Local PoC):** `http://localhost:8080/api/v1` (Note: The PoC server `server.js` does not implement this API; this is for the conceptual full platform).

## 3. Authentication (Conceptual)

-   **Method:** Bearer Token authentication using JWTs.
-   Tokens obtained via an OAuth2 flow (e.g., "Login with GitHub").
-   **Header:** `Authorization: Bearer <your_jwt_token>`

## 4. REST API Endpoints (Conceptual Examples)

### Projects

-   **`POST /projects`**: Create a new project.
    -   **Request Body:**
        ```json
        {
          "prompt": "Build a blog with Next.js and deploy to Vercel",
          "name": "My NextJS Blog (optional)",
          "preferences": { // Optional user preferences
            "deploymentTarget": "vercel",
            "database": "supabase"
          }
        }
        ```
    -   **Response (201 Created):**
        ```json
        {
          "projectId": "proj_123xyz",
          "name": "My NextJS Blog",
          "status": "queued", // or "planning"
          "message": "Project creation initiated by PromptCompilerAgent."
        }
        ```

-   **`GET /projects`**: List all projects for the authenticated user.
    -   **Query Parameters:** `limit`, `offset`, `status`
    -   **Response (200 OK):**
        ```json
        {
          "data": [
            {
              "projectId": "proj_123xyz",
              "name": "My NextJS Blog",
              "status": "coding",
              "createdAt": "2025-05-25T10:00:00Z"
            }
          ],
          "pagination": { "total": 1, "limit": 10, "offset": 0 }
        }
        ```

-   **`GET /projects/{projectId}`**: Get details of a specific project.
    -   **Response (200 OK):** Project object with details like status, deployed URLs, source repo, etc.

-   **`DELETE /projects/{projectId}`**: Delete a project.
    -   **Response (204 No Content)**

### Deployments

-   **`GET /projects/{projectId}/deployments`**: List deployments for a project.
-   **`POST /projects/{projectId}/deployments`**: Trigger a new deployment (or redeploy).
    -   **Request Body:** `{ "target": "vercel", "branch": "main" }`

### Agents (Conceptual - for introspection or advanced control)

-   **`GET /agents`**: List available AI agents and their status.
-   **`GET /agents/{agentName}`**: Get details of a specific agent.

### User Management (Conceptual)

-   **`GET /user/me`**: Get current user details.

## 5. GraphQL API (Conceptual Examples)

-   **Endpoint:** `/graphql`

-   **Example Query:**
    ```graphql
    query GetProjectDetails {
      project(id: "proj_123xyz") {
        projectId
        name
        status
        originalPrompt
        createdAt
        deployments {
          deploymentId
          platform
          status
          url
          deployedAt
        }
        sourceCodeRepository {
          url
          provider
        }
      }
    }
    ```

-   **Example Mutation:**
    ```graphql
    mutation CreateNewProject {
      createProject(input: {
        prompt: "Create a Python Flask API with a PostgreSQL database"
      }) {
        project {
          projectId
          name
          status
        }
        success
        message
      }
    }
    ```

-   **Example Subscription (Conceptual - for real-time updates):**
    ```graphql
    subscription ProjectStatusUpdates {
      projectStatusChanged(projectId: "proj_123xyz") {
        projectId
        newStatus
        timestamp
        details
      }
    }
    ```

## 6. WebSockets (Conceptual - for real-time logs/status)

-   **Endpoint:** `wss://api.epictechaidev.com/v1/ws`
-   Used for streaming build logs, deployment status, and real-time dashboard updates.
-   Clients would subscribe to specific channels (e.g., `project:{projectId}:logs`, `project:{projectId}:status`).

## 7. Error Responses (Conceptual)

-   Standard HTTP status codes (400, 401, 403, 404, 500).
-   JSON error response body:
    ```json
    {
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "Prompt is too short.",
        "details": [
          { "field": "prompt", "issue": "Minimum length is 10 characters." }
        ]
      }
    }
    ```

This API specification provides a conceptual blueprint. A full implementation would involve detailed schema definitions (e.g., OpenAPI for REST, GraphQL schema definition language) and robust error handling. The current PoC server (`server.js`) does not implement this API.
Please confirm once you have added docs/API_SPEC.md.
