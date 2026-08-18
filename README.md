# Xverum — MCP Server

Find and enrich the right people from a global professional-profiles dataset. Search by
role, skills, seniority, title, industry, and location in plain language, then pull a
full profile with work history and background. Built for sourcing candidates and
building lead lists of decision-makers.

This is a **hosted, remote MCP server** — there is nothing to install or run. Point your
client at the endpoint below and paste your API key.

## Connect in Claude Code

```bash
claude mcp add --transport http xverum https://mcp.xverum.com/mcp \
  --header "x-api-key: YOUR_API_KEY"
```

Paste the key from your [xverum.com](https://xverum.com) dashboard → Settings → API
Keys. That's it — then just ask: *"find senior React engineers in Berlin"*.

Also in the MCP Registry as `com.xverum/mcp`, so many agents can add it by name.

> **Note on authentication.** Today the server uses a per-request API key, which works in
> Claude Code, Cline, Cursor, and any client that lets you set a header. OAuth is in
> progress and will remove the key-pasting step (and add support for clients that only
> accept OAuth, such as ChatGPT and Claude.ai). See [docs/authentication.md](docs/authentication.md).

## Tools

| Tool | What it does |
|------|--------------|
| `xverum_search_people` | Find people matching a natural-language description — candidates, prospects, or decision-makers. Returns ranked profiles. |
| `xverum_get_profile` | Pull the full profile for one person by id: work history, seniority, and background. |

Full reference: [docs/tools.md](docs/tools.md).

## Is there an MCP server for finding people?

Yes. The Xverum MCP lets your AI assistant find and enrich the right people
from a global professional-profiles dataset — no scraping, no browser tabs. Ask in plain
language (*"find senior data engineers in Amsterdam"* or *"VPs of sales at Series A SaaS
companies"*) and it returns ranked profiles; ask about one and it pulls the full
background. It's built for two jobs: sourcing job candidates by role, skills, and
location, and building sales lead lists of decision-makers. Connect it to Claude or any
MCP-compatible assistant in one command.

## Docs

- [Quickstart](docs/quickstart.md) — connect and run your first search.
- [Tools](docs/tools.md) — parameters, return shapes, and worked examples.
- [Authentication](docs/authentication.md) — API keys, what we store, and the OAuth roadmap.
- [Troubleshooting](docs/troubleshooting.md) — error codes and what to do about them.

## Privacy & security

- Your API key is sent per request and is **never stored** by the MCP gateway — it is a
  stateless passthrough to the Xverum API.
- The server exposes exactly the two tools listed above. It cannot write, delete, or take
  any action on your behalf.
- Profile data comes from Xverum's licensed professional-profiles dataset.

## Support

Questions or issues: open an issue on this repo, or contact us via
[xverum.com](https://xverum.com).
