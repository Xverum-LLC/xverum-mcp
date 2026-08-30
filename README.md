<img src="xverum.png" alt="Xverum" width="725" height="135">

# Xverum — MCP Server

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blueviolet)
![Claude Ready](https://img.shields.io/badge/Claude-Ready-orange)
![OpenAI Compatible](https://img.shields.io/badge/OpenAI-Compatible-lightgrey)
![GDPR Compliant](https://img.shields.io/badge/GDPR-Compliant-green)
![CCPA Compliant](https://img.shields.io/badge/CCPA-Compliant-green)

Find and enrich the right people from 750M professional profiles.
Search by role, seniority, skills, industry, and location in plain English. Pull profiles with description, work history, education, and seniority, then see who's likely to change jobs next with Next Move Signal. Built for AI products and agents: sourcing candidates, building lead lists, and mapping markets and accounts.

This is a **hosted, remote MCP server** — there is nothing to install or run. Point your
client at the endpoint below and sign in with OAuth.

## Is there an MCP server for finding people?

Yes. The Xverum MCP lets your AI assistant find and enrich the right people
from a global professional-profiles dataset — no scraping, no browser tabs. Ask in plain
language (*"find senior data engineers in Amsterdam"* or *"VPs of sales at Series A SaaS
companies"*) and it returns ranked profiles; ask about one and it pulls the full
background. It's built for two jobs: sourcing job candidates by role, skills, and
location, and building sales lead lists of decision-makers. Connect it to Claude or any
MCP-compatible assistant in one command.

## Prerequisites

An [Ask Xverum](https://ask.xverum.com/) account. Sign up at [xverum.com](https://myaccount.xverum.com/dashboard).

## Connect your client

<details>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add --transport http xverum https://mcp.xverum.com/mcp
```

Verify with `/mcp` — you should see `xverum` with three tools.

</details>

<details>
<summary><b>Cursor</b></summary>

Add to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "xverum": {
      "type": "http",
      "url": "https://mcp.xverum.com/mcp"
    }
  }
}
```

</details>

<details>
<summary><b>Visual Studio Code</b></summary>

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "xverum": {
      "type": "http",
      "url": "https://mcp.xverum.com/mcp"
    }
  }
}
```

</details>

<details>
<summary><b>Any other MCP client</b></summary>

Most clients take a JSON config of this shape:

```json
{
  "mcpServers": {
    "xverum": {
      "type": "http",
      "url": "https://mcp.xverum.com/mcp"
    }
  }
}
```

Consult your client's docs for where that file lives.

</details>

<!-- TODO: uncomment once XV-6709 registers the namespace
Also in the MCP Registry as `com.xverum/mcp`, so many agents can add it by name.
-->

> **Authentication.** The server uses OAuth — on first connection your client opens a
> browser window to sign in. No API keys to paste. See [docs/authentication.md](docs/authentication.md).

## Tools

| Tool | What it does | Cost |
|------|--------------|------|
| `search_people_xverum` | Find people matching a natural-language description  – candidates, prospects, or decision-makers. Returns ranked profiles. | 1 credit per result |
| `enrich_person_xverum` | Pull the full profile for one person by id: description, work history, education, and seniority. | 4 credits per full profile |
| `predict_job_change_xverum` | Score how likely a person is to change roles  – before they declare it. Refreshed weekly. | 10 credits per score |

Full reference: [docs/tools.md](docs/tools.md).

### Examples

**Example 1: Talent Sourcing**
```
Find senior React engineers in Berlin with fintech experience
```

**Example 2: Sales Prospecting**
```
VPs of sales at Series A SaaS companies
```

**Example 3: Market Research**
```
Who are the heads of data at mid-size retailers?
```

## Credits

1 credit per search result · 4 credits per full profile · 10 credits per job-change score.
Each response reports `credits_used` and `credits_remaining`.


## Docs

- [Quickstart](docs/quickstart.md) — connect and run your first search.
- [Tools](docs/tools.md) — parameters, return shapes, and worked examples.
- [Authentication](docs/authentication.md) — API keys, what we store, and the OAuth roadmap.
- [Troubleshooting](docs/troubleshooting.md) — error codes and what to do about them.

## Privacy & security

- Authentication is handled via OAuth — no API keys are stored or transmitted in config files.
- The server exposes exactly the three tools listed above. It cannot write, delete, or take
  any action on your behalf.
- Profile data comes from Xverum's licensed professional-profiles dataset.

## Links

- [Ask Xverum](https://ask.xverum.com/) — website
- [Dashboard](https://myaccount.xverum.com/dashboard)
<!-- TODO: uncomment once XV-6709 registers the namespace
- [MCP Registry](https://registry.modelcontextprotocol.io) — `com.xverum/mcp`
-->

## Support

Questions or issues: open an issue on this repo, or contact us via
[agentic.support@xverum.com](mailto:agentic.support@xverum.com).
