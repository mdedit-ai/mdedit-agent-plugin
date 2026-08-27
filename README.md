# Markdown by mdedit.ai

Create, find and read, revise, review, export, and explicitly publish Markdown documents from supported AI agents. This repository is one portable Agent Plugin with shared skills and a hosted mdedit MCP connection.

## Portable core

The root `plugin.json`, `mcp.json`, and `skills/` directory follow Agent Plugins 1.0. Compatible clients can load the same package without rearranging its contents. Authentication for the portable MCP connection is completed by the client; the package contains no API key, client secret, authorization code, or token.

The package also carries thin compatibility manifests for hosts that still need their own OAuth client registration:

- Gemini CLI uses `gemini-extension.json`.
- Cursor can use `.cursor-plugin/plugin.json` and its dedicated OAuth configuration.
- Claude Code uses `.claude-plugin/plugin.json` and its dedicated OAuth configuration.

All hosts share the same generated skills. The compatibility manifests do not duplicate prompts or workflow instructions.

## Install

### VS Code and compatible Agent Plugin clients

In VS Code, run **Chat: Install Plugin From Source** and enter:

```text
https://github.com/mdedit-ai/mdedit-agent-plugin
```

Other Agent Plugins-compatible clients can install or register the same repository using their normal source or local-plugin flow.

### Gemini CLI

```bash
gemini extensions install https://github.com/mdedit-ai/mdedit-agent-plugin
```

Restart Gemini CLI after installation, then authenticate the `mdedit` MCP server when prompted.

### Cursor

Use the repository URL when installing from source or submitting to the Cursor marketplace. The Cursor compatibility manifest supplies the dedicated public OAuth client and bounded document-workflow scopes.

### Claude Code

Clone the repository, then validate and load it locally:

```bash
claude plugin validate --strict ./mdedit-agent-plugin
claude --plugin-dir ./mdedit-agent-plugin
```

Version 0.3.1 retains the OAuth flow validated with Claude Code 2.1.246 on macOS. The dedicated secretless public client uses PKCE and a fixed local callback. A scoped API-key override can still use an `X-API-Key` header with `${MDEDIT_API_KEY}` in user configuration; never commit the key to this repository.

## Try it

- “List my Markdown documents on mdedit.ai.”
- “Create a document called Release notes.”
- “Review this document and show me the actionable suggestions.”
- “Export this document as PDF.”
- “Publish this document.” The agent must ask for confirmation before changing public visibility.

Normal responses should remain conversational and must not expose routing IDs, revisions, hashes, job IDs, or raw JSON.

## Versioning

All manifests use the same package version. Bump them together before publishing a release or submitting an updated store candidate.

## Rollback

Disable or uninstall the plugin with the host's normal plugin manager. Removing the plugin does not revoke mdedit sessions or scoped API keys; revoke those separately from mdedit account settings when required.

- Documentation: <https://mdedit.ai/docs/skills/install>
- Support: [support@mdedit.ai](mailto:support@mdedit.ai)
- Privacy: <https://mdedit.ai/privacy-policy>
- Terms: <https://mdedit.ai/terms>
