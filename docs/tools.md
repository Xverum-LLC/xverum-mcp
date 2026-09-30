# Tools reference

The server exposes exactly five tools. All are read-only.

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
| `usage_notice` | object \| null | Account credit-usage notice `{ message, approve_url, upgrade_url }` when lifecycle messaging is enabled and the account is near or at its plan limit; shown at most once per billing cycle |

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
| `usage_notice` | object \| null | Account credit-usage notice `{ message, approve_url, upgrade_url }` when lifecycle messaging is enabled and the account is near or at its plan limit; shown at most once per billing cycle |

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

## `predict_job_change_xverum`

Predict how likely one person is to change role, before they declare they are open
to work — for outreach timing in recruiting, champion-departure alerts in sales, and
talent-movement analysis. 



### Parameters

| Parameter | Location | Required | Description |
|-----------|----------|----------|-------------|
| `id` | path | yes | Opaque profile id, e.g. from `ProfileCard.id` |

### Returns

| Field | Type | Description |
|-------|------|-------------|
| `has_prediction` | boolean | Whether we hold a prediction for this person. Branch on this. |
| `score` | number \| null | Likelihood of a role change, `0.0`–`1.0`; higher is more likely. `null` when `has_prediction` is `false` |
| `signal_date` | string \| null | Date the evidence behind the score was observed, `YYYY-MM-DD`. `null` when `has_prediction` is `false` |
| `reasoning` | object[] | Contributing factors, most significant first; `[]` when none were recorded |
| `credits_used` | integer | Billable credits reported for this call (10; `0` with no prediction, and `0` on a deduped retry) |
| `credits_remaining` | integer | Credits left after this call |
| `request_id` | string | Correlation id |
| `usage_notice` | object \| null | As on the other endpoints |

### Example

```
predict_job_change_xverum("482910371")
```

```json
{
  "has_prediction": true,
  "score": 0.87,
  "signal_date": "2026-05-09",
  "reasoning": [
    { "category": "tenure_in_role", "intensity": "high", "weight": 0.31, "rank": 1 },
    { "category": "company_signal", "intensity": "medium", "weight": 0.12, "rank": 2 }
  ],
  "credits_used": 10,
  "credits_remaining": 4986,
  "request_id": "1a2b3c4d5e6f7081"
}
```
No prediction — the common case, and free:

```json
{
  "has_prediction": false,
  "score": null,
  "signal_date": null,
  "reasoning": [],
  "credits_used": 0,
  "credits_remaining": 4996,
  "request_id": "1a2b3c4d5e6f7081"
}
```

---

## `search_company_xverum`

Find companies from a natural-language description. Returns a ranked page of
company summary cards, each with an `id` you pass to `enrich_company_xverum`.
Set `page_size` to the smallest number of results the user needs, because each
returned result costs 1 credit.

Geography is the only hard filter. Industry, headcount, founded year and
organisation type are soft ranking boosts — they push matching companies up the
page but never remove anyone from it.

### Parameters

| Parameter | Type | Required | Default | Constraints | Description |
|-----------|------|----------|---------|-------------|-------------|
| `query` | string | yes | — | 1–500 chars | Natural-language company query |
| `page` | integer | no | `1` | ≥ 1 | 1-based page number |
| `page_size` | integer | no | `10` | 1–100 | Results per page |

`page * page_size` must not exceed 1,000, or you get `400 invalid_pagination`.
Retrieval depth is the same 1,000, so `total_count` values above that do not
mean that many reachable rows.

### Returns

| Field | Type | Description |
|-------|------|-------------|
| `result_type` | string | Result discriminator; `company` for company search |
| `results` | array | Matched company cards (see below) |
| `total_count` | integer | Estimated total matches — non-geo attributes are scoring clauses, so a document matching any of them counts. Do not quote it as a segment size |
| `page` | integer | Current page |
| `page_size` | integer | Page size used |
| `credits_used` | integer | Credits deducted (1 per result) |
| `credits_remaining` | integer | Credits remaining after this call |
| `request_id` | string | Correlation id — quote this in support requests |
| `usage_notice` | object \| null | Account credit-usage notice `{ message, approve_url, upgrade_url }` when lifecycle messaging is enabled and the account is near or at its plan limit; shown at most once per billing cycle |

