---
name: revise-mdedit-document
description: Safely revise an existing Markdown Document stored in mdedit with anchored, conflict-aware edits. Use when the user asks to update, rewrite, correct, insert, remove, or reorganize content in a saved mdedit document. Do not use for unsaved local Markdown, local files, or generic editing advice.
compatibility: Requires the mdedit MCP server with read_article and edit_article tools.
---

# Revise a document in mdedit

Read the current durable content, then apply the smallest unambiguous anchored change.

1. Resolve the workspace and document using `list_workspaces`, `list_articles`, and `read_article`. Omit the workspace selector when there is one workspace; otherwise pass the chosen `workspaceName`. Pass the chosen `articleTitle` to later tools instead of asking for internal identifiers. Use `list_articles.query` when the user provides a title or keywords, and work from one bounded page at a time instead of retrieving every page. Ask the user to choose when a returned workspace or document match is ambiguous.
2. Confirm the requested change is specific enough to apply. Ask a focused question when the target text, section, or replacement is unclear.
3. Build one or more `edit_article` operations:
   - Prefer a unique `quote` anchor with nearby `context`.
   - Use `afterHeading`, `beforeHeading`, or `inSection` for section changes.
   - Use a numeric range only when it came from current tool-returned content.
   - Avoid whole-document replacement unless the user requests a full rewrite.
4. Pass the current `contentHash` from `read_article` as `ifContentHash`.
5. Treat the edit as successful only when the result has no conflicts and returns new durable `content`, `contentRevision`, and `contentHash`.
6. Call `render_article` with `focus: preview`, then summarize what changed in one or two conversational sentences. Do not display revisions, hashes, IDs, or JSON unless the user explicitly asks for diagnostic details.

If the tool reports a hash mismatch or any conflict, stop, read the document again, and explain what changed concurrently. Do not retry against a new version without reconciling the user's intent. Never overwrite ambiguity, invent anchors, or claim success from requested text alone.
