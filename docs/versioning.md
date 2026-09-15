# Versioning and deprecation policy

## Versioning scheme

The Xverum MCP server uses [Semantic Versioning](https://semver.org/) (semver).

- **Major** (e.g., 2.0.0 → 3.0.0): breaking changes — a tool removed, a response field type changed, a required parameter added
- **Minor** (e.g., 2.2.0 → 2.3.0): new features — a new tool added, new optional response fields, new optional parameters
- **Patch** (e.g., 2.2.1 → 2.2.2): fixes — corrected metadata, documentation updates, registry alignment

The version is tracked in `server.json` and published to the [MCP Registry](https://registry.modelcontextprotocol.io) as `com.xverum/mcp`.

The npm wrapper package (`@xverum/mcp`) has its own version in `package.json`. It follows semver independently — a wrapper update does not change the server version, and vice versa.

## What counts as a breaking change

| Breaking | Non-breaking |
|----------|-------------|
| Removing a tool | Adding a new tool |
| Removing a required response field | Adding optional fields to responses |
| Changing a response field's type | Adding optional parameters |
| Adding a new required parameter | Relaxing a constraint (e.g., raising a limit) |
| Changing the authentication method | Adding new error codes |

## Deprecation policy

We announce deprecations **at least 90 days** before removal.

Deprecated features are communicated via:
1. The [CHANGELOG.md](../CHANGELOG.md) in this repository
2. GitHub Releases
3. A `Sunset` HTTP header on affected responses (where applicable)

### Recent deprecations

| What | Deprecated | Replacement | Removed |
|------|-----------|-------------|---------|
| npm package `xverum-mcp` | 2026-09-09 | `@xverum/mcp` — run `npx @xverum/mcp` | Not yet (npm redirects automatically) |

## Where changes are announced

- [CHANGELOG.md](../CHANGELOG.md) — every release
- [GitHub Releases](https://github.com/Xverum-LLC/xverum-mcp/releases) — tagged releases with notes
- [MCP Registry](https://registry.modelcontextprotocol.io) — version bumps on `com.xverum/mcp`
