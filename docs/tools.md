# Tools reference

The server exposes exactly two tools. Both are read-only.

---

## `search_people_xverum`

Find people matching a natural-language description — candidates, prospects, or
decision-makers. Returns ranked professional profiles.
Set `page_size` to the smallest number of results the user needs, because each
returned result costs 1 credit.

### Parameters

| Parameter | Type | Required | Default | Constraints | Description |
|-----------|------|----------|---------|-------------|-------------|
| `query` | string | yes | — | 1–500 chars | Natural-language search query |
| `page` | integer | no | `1` | ≥ 1 | 1-based page number |
| `page_size` | integer | no | `10` | 1–100 | Results per page |

### Returns

| Field | Type | Description |
|-------|------|-------------|
| `result_type` | string | Result discriminator; `people` for people search |
| `results` | array | Matched profiles (see below) |
| `total_count` | integer | Estimated total matches |
| `page` | integer | Current page |
| `page_size` | integer | Page size used |
| `credits_used` | integer | Credits deducted (1 per result) |
| `credits_remaining` | integer | Credits remaining after this call |
| `request_id` | string | Correlation id — quote this in support requests |

Each result: `id`, `social_url`, `full_name`, `headline`, `location`, `company_name`,
`position`, `industry`, `evidence_summary`.

`evidence_summary` is a freshness label such as `Verified last 30 days`, down to
`Verified over 120 days ago`.

### Example

```
search_people_xverum("senior ML engineer in Berlin with PyTorch experience", page_size=1)
```

```json
{
  "result_type": "people",
  "results": [
    {
      "id": "482910371",
      "social_url": "https://linkedin.com/in/john-doe2",
      "full_name": "John Doe",
      "headline": "Senior ML Engineer at DeepMind",
      "location": "Berlin, Germany",
      "company_name": "DeepMind",
      "position": "Senior ML Engineer",
      "industry": "artificial intelligence",
      "evidence_summary": "Verified last 30 days"
    }
  ],
  "total_count": 38,
  "page": 1,
  "page_size": 1,
  "credits_used": 1,
  "credits_remaining": 4999,
  "request_id": "9f1c2a7e6b3d4f08"
}
```

---

## `enrich_person_xverum`

Get the full profile for one person returned by `search_people_xverum` —
employment history, education history, background/about information, and seniority.

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `id` | string | yes | — | Numeric profile id from a `search_people_xverum` result |

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
| `evidence_summary` | string | Profile freshness, from `Verified last 30 days` to `Verified over 120 days ago` |
| `experience` | array | Full employment history |
| `education` | array | Full education history |
| `about_me` | string \| null | Profile summary |
| `seniority` | string \| null | Current-role seniority |
| `credits_used` | integer | Credits deducted (4) |
| `credits_remaining` | integer | Credits remaining after this call |
| `request_id` | string | Correlation id |

Each `experience` item: `position`, `company_name`, `start_time`, `end_time`,
`duration`, `location`, `job_description`, `industry`.

Each `education` item: `social_url`, `institution_name`, `start_time`, `end_time`,
`description` (all nullable strings) plus `degree` (a list of strings, `[]` if none).

### Example

```
enrich_person_xverum("482910371")
```

```json
{
  "social_url": "https://linkedin.com/in/john-doe2",
  "full_name": "John Doe",
  "headline": "Senior ML Engineer",
  "location": "Berlin, Germany",
  "company_name": "DeepMind",
  "position": "Senior ML Engineer",
  "industry": "artificial intelligence",
  "evidence_summary": "Verified last 30 days",
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
  "education": [
    {
      "social_url": "https://linkedin.com/school/tu-berlin",
      "institution_name": "TU Berlin",
      "degree": ["MSc Computer Science"],
      "start_time": "2015",
      "end_time": "2017",
      "description": null
    }
  ],
  "about_me": "Building production ML systems at scale.",
  "seniority": "senior",
  "credits_used": 4,
  "credits_remaining": 4995,
  "request_id": "1a2b3c4d5e6f7081"
}
```

---

## Rate limits

**60 requests/minute** per key by default. Exceeding it returns `rate_limited` with a
`Retry-After` delay; your assistant should back off and retry. Higher limits are
available — contact us.
