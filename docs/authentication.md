# Authentication

## Today: API key

The server authenticates each request with an `x-api-key` header carrying your Xverum
API key. Create one at [xverum.com](https://xverum.com) → **Settings → API Keys**.

```bash
claude mcp add --transport http xverum https://mcp.xverum.com/mcp \
  --header "x-api-key: YOUR_API_KEY"
```

The key identifies your account: it resolves your token balance, your rate limit, and
your entitlements. Treat it as a secret — anyone holding it can spend your tokens.

### What we store

The MCP gateway is a **stateless passthrough**. It holds no session, no database, and no
copy of your key — the key travels on each request and is forwarded to the Xverum API,
which validates it. Rotating or revoking a key in the dashboard takes effect immediately.

### Which clients this works with

Any client that lets you set a request header on a remote MCP server: **Claude Code**,
**Cline**, **Cursor**, **Continue**, and most others.

It does **not** work with clients that only support OAuth for remote servers — notably
**ChatGPT** and **Claude.ai**. Those are unblocked by the OAuth work below.

## Coming: OAuth

OAuth support is in progress. When it ships:

- You'll connect by signing in, instead of pasting a key.
- Clients that require OAuth (ChatGPT, Claude.ai) will work.
- The API-key path keeps working — it is not being removed.

OAuth connects an **existing** Xverum account. It does not create one; sign up at
[xverum.com](https://xverum.com) first, and sign in with the same email your account
uses.

## Errors

| Error | Meaning |
|-------|---------|
| `invalid_api_key` | Key missing, malformed, or revoked. Re-check the header. |
| `account_not_authorized` | The account exists but isn't entitled to this API. |
| `insufficient_tokens` | Out of tokens — top up in the dashboard. |
| `rate_limited` | Over 60 req/min. Back off; the response carries `Retry-After`. |

Full list: [troubleshooting.md](troubleshooting.md).
