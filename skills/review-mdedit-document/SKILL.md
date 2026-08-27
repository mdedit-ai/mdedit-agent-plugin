---
name: review-mdedit-document
description: Review an existing Markdown Document in mdedit with anchored comments and suggestions, or accept or reject an existing suggestion. Use when the user asks to review, critique, proofread, suggest improvements, or decide pending review feedback on a saved mdedit document. Do not use when the user asks for an unrelated direct edit, publishing, or review of local or unsaved content.
compatibility: Requires the mdedit MCP server with article read and review tools.
---

# Review a document in mdedit

Read the saved document, then leave focused feedback without changing the writer's Markdown.

1. Resolve the workspace and document with `list_workspaces` and `list_articles`. Omit the workspace selector when there is one workspace; otherwise pass the chosen `workspaceName`. Pass the chosen `articleTitle` to later tools instead of asking for internal identifiers. Use `query` when the user provides a title or keywords, and work from one bounded page at a time instead of retrieving every page. If several returned names plausibly match, ask the user to choose by name. Never ask the user for an internal ID unless troubleshooting requires it.
2. Call `read_article` for the selected document. Use its current saved content as the only source for the review.
3. Call `list_review_threads` so you do not duplicate existing feedback.
4. Add only useful, non-duplicative review items:
   - Use `add_comment` for a question, concern, or explanation.
   - Use `add_suggestion` for a concrete replacement that the writer can accept or reject.
   - Anchor each item to a unique quote with nearby context when needed.
5. Call `render_article` with `focus: review` so the user can inspect and triage feedback. Summarize the review conversationally: state how many comments or suggestions were added and the main themes. Do not display `workspaceId`, `articleId`, `threadId`, `commandId`, hashes, revisions, or JSON unless the user explicitly asks for diagnostic details.

When the user asks to accept or reject review feedback:

1. Use the `suggestionId` and `targetId` already returned by `add_suggestion`, or call `list_review_threads` with `status: open` and match the user's description against the returned suggestions. Ask one focused question if more than one suggestion could match.
2. Call `accept_suggestion` to atomically apply the replacement and mark it accepted, or `reject_suggestion` to close it without changing the document. Never simulate acceptance with `edit_article` plus `resolve_thread`.
3. Confirm the decision conversationally only when the tool returns `applied: true`.

Review requests never imply permission to call `edit_article`, publish, or unpublish. Review tools work on ordinary documents; do not ask the user to enable collaboration. Treat a review mutation as successful only when the tool returns `applied: true`. If an anchor is ambiguous or changed, read the document again and ask one focused question instead of guessing.
