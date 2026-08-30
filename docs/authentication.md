# Authentication

## OAuth

The server authenticates via OAuth. On first connection your client opens a browser
window to sign in to your Xverum account — no API keys to paste or store.

```bash
claude mcp add --transport http xverum https://mcp.xverum.com/mcp
```

Your identity resolves your credit balance, your rate limit, and your entitlements.

### How it works

1. Your MCP client connects to `https://mcp.xverum.com/mcp`.
2. The server responds with a `401` and `WWW-Authenticate: Bearer` challenge.
3. Your client opens a browser window for you to sign in.
4. Once signed in, subsequent requests are authenticated automatically.

### Which clients this works with

Any MCP client that supports OAuth for remote servers: **Claude Code**, **Claude.ai**,
**ChatGPT**, **Cursor**, **VS Code**, **Cline**, and most others.

### What we store

The MCP gateway holds no copy of your credentials. OAuth tokens are managed by the
identity provider and validated on each request. Revoking access in your dashboard
takes effect immediately.

## Errors

| Error | Meaning |
|-------|---------|
| `invalid_api_key` | Credential missing, malformed, or revoked. Re-authenticate. |
| `account_not_authorized` | The account exists but isn't entitled to this API. |
| `insufficient_tokens` | Out of credits — top up in the dashboard. |
| `rate_limited` | Over 60 req/min. Back off; the response carries `Retry-After`. |

Full list: [troubleshooting.md](troubleshooting.md).
