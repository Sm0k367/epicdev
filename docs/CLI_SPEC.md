# Epic Tech AI Dev 2.0 - CLI Specification (Conceptual)

This document outlines the conceptual command-line interface (CLI) for Epic Tech AI Dev 2.0, designed for power users and automation.

## 1. Installation (Conceptual)

```bash
# Via npm (once published)
npm install -g @epictechaidev/cli

# Or via a script
curl -fsSL https://cli.epictechaidev.com/install.sh | sh
2. Command Structure (Conceptual)
epicdev <command> <subcommand> [options] [arguments]

3. Authentication (Conceptual)
epicdev login
Initiates OAuth2 flow in the browser or prompts for an API token.
Stores credentials securely locally.
epicdev logout
Clears local credentials.
epicdev auth status
Shows current authentication status.
4. Core Commands (Conceptual Examples)
Projects
epicdev projects create --prompt "My awesome app idea"
Creates a new project from a natural language prompt.
Alias: epicdev create "My awesome app idea"
Options:
--name "My App Name" (Optional, can be inferred)
--stack "react,nodejs,postgres" (Optional, comma-separated preferences)
--deploy-to "vercel,aws-lambda" (Optional)
--interactive (Guides user through options)
epicdev projects list
Lists all projects for the user.
Alias: epicdev ls
Options:
--status <status> (e.g., live, coding, failed)
--limit <number>
--json (Output as JSON)
epicdev projects get <projectId>
Shows details for a specific project.
Alias: epicdev get <projectId>
Options:
--logs (Tail logs for this project)
--status (Show detailed status and agent activity)
epicdev projects delete <projectId>
Deletes a project.
Options:
--force (Skip confirmation)
Deployments
epicdev deploy <projectId> --target <platform>
Triggers a new deployment or redeployment for a project to a specific target.
If --target is omitted, might deploy to default or all configured targets.
Options:
--branch <branchName>
--latest (Deploy latest commit)
epicdev deployments list <projectId>
Lists deployment history for a project.
Logs
epicdev logs <projectId>
Streams logs for a project in real-time.
Options:
--lines <number> (Show last N lines)
--agent <agentName> (Filter by agent)
--level <error|warn|info> (Filter by log level)
Configuration (Conceptual)
epicdev config set <key> <value>
Sets local CLI configuration (e.g., default deployment target, API endpoint).
epicdev config get <key>
Gets a configuration value.
epicdev config list
Lists all configurations.
5. Global Options (Conceptual)
--version / -v: Show CLI version.
--help / -h: Show help for a command.
--json: Output in JSON format.
--verbose: Enable verbose logging for CLI operations.
6. Example Workflow (Conceptual)
User logs in:
epicdev login
User creates a new project:
epicdev create "Build a simple to-do list app with React and Firebase, deploy to Netlify" --name "My Todo App"
(CLI shows project ID, e.g., proj_abc123)
User checks project status and logs:
epicdev get proj_abc123 --status
epicdev logs proj_abc123 --level info
Once deployed, user lists projects to see live URL:
epicdev ls --status live
This CLI specification provides a conceptual framework. A full build would require implementation using a CLI framework (e.g., Oclif, Commander.js for Node.js; Click, Typer for Python). The current PoC server (server.js) does not interact with or provide this CLI.

