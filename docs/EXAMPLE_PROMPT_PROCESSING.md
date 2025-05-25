# Epic Tech AI Dev 2.0 - Example Prompt Processing Workflow (Conceptual)

This document illustrates a conceptual workflow of how Epic Tech AI Dev 2.0 might process a user prompt, from initial input to the involvement of various AI agents.

## User Prompt Example:

`"Build a modern-looking static landing page for a new SaaS product called 'InnovateAI'. It needs a hero section with a call-to-action, a features section (3 key features), a simple pricing table (3 tiers), and a contact form that sends emails. Make it responsive and deploy it to Netlify."`

## Phase 1: `PromptCompilerAgent` - Understanding and Planning

1.  **Intent Recognition & Requirement Extraction:**
    *   **Project Type:** Static Website (Landing Page).
    *   **Product Name:** InnovateAI.
    *   **Key Sections:** Hero, Features, Pricing, Contact Form.
    *   **Hero Section Details:** Call-to-action (CTA) button.
    *   **Features Section Details:** 3 key features (content for features might need to be placeholder or requested from user if not provided).
    *   **Pricing Table Details:** 3 tiers (content for tiers might be placeholder or requested).
    *   **Contact Form Details:** Email sending functionality (implies backend or third-party service like Formspree/Netlify Forms).
    *   **Design Style:** "Modern-looking", "Responsive".
    *   **Deployment Target:** Netlify.

2.  **Technology Stack Inference/Selection:**
    *   **Frontend:** HTML5, CSS3 (with Flexbox/Grid for responsiveness), JavaScript (for form validation, dynamic elements if any).
    *   **Styling:** Modern CSS techniques, possibly a utility-first CSS framework if preferred or inferred from "modern-looking" (e.g., Tailwind CSS stubs).
    *   **Contact Form Backend:** Since it's a static site for Netlify, Netlify Forms is a strong candidate. Alternative: Formspree.
    *   **Deployment:** Netlify.

3.  **Structured Project Plan Generation:**
    The `PromptCompilerAgent` outputs a JSON (or similar structured format) plan:
    ```json
    {
      "projectName": "InnovateAI Landing Page",
      "projectType": "static_website",
      "description": "Modern, responsive landing page for InnovateAI SaaS product.",
      "techStack": {
        "frontend": ["HTML5", "CSS3", "JavaScript"],
        "styling": "Modern CSS (Flexbox, Grid)",
        "formHandler": "Netlify Forms"
      },
      "sections": [
        {"type": "hero", "elements": ["headline", "subheadline", "cta_button_primary"]},
        {"type": "features", "count": 3, "elements_per_feature": ["icon_placeholder", "title", "description"]},
        {"type": "pricing_table", "tiers": 3, "elements_per_tier": ["name", "price", "features_list", "cta_button_secondary"]},
        {"type": "contact_form", "fields": ["name", "email", "message"], "submission_method": "Netlify Forms"}
      ],
      "designPreferences": {
        "style": "modern",
        "responsive": true
      },
      "deployment": {
        "platform": "Netlify",
        "repositoryRequired": true // Netlify often deploys from Git
      },
      "agentWorkflow": [
        "CodeGenAgent:generate_html_structure",
        "CodeGenAgent:generate_css_styles",
        "CodeGenAgent:generate_js_form_validation",
        "UXAgent:review_responsiveness_accessibility", // Optional refinement step
        "InfraAgent:setup_netlify_config", // e.g., netlify.toml
        "InfraAgent:setup_git_repository_structure", // .gitignore, README placeholder
        "DocsAgent:generate_project_readme",
        "DeployAgent:initialize_git_repo_and_push_to_provider", // e.g., GitHub
        "DeployAgent:configure_netlify_site_and_deploy"
      ]
    }
    ```

## Phase 2: Task Dispatch & AI Agent Execution (via Shared Memory System)

The plan is broken down into tasks for specific agents.

1.  **`CodeGenAgent` receives tasks:**
    *   Generate `index.html` with Hero, Features, Pricing, Contact sections.
    *   Generate `style.css` for modern, responsive design.
    *   Generate `script.js` for client-side contact form validation (if Netlify Forms doesn't handle all of it).
    *   *(Simulated output in `projects/sample_landing_page/` for a simpler prompt)*

2.  **`UXAgent` (optional, if complex UI generation):**
    *   Reviews generated HTML/CSS for responsiveness and accessibility. Suggests or makes minor adjustments.

3.  **`InfraAgent` receives tasks:**
    *   Generate `netlify.toml` (if specific build settings or redirects are needed).
    *   Generate `.gitignore`.
    *   Generate a basic `README.md` for the project.

4.  **`DocsAgent` receives tasks:**
    *   Refine/expand the project `README.md`.

5.  **`DeployAgent` receives tasks (can be sequential):**
    *   **Step 1 (Repo Setup):**
        *   Initialize a local Git repository for the generated code.
        *   Create a new repository on a Git provider (e.g., GitHub, if user connected their account).
        *   Push the initial code.
    *   **Step 2 (Netlify Deployment):**
        *   Use Netlify API/CLI to create a new site linked to the Git repository.
        *   Configure build settings if necessary.
        *   Trigger the first deployment.
        *   Set up Netlify Forms for the contact form.
        *   Report back the live URL.

## Phase 3: Monitoring & Feedback

1.  **`MonitorAgent`:**
    *   Checks if the deployed Netlify site is live (basic uptime).
    *   Reports status to the dashboard.

2.  **`FeedbackAgent`:**
    *   User provides feedback on the generated site via the dashboard.
    *   This feedback (e.g., "The pricing table looks too cluttered") could be used to refine future generation attempts for similar prompts.

This conceptual workflow demonstrates the collaborative nature of the AI agents in transforming a user's idea into a deployed application. The PoC server and sample files provide a glimpse into the potential outputs of `CodeGenAgent` and the `Dashboard` UI.
Please confirm once you have added docs/EXAMPLE_PROMPT_PROCESSING.md.