Each result (company card): `id`, `social_url`, `company_name`, `slogan`,
`headquarters`, `country_code`, `industry`, `employees_num`, `website`,
`founded`.

`company_name` is nullable — a small number of indexed companies carry only a
slug. `headquarters` is free text, usually "City, Region" — display it, do not
parse it. `country_code` is lowercase; note `uk`, not `gb`. `employees_num` is
`null` when unknown, never `0`.

### Example

```
search_company_xverum("cybersecurity companies in Germany", page_size=1)
```

```json
{
  "result_type": "company",
  "results": [
    {
      "id": "88673718",
      "social_url": "https://linkedin.com/company/cloumo",
      "company_name": "Cloumo GmbH",
      "slogan": null,
      "headquarters": "Munich, Bavaria",
      "country_code": "de",
      "industry": "IT Services and IT Consulting",
      "employees_num": 14,
      "website": "https://www.cloumo.com",
      "founded": 2021
    }
  ],
  "total_count": 1259,
  "page": 1,
  "page_size": 1,
  "credits_used": 1,
  "credits_remaining": 1521,
  "request_id": "6d966bdee75646c8"
}
```

---

## `enrich_company_xverum`

Get the full record for one company returned by `search_company_xverum` —
description, specialties, office locations, organisation type and follower
count.

This endpoint carries no employee lists or person records. Use
`search_people_xverum` / `enrich_person_xverum` for people.

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `company_id` | string | yes | — | Numeric company id from a `search_company_xverum` result |

The id must be numeric. Non-numeric values are rejected before the request
reaches `/v1`.

### Returns

| Field | Type | Description |
|-------|------|-------------|
| `social_url` | string \| null | Company social URL |
| `company_name` | string \| null | Company name |
| `slogan` | string \| null | Short tagline |
| `headquarters` | string \| null | Free text, usually "City, Region" |
| `country_code` | string \| null | Lowercase country code |
| `industry` | string \| null | Industry vertical |
| `employees_num` | integer \| null | Employee count; `null` when unknown |
| `website` | string \| null | Company website |
| `founded` | integer \| null | Year founded |
| `about_us` | string \| null | Company description |
| `specialties` | string[] | Self-declared specialties; `[]` when none |
| `locations` | object[] | Office addresses `{ address, address_2, primary }`, all optional |
| `type` | string \| null | Organisation type, e.g. `"Privately Held"`, `"Nonprofit"` |
| `social_followers` | integer \| null | Follower count; `null` if unknown |
| `credits_used` | integer | Credits deducted (4; `0` on a deduped retry) |
| `credits_remaining` | integer | Credits remaining after this call |
| `request_id` | string | Correlation id |
| `usage_notice` | object \| null | As on the other endpoints |

The charge is deduped per `(api-key, company_id)` within a short window: a
repeat fetch re-reads fresh data but charges `0`. Only the charge is deduped —
the data returned is always current.

### Example

```
enrich_company_xverum("88673718")
```

```json
{
  "social_url": "https://linkedin.com/company/cloumo",
  "company_name": "Cloumo GmbH",
  "slogan": null,
  "headquarters": "Munich, Bavaria",
  "country_code": "de",
  "industry": "IT Services and IT Consulting",
  "employees_num": 14,
  "website": "https://www.cloumo.com",
  "founded": 2021,
  "about_us": "Cloumo GmbH is an IT services company based in Munich...",
  "specialties": ["IT", "Cloud", "M365", "IT-Sicherheit", "and IT-Helpdesk"],
  "locations": [
    {
      "address": "Leopoldstraße 87",
      "address_2": "Munich, Bavaria 80802, DE",
      "primary": true
    }
  ],
  "type": "Self-Owned",
  "social_followers": 47,
  "credits_used": 4,
  "credits_remaining": 1517,
  "request_id": "7e2f3a8b9c1d4e05"
}
```

---

## Rate limits

**60 requests/minute** per key by default. Exceeding it returns `rate_limited` with a
`Retry-After` delay; your assistant should back off and retry. Higher limits are
available — contact us.
