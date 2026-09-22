# Changelog

All notable changes to the Xverum MCP server are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/).

Maintained by Erez Bilu (erez.bilu@xverum.com).

## [2.2.7] — 2026-09-17

### Changed
- Registry version bumped to 2.2.7 in server.json to re-align with MCP Registry after intermediate patches (2.2.3–2.2.6) were published without tagged releases

## [2.2.2] — 2026-09-14

### Added
- `predict_job_change_xverum` tool: full response schema with `has_prediction`, `score`, `signal_date`, and `reasoning` fields
- No-prediction responses are free (0 credits); deduped retries are also free
- Example 3 (predict job changes) added to README

### Changed
- npm package consolidated to `@xverum/mcp` (scoped); `xverum-mcp` is deprecated and redirects to `@xverum/mcp`
- MCP Registry packages entry now declares `@xverum/mcp` v1.0.1
- `websiteUrl` corrected to `https://ask.xverum.com/docs/mcp-server` (was `ask.xverum.com`)
- Registry version aligned with repo `server.json`

### Fixed
- `docs/tools.md` predict_job_change section rewritten with accurate response schema
- `invalid_api_key` error row removed from authentication.md (OAuth only, no API keys)

## [2.2.1] — 2026-09-10

### Changed
- `websiteUrl` in server.json pointed at docs page (`ask.xverum.com/docs/mcp-server`)
- Registry packages entry switched from `xverum-mcp` to `@xverum/mcp`

## [2.2.0] — 2026-09-09

### Added
- `@xverum/mcp` 1.0.0 published to npm — scoped stdio proxy to the hosted server
- MCP Registry record now declares the npm package

## [2.1.0] — 2026-09-08

### Added
- `xverum-mcp` npm package (stdio proxy wrapper) — first npm publish
- `bin/xverum-mcp.js` CLI entry point using `mcp-remote`
- `package.json` with `mcpName`, bin entry, and SEO keywords

## [2.0.0] — 2026-09-01

### Changed
- **Transport upgrade:** streamable-http protocol
- **Auth overhaul:** migrated from API keys to OAuth — no secrets to manage
- MCP Registry live as `com.xverum/mcp`
- Smithery listing added
- One-click install badges for Cursor and VS Code
- `claude mcp add` snippet moved above the fold
- llms.txt restored to repo

## [1.0.1] — 2026-08-31

### Fixed
- Tool descriptions and credit costs aligned across README and docs
- `insufficient_tokens` error renamed to `out_of_credits`
- `predict_job_change_xverum` documented in tools.md
- Pricing link added to Credits section
- MCP Registry links uncommented (namespace now registered)

## [1.0.0] — 2026-08-30

### Added
- **Initial public release**
- Three tools: `search_people_xverum`, `enrich_person_xverum`, `predict_job_change_xverum`
- 750M professional profiles, licensed dataset (no scraping)
- OAuth authentication
- MIT license
- Full documentation: quickstart, tools reference, authentication, troubleshooting
- llms.txt for agent discoverability
- GDPR/CCPA compliance badges

## [0.1.0] — 2026-08-18

### Added
- Initial commit: server.json, README, docs structure
