# Markdown by [mdedit.ai](https://mdedit.ai)

Create, find, revise, review, export, and explicitly publish Markdown documents from AI agents. This portable Agent Plugin shares five skills and one hosted MCP connection.

## Authentication

**Browser OAuth is the default.** Connect `https://mcp.mdedit.ai/mcp`, sign in to mdedit.ai, and approve access. OAuth-capable clients discover Clerk and onboard using Dynamic Client Registration (DCR) or Client ID Metadata Documents (CIMD). No mdedit API key, manually registered host client, fixed callback port, or client secret is needed.

The consent page selects available workspaces by default and offers read/write access when the requested scopes include writes. You can deselect workspaces or choose read-only access before allowing the connection. Your choices are saved only after approval. Publishing a new public document still requires your explicit confirmation.

The client stores its registration and tokens and manages refresh/reconnect. Keep a client's saved registration when reconnecting: a newly registered client has a new identity and needs its own workspace consent. An `insufficient_scope` or revoked-workspace error means you must reconnect and approve the required access; signing in alone does not create a workspace grant.

This is supported for **clients that implement MCP OAuth**, not every agent runtime. Clients without OAuth, unattended automation, and local stdio integrations can still use a scoped API key through user configuration. Do not paste credentials into agent chat or commit them to this package.

Discovery:

- Resource metadata: <https://mcp.mdedit.ai/.well-known/oauth-protected-resource/mcp>
- Clerk metadata: <https://clerk.mdedit.ai/.well-known/oauth-authorization-server>
- Registration endpoint: discover `registration_endpoint` from Clerk metadata.
- MCP resource/audience: `https://mcp.mdedit.ai/mcp`.

Clerk uses bare scopes: `workspaces:read`, `articles:read`, `articles:write`, `reviews:read`, `reviews:write`, `publishing:read`, `publishing:write`, and `conversions:execute`. Clients that explicitly request scopes should also request `openid email offline_access` for identity and refresh. Default dynamic-client scopes cover the document workflow when a host omits `scope`; Clerk does not permit `offline_access` as an instance default, so clients must request it for offline refresh. S256 PKCE and consent are required.

## Install

### VS Code and compatible Agent Plugin clients

The root `plugin.json`, `mcp.json`, and `skills/` follow Agent Plugins 1.0. In VS Code, run **Chat: Install Plugin From Source** and enter:

```text
https://github.com/mdedit-ai/mdedit-agent-plugin
```

Other compatible clients can install the same repository through their source or local-plugin flow, then use the host's MCP authentication command.

### Gemini CLI

```bash
gemini extensions install https://github.com/mdedit-ai/mdedit-agent-plugin
```

Restart Gemini CLI, then run `/mcp auth mdedit` when authentication is needed. `gemini-extension.json` supplies the HTTP endpoint; Gemini discovers OAuth and registers its client automatically.

### Cursor

Install this repository from source using Cursor's plugin manager. The Cursor adapter supplies the HTTP endpoint without a static `auth.CLIENT_ID`. Use the MCP connection's browser authentication action.

### Claude Code

Clone, validate, and load the plugin:

```bash
claude plugin validate --strict ./mdedit-agent-plugin
claude --plugin-dir ./mdedit-agent-plugin
```

Use `/mcp` to authenticate `mdedit`. Recent Claude Code versions also support `claude mcp login mdedit`. The adapter pins the document-workflow scopes and lets Claude discover/register the client and choose its callback port.

### Other MCP OAuth clients

Add a remote Streamable HTTP server with URL `https://mcp.mdedit.ai/mcp`, then authenticate through that client. Claude Desktop, ChatGPT custom MCP connections, Codex, and other hosts can use their own MCP connection settings; this does not imply they all install the Agent Plugin manifest or have been individually verified with this release. The published ChatGPT Store plugin has a separately managed OAuth registration.

## Optional API-key connection

For a host without OAuth or a user who explicitly chooses a key, configure a scoped mdedit API key using the host's environment-variable mechanism:

```json
{
  "mcpServers": {
    "mdedit": {
      "type": "http",
      "url": "https://mcp.mdedit.ai/mcp",
      "headers": { "X-API-Key": "${MDEDIT_API_KEY}" }
    }
  }
}
```

The `${MDEDIT_API_KEY}` syntax shown here is supported by Claude Code; adapt it to the host's documented syntax. Keep this override in your private user configuration, not in the installed package. API keys remain optional rather than a fallback imposed on unfamiliar agent names.

## Existing installations

Update/reinstall the package to replace its old fixed Cognito adapter configuration. Existing Cognito connections remain accepted by the hosted service; this update does not delete provider accounts or revoke saved connections. A client switching from its old Cognito registration to Clerk must authenticate again and approve workspace access. Do not clear saved credentials unless that host's recovery flow requires it.

## Try it

- “List my Markdown documents on mdedit.ai.”
- “Create a document called Release notes.”
- “Review this document and show me actionable suggestions.”
- “Export this document as PDF.”
- “Publish this document.” The agent asks for confirmation before changing public visibility.

Responses should remain conversational and keep routing IDs, revisions, hashes, and job IDs internal.

## Versioning and rollback

All manifests use the same package version. Bump them together before a package release. Disable/uninstall with the host's plugin manager; revoke connections or API keys separately in mdedit account settings when required. Store listing approval is separate from source installation.

- [Clerk OAuth onboarding](https://clerk.com/docs/guides/configure/auth-strategies/oauth/how-clerk-implements-oauth)
- [Claude Code MCP authentication](https://code.claude.com/docs/en/mcp)
- [Gemini CLI MCP authentication](https://geminicli.com/docs/tools/mcp-server/)
- [Cursor MCP authentication](https://cursor.com/docs/mcp)
- Documentation: <https://mdedit.ai/docs/skills/install>
- Support: [support@mdedit.ai](mailto:support@mdedit.ai)
- Privacy: <https://mdedit.ai/privacy-policy>
- Terms: <https://mdedit.ai/terms>
