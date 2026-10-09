import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, cpSync, rmSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const manifest = JSON.parse(readFileSync('gemini-extension.json', 'utf8'));
assert.equal(manifest.name, 'mdedit');
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
if (process.env.RELEASE_VERSION) assert.equal(manifest.version, process.env.RELEASE_VERSION);
assert.equal(manifest.mcpServers?.mdedit?.httpUrl, 'https://mcp.mdedit.ai/mcp');
assert.deepEqual(manifest.mcpServers.mdedit.oauth, {
  enabled: true,
  scopes: ['openid', 'email', 'offline_access', 'workspaces:read', 'articles:read', 'articles:write', 'reviews:read', 'reviews:write', 'publishing:read', 'publishing:write', 'conversions:execute'],
});
const skills = ['find', 'publish', 'review', 'revise', 'save'].map(name => `${name}-mdedit-document`);
assert.deepEqual(readdirSync('skills').sort(), skills.sort());
for (const name of skills) {
  const text = readFileSync(`skills/${name}/SKILL.md`, 'utf8');
  assert.ok(text.startsWith(`---\nname: ${name}\n`));
  assert.match(text, /description:/);
  assert.doesNotMatch(text, /mdh_[A-Za-z0-9_-]{20,}|clientSecret|access_token|refresh_token/);
}
assert.match(readFileSync('skills/publish-mdedit-document/SKILL.md', 'utf8'), /confirm/i);
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/stage', { recursive: true });
const entries = ['gemini-extension.json', 'skills', 'README.md', 'LICENSE', 'CHANGELOG.md'];
for (const entry of entries) cpSync(entry, `dist/stage/${entry}`, { recursive: true, dereference: false });
execFileSync('tar', ['-czf', '../mdedit.tar.gz', ...entries], { cwd: 'dist/stage' });
const listing = execFileSync('tar', ['-tzf', 'dist/mdedit.tar.gz'], { encoding: 'utf8' });
assert.ok(listing.split('\n').includes('gemini-extension.json'));
assert.doesNotMatch(listing, /\.git\/|\.claude-plugin|\.cursor-plugin|^plugin\.json$/m);
rmSync('dist/stage', { recursive: true });
console.log(`Gemini extension ${manifest.version}: five skills validated; dist/mdedit.tar.gz built`);
