# Tools reference

The server exposes exactly two tools. Both are read-only.

---

## `xverum_search_people`

Find people matching a natural-language description — candidates, prospects, or
decision-makers. Returns ranked professional profiles.

### Parameters

| Parameter | Type | Required | Default | Constraints | Description |
|-----------|------|----------|---------|-------------|-------------|
| `query` | string | yes | — | 1–500 chars | Natural-language search query |
| `page` | integer | no | `1` | ≥ 1 | 1-based page number |
| `page_size` | integer | no | `10` | 1–100 | Results per page |

### Returns

| Field | Type | Description |
|-------|------|-------------|
| `results` | array | Matched profiles (see below) |
| `total_count` | integer | Estimated total matches |
| `page` | integer | Current page |
| `page_size` | integer | Page size used |
| `tokens_charged` | integer | Tokens deducted (1 per result) |
| `request_id` | string | Correlation id — quote this in support requests |

Each result: `id`, `social_url`, `full_name`, `headline`, `location`, `company_name`,
`position`, `industry`.

### Example

```
xverum_search_people("senior ML engineer in Berlin with PyTorch experience", page_size=5)
```

```json
{
  "results": [
    {
      "id": "482910371",
      "social_url": "https://<public-profile-url>/anna-mueller-ml",
      "full_name": "Anna Müller",
      "headline": "Senior ML Engineer at DeepMind",
      "location": "Berlin, Germany",
      "company_name": "DeepMind",
      "position": "Senior ML Engineer",
      "industry": "artificial intelligence"
    }
  ],
  "total_count": 38,
  "page": 1,
  "page_size": 5,
  "tokens_charged": 1,
  "request_id": "9f1c2a7e6b3d4f08"
}
```

---

## `xverum_get_profile`

Pull the full details on one person — to qualify a candidate or prospect, or draft
outreach.

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | yes | — | Numeric profile id from a `xverum_search_people` result |
| `detail` | string | no | `basic` | `basic`, or `full` to add `experience`, `about_me`, `seniority` |

### Returns

| Field | Type | Description |
|-------|------|-------------|
| `social_url` | string \| null | Public profile URL |
| `full_name` | string | Full name |
| `headline` | string \| null | Professional headline |
| `location` | string \| null | Location |
| `company_name` | string \| null | Most recent employer |
| `position` | string \| null | Most recent title |
| `industry` | string \| null | Industry |
| `experience` | array | **`full` only** — full employment history |
| `about_me` | string \| null | **`full` only** — profile summary |
| `seniority` | string \| null | **`full` only** — current-role seniority |
| `tokens_charged` | integer | Tokens deducted (2 basic / 8 full) |
| `request_id` | string | Correlation id |

Each `experience` item: `position`, `company_name`, `start_time`, `end_time`,
`duration`, `location`, `job_description`, `industry`.

### Example

```
xverum_get_profile("482910371", detail="full")
```

```json
{
  "social_url": "https://<public-profile-url>/anna-mueller-ml",
  "full_name": "Anna Müller",
  "headline": "Senior ML Engineer",
  "location": "Berlin, Germany",
  "company_name": "DeepMind",
  "position": "Senior ML Engineer",
  "industry": "artificial intelligence",
  "experience": [
    {
      "position": "Senior ML Engineer",
      "company_name": "DeepMind",
      "start_time": "Mar 2022",
      "end_time": null,
      "duration": "3 yrs 2 mos",
      "location": "Berlin, Germany",
      "job_description": "Developing and deploying large-scale recommendation models.",
      "industry": "artificial intelligence"
    }
  ],
  "about_me": "Building production ML systems at scale.",
  "seniority": "senior",
  "tokens_charged": 8,
  "request_id": "1a2b3c4d5e6f7081"
}
```

---

## Rate limits

**60 requests/minute** per key by default. Exceeding it returns `rate_limited` with a
`Retry-After` delay; your assistant should back off and retry. Higher limits are
available — contact us.
