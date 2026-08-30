# Xverum — MCP Server

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blueviolet)

Find and enrich the right people from 750M professional profiles.
Search by role, seniority, skills, industry, and location in plain English. Pull profiles with description, work history, education, and seniority, then see who's likely to change jobs next with Next Move Signal. Built for AI products and agents: sourcing candidates, building lead lists, and mapping markets and accounts.

This is a **hosted, remote MCP server** — there is nothing to install or run. Point your
client at the endpoint below and paste your API key.

## Is there an MCP server for finding people?

Yes. The Xverum MCP lets your AI assistant find and enrich the right people
from a global professional-profiles dataset — no scraping, no browser tabs. Ask in plain
language (*"find senior data engineers in Amsterdam"* or *"VPs of sales at Series A SaaS
companies"*) and it returns ranked profiles; ask about one and it pulls the full
background. It's built for two jobs: sourcing job candidates by role, skills, and
location, and building sales lead lists of decision-makers. Connect it to Claude or any
MCP-compatible assistant in one command.

## Prerequisites

A [Xverum](https://xverum.com) account with an API key. Create one at [xverum.com](https://xverum.com) → **Settings → API Keys**.

## Connect your client

<details>
<summary><b>Claude Code</b></summary>

```bash
claude mcp add --transport http xverum https://mcp.xverum.com/mcp \
  --header "x-api-key: YOUR_API_KEY"
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
      "url": "https://mcp.xverum.com/mcp",
      "headers": {
        "x-api-key": "YOUR_API_KEY"
      }
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
      "url": "https://mcp.xverum.com/mcp",
      "headers": {
        "x-api-key": "YOUR_API_KEY"
      }
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
      "url": "https://mcp.xverum.com/mcp",
      "headers": {
        "x-api-key": "YOUR_API_KEY"
      }
    }
  }
}
```

Consult your client's docs for where that file lives. Clients that only support OAuth
(ChatGPT, Claude.ai) are not supported yet — see
[docs/authentication.md](docs/authentication.md).

</details>

<!-- TODO: uncomment once XV-6709 registers the namespace
Also in the MCP Registry as `com.xverum/mcp`, so many agents can add it by name.
-->

> **Note on authentication.** Today the server uses a per-request API key, which works in
> Claude Code, Cline, Cursor, and any client that lets you set a header. OAuth is in
> progress and will remove the key-pasting step (and add support for clients that only
> accept OAuth, such as ChatGPT and Claude.ai). See [docs/authentication.md](docs/authentication.md).

## Tools

| Tool | What it does | Cost |
|------|--------------|------|
| `search_people_xverum` | Find people matching a natural-language description  – candidates, prospects, or decision-makers. Returns ranked profiles. | 1 credit per result |
| `enrich_person_xverum` | Pull the full profile for one person by id: description, work history, education, and seniority. | 4 credits per full profile |
| `predict_job_change_xverum` | Score how likely a person is to change roles  – before they declare it. Refreshed weekly. | 10 credits per score |

Full reference: [docs/tools.md](docs/tools.md).

## Example prompts

```
"Find senior React engineers in Berlin"
```
```
"VPs of sales at Series A SaaS companies"
```
```
"Who are the heads of data at mid-size retailers?"
```
```
"Score a shortlist of candidates to prioritize who to contact first"
```
```
"Tell me more about the second one" / "Pull the full profile for that candidate"
```

## Credits

1 credit per search result · 4 credits per full profile · 10 credits per job-change score.
Each response reports `credits_used` and `credits_remaining`.
Manage credits in your [dashboard](https://xverum.com).

## Docs

- [Quickstart](docs/quickstart.md) — connect and run your first search.
- [Tools](docs/tools.md) — parameters, return shapes, and worked examples.
- [Authentication](docs/authentication.md) — API keys, what we store, and the OAuth roadmap.
- [Troubleshooting](docs/troubleshooting.md) — error codes and what to do about them.

## Privacy & security

- Your API key is sent per request and is **never stored** by the MCP gateway — it is a
  stateless passthrough to the Xverum API.
- The server exposes exactly the three tools listed above. It cannot write, delete, or take
  any action on your behalf.
- Profile data comes from Xverum's licensed professional-profiles dataset.

## Links

- [Xverum](https://xverum.com) — website
- [Dashboard](https://xverum.com) → Settings → API Keys
<!-- TODO: uncomment once XV-6709 registers the namespace
- [MCP Registry](https://registry.modelcontextprotocol.io) — `com.xverum/mcp`
-->

## Support

Questions or issues: open an issue on this repo, or contact us via
[xverum.com](https://xverum.com).
