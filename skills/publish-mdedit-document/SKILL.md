---
name: publish-mdedit-document
description: Check or change Public Document Publishing for an existing mdedit Markdown Document. Use when the user explicitly asks to publish, unpublish, inspect publication status, or create or update a public mded.it link. Do not use for private editor links, local files, or generic sharing advice.
compatibility: Requires the mdedit MCP server with publishing tools and explicit confirmation fields.
---

# Manage Public Document Publishing

Public visibility is a separate, explicit action. Never treat saving or editing as permission to publish.

1. Resolve the workspace and document using `list_workspaces`, `list_articles`, and `read_article`. Omit the workspace selector when there is one workspace; otherwise pass the chosen `workspaceName`. Pass the chosen `articleTitle` to later tools instead of asking for internal identifiers. Use `list_articles.query` when the user provides a title or keywords, and work from one bounded page at a time instead of retrieving every page. Ask the user to choose when a returned match is ambiguous.
2. For a status-only request, call `get_publish_status`, then call `render_article` with `focus: publish`. Report only the returned state and exact URL fields, then stop without mutating.
3. Before publishing or updating a public link, warn that anyone with the link can view the document and ask for explicit confirmation. Do not infer confirmation from an earlier save or edit request.
4. After confirmation, call `publish_article` with `confirmPublic: true`. The tool atomically defaults a new link to Live while preserving an existing link's mode, so do not add a status preflight. Include a custom slug or SEO metadata only when the user supplied or approved it.
5. Treat publication as successful only when the tool returns `publishId`, `shortUrl`, `fullUrl`, and `publishedAt`. Call `render_article` with `focus: publish`. Return the exact tool-provided public URL; prefer `shortUrl` for sharing.
6. Before disabling a public link, call `get_publish_status` to identify the current link and ask for explicit confirmation. After confirmation, call `unpublish_article` with `confirmUnpublish: true`, then refresh the publish component with `render_article`.

Never construct an `mded.it` URL, expose an editor URL as a public link, or claim publication from a requested slug. On denied permission, failure, or missing result fields, report the bounded error and leave visibility unchanged.
