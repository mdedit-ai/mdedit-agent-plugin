# Markdown by mdedit.ai for Gemini CLI

Create, find, revise, review, export, and explicitly publish Markdown documents from Gemini CLI. The extension contains five focused document skills and connects to the hosted mdedit MCP server.

## Connect your account

Install the extension, restart Gemini CLI, and authenticate the `mdedit` MCP server when prompted. Gemini opens mdedit.ai in your browser and stores the resulting OAuth tokens locally. The extension never contains an API key or client secret.

## Try it

- “List my Markdown documents on mdedit.ai.”
- “Create a document called Release notes.”
- “Review this document and show me the actionable suggestions.”
- “Export this document as PDF.”
- “Publish this document.” The extension asks for confirmation before changing public visibility.

The package is generated from `@mdedit/agent-skills` and keeps internal IDs, hashes, and raw JSON out of normal responses.

See [the mdedit Skills installation guide](https://mdedit.ai/docs/skills/install) for current channel status and authentication instructions.
