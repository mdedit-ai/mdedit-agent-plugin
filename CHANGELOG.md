# Changelog

## 0.3.2 — 2026-10-08

- Bound Gemini OAuth requests to identity, refresh, and document-workflow scopes.

- Use Clerk OAuth discovery, DCR, and CIMD rather than fixed Cognito clients.
- Remove host-specific registration and callback requirements from adapters.
- Make browser OAuth the default in all five shared skills; retain optional API-key auth for clients without OAuth.
- Document workspace consent, refresh/reconnect, and existing-connection compatibility.


## 0.3.1

- Move the canonical public repository to the mdedit.ai GitHub organization.
- Update every portable and host-specific manifest to the new repository URL.

## 0.3.0

- Consolidate the portable Agent Plugin and the Gemini CLI, Cursor, and Claude Code compatibility manifests into one public package.
- Keep one generated set of Save, Find, Revise, Review, and Publish skills for every supported host.
- Add the Agent Plugins 1.0 root manifests for portable skill and Streamable HTTP MCP discovery.

## 0.2.1

- Validate the dedicated Claude Code public OAuth client and bounded document workflow.

## 0.1.0

- Add generated Save, Find, Revise, Review, and Publish skills.
- Configure dedicated public OAuth clients for Gemini CLI and Cursor.
