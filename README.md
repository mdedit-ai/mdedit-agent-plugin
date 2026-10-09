# Markdown by [mdedit.ai](https://mdedit.ai)

Work with your mdedit.ai documents from your AI assistant. Find documents, create drafts, edit and review your writing, export files, and publish when you're ready.

## Install

### VS Code

Run **Chat: Install Plugin From Source** and enter:

```text
https://github.com/mdedit-ai/mdedit-agent-plugin
```

### Gemini CLI

```bash
gemini extensions install https://github.com/mdedit-ai/mdedit-agent-plugin
```

Restart Gemini CLI, then run `/mcp auth mdedit` to connect your account.

To get the latest release:

```bash
gemini extensions update mdedit
```

To install a specific version, add `--ref v0.3.2` to the install command. Add `--auto-update` when installing to enable automatic updates.

### Cursor

Install this repository from source using Cursor's plugin manager:

```text
https://github.com/mdedit-ai/mdedit-agent-plugin
```

Use the mdedit MCP connection's authentication action to connect your account.

### Claude Code

Clone and load the plugin:

```bash
git clone https://github.com/mdedit-ai/mdedit-agent-plugin.git
claude plugin validate --strict ./mdedit-agent-plugin
claude --plugin-dir ./mdedit-agent-plugin
```

Use `/mcp` to connect your mdedit account.

### Other assistants

For assistants that support remote MCP servers, add this server URL in their MCP settings:

```text
https://mcp.mdedit.ai/mcp
```

Use your assistant's sign-in option to connect your account. Plugin installation and available features vary by assistant.

## Connect your account

Sign in to mdedit.ai in the browser and approve access. All available workspaces are selected by default. You can deselect workspaces or choose read-only access before connecting.

Your assistant remembers the connection. If it asks you to reconnect, sign in again and approve the access you want it to have.

For assistants without browser sign-in, you can configure an API key instead. See the [connection guide](https://mdedit.ai/docs/agents/mcp-authentication). Keep API keys in your assistant's private settings.

## Try it

- “Find my document about the product launch.”
- “Create a document called Release notes.”
- “Read this document and edit it for clarity.”
- “Review this document and suggest improvements.”
- “Export this document as PDF.”
- “Publish this document.”

The assistant asks for confirmation before publishing a document publicly.

## Manage your connection

Update or reinstall the plugin through your assistant's plugin manager to get the latest version. After updating an older installation, you may need to sign in again.

Manage or revoke access in your mdedit.ai account settings. You can disable or uninstall the plugin through your assistant's plugin manager.

## Help

- [Installation guide](https://mdedit.ai/docs/skills/install)
- [Connection troubleshooting](https://mdedit.ai/docs/agents/mcp-authentication)
- [Contact support](mailto:support@mdedit.ai)
- [Privacy policy](https://mdedit.ai/privacy-policy)
- [Terms](https://mdedit.ai/terms)
