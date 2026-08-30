# Quickstart

Connect the Xverum People Search MCP server and run your first search in about a minute.

## 1. Get an API key

Sign in at [xverum.com](https://xverum.com) → **Settings → API Keys** → create a key.
You need an existing Xverum account; the MCP server connects an account, it does not
create one.

## 2. Connect your client

### Claude Code

```bash
claude mcp add --transport http xverum https://mcp.xverum.com/mcp \
  --header "x-api-key: YOUR_API_KEY"
```

Verify with `/mcp` — you should see `xverum` with three tools.

### Cursor

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

### Visual Studio Code

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

### Any other MCP client

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
[authentication.md](authentication.md).

## 3. Ask for people

Once connected, just describe who you're looking for in plain language:

- *"Find senior React engineers in Berlin."*
- *"VPs of marketing at Series B fintech companies."*
- *"Who are the heads of data at mid-size retailers?"*
- *"ICU nurses near Chicago."*

Then drill into any result:

- *"Tell me more about the second one."*
- *"Pull the full profile for that candidate."*

Or predict who's likely to move:

- *"Score these candidates — who's most likely to change jobs?"*

## What it costs

Calls draw down your account's credit balance: **1 credit per search result**,
**4 credits per full profile enrichment**, and **10 credits per job-change
prediction score**. Each response reports `credits_used` and
`credits_remaining` so your assistant can tell you what a query cost.

## Next

- [Tools reference](tools.md) — exact parameters and return shapes.
- [Troubleshooting](troubleshooting.md) — what each error means.
