<p align="center">
  <img src="xverum.png" alt="Xverum" width="900">
</p>

# Xverum — MCP Server

<p align="center">
  <a href="https://cursor.com/en/install-mcp?name=xverum&config=eyJ1cmwiOiJodHRwczovL21jcC54dmVydW0uY29tL21jcCJ9"><img src="https://custom-icon-badges.demolab.com/badge/Install_in_Cursor-000000?style=for-the-badge&logo=cursor-ai-white" alt="Install in Cursor" /></a>
  <a href="https://vscode.dev/redirect/mcp/install?name=xverum&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A//mcp.xverum.com/mcp%22%7D"><img src="https://custom-icon-badges.demolab.com/badge/Install_in_VS_Code-007ACC?style=for-the-badge&logo=vsc&logoColor=white" alt="Install in VS Code" /></a>
</p>

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

Sign up at [Ask Xverum](https://ask.xverum.com/).

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

Also in the MCP Registry as `com.xverum/mcp`, so many agents can add it by name.

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

**Example 1: Search people** (`search_people_xverum`)
```
Senior Python developers with Kubernetes in Seattle
```

**Example 2: Enrich a profile** (`enrich_person_xverum`)
```
Get profile id 401241903
```

## Credits

1 credit per search result · 4 credits per full profile · 10 credits per job-change score.
Each response reports `credits_used` and `credits_remaining`.
[See plans and pricing](https://stage-semantic.xverum.xyz/pricing)


## Docs

- [Quickstart](docs/quickstart.md) — connect and run your first search.
- [Tools](docs/tools.md) — parameters, return shapes, and worked examples.
- [Authentication](docs/authentication.md) — OAuth sign-in and what we store.
- [Troubleshooting](docs/troubleshooting.md) — error codes and what to do about them.

## Privacy & security

- Authentication is handled via OAuth — no API keys are stored or transmitted in config files.
- The server exposes exactly the three tools listed above. It cannot write, delete, or take
  any action on your behalf.
- Profile data comes from Xverum's licensed professional-profiles dataset.

## Links

- [Ask Xverum](https://ask.xverum.com/) — website
- [MCP Registry](https://registry.modelcontextprotocol.io) — `com.xverum/mcp`

## Support

Questions or issues: open an issue on this repo, or contact us via
[agentic.support@xverum.com](mailto:agentic.support@xverum.com).
