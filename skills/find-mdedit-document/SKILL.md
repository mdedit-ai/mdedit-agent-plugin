---
name: find-mdedit-document
description: Find and read an existing Markdown Document stored in mdedit. Use when the user asks to locate, open, retrieve, quote, summarize, or inspect a saved mdedit document. Do not use for local files, web pages, or generic Markdown questions unrelated to mdedit storage.
compatibility: Requires the mdedit MCP server with workspace and article read tools.
---

# Find and read a document in mdedit

Resolve a real saved document before describing its content.

1. Resolve the workspace with `list_workspaces`.
   - If several workspaces could match, ask the user to choose by returned name.
   - If no workspace matches, stop without guessing.
2. Call `list_articles`. If exactly one workspace was returned, omit the workspace selector. If the user chose among several, pass `workspaceName`. When the user gives a title or keywords, pass them as `query`. Work from one bounded page at a time; do not retrieve every page merely to reproduce a long document list in chat.
3. Match the user's title or description against returned document metadata.
   - If there is one clear match, continue.
   - If several documents plausibly match, present only their returned titles and ask the user to choose.
   - If there is no match, say so and stop.
4. Call `read_article` with `articleTitle` and, when needed, `workspaceName`. Do not search local code or ask the user for routing identifiers.
5. For open, show, or preview requests, call `render_article` with `focus: preview`. Answer from the returned saved `content` when a textual answer is also needed. Distinguish exact saved content from any summary or interpretation. Keep `contentRevision`, `contentHash`, `workspaceId`, and `articleId` internal unless the user explicitly asks for diagnostic details.

This workflow is read-only. Do not call create, edit, publish, or unpublish tools. Never infer document content, identifiers, revisions, publication status, or URLs from titles or conversation memory.
