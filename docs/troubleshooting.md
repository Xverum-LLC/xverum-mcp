# Troubleshooting

## Connection

| Symptom | Likely cause |
|---------|--------------|
| Client shows the server but no tools | Connection succeeded but auth failed — complete the OAuth sign-in. |
| `401` on connect | No credential on the request. Sign in via the OAuth browser prompt. |
| Client can't add the server at all | Client may not support remote (streamable-HTTP) MCP servers, or may require OAuth — see [authentication.md](authentication.md). |

Endpoint is `https://mcp.xverum.com/mcp` — note the `/mcp` path.

## Errors from a tool call

Errors your assistant can fix by changing the request:

| Error | What to do |
|-------|------------|
| `off_topic_query` | The query wasn't a people search. Rephrase as a description of a person or role. |
| `invalid_pagination` | `page × page_size` exceeds the result window. Ask for an earlier page. |
| `profile_not_found` | No profile with that id. Re-run the search and use a fresh id. |
| `validation_error` | A parameter is out of range — e.g. `page_size` above 100 or a query over 500 characters. |

Errors your assistant should stop on:

| Error | What to do |
|-------|------------|
| `invalid_api_key` | Credential missing, malformed, or revoked. Re-authenticate. |
| `out_of_credits` | Out of credits — top up in the dashboard. |
| `account_not_authorized` | Account isn't entitled to this API — contact us. |
| `rate_limited` | Over the per-key limit. Back off for the `Retry-After` interval. |
| `upstream_unavailable` / `search_unavailable` / `auth_unavailable` | Temporary service issue. Retry with backoff. |
| `classification_degraded` | Query understanding is degraded. Retry with backoff. |

## Getting help

Every response carries a `request_id`. Include it when you open an issue or contact
support — it lets us trace the exact call.
