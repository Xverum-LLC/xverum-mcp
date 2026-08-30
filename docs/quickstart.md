# Quickstart

Connect the Xverum People Search MCP server and run your first search in about a minute.

## 1. Get an account

Sign up at [Ask Xverum](https://ask.xverum.com/). You need an existing Xverum account;
the MCP server connects an account, it does not create one.

## 2. Connect your client

### Claude Code

```bash
claude mcp add --transport http xverum https://mcp.xverum.com/mcp
```

Verify with `/mcp` — you should see `xverum` with three tools.

### Cursor

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

### Visual Studio Code

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

### Any other MCP client

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
