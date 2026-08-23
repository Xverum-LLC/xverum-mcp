# Tools reference

The server exposes exactly two tools. Both are read-only.

---

## `search_people_xverum`

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
search_people_xverum("senior ML engineer in Berlin with PyTorch experience", page_size=5)
```

```json
{
    "results": [
      {
        "id": “111111”111,
        "social_url": "https://es.linkedin.com/in/john-doe,
        "full_name": “John Doe",
        "headline": "Software Engineer",
        "location": "Madrid, Community of Madrid, Spain",
        "company_name": "Capgemini Engineering",
        "position": "Software Engineer",
        "industry": "Engineering Services"
      },
      {
        "id": “22222222”,
        "social_url": "https://linkedin.com/in/john-doe1”,                                             
        "full_name": “John Doe1”,
        "headline": "Software Engineer",
        "location": "Madrid, Spain",
        "company_name": "Spotify",
        "position": "Software Engineer",
        "industry": null
      },                                                                                                 
      {
        "id": “333333333”,
        "social_url": "https://linkedin.com/in/john-doe2”,
        "full_name": “John Doe2”,
        "headline": "software engineer",
        "location": "madrid, spain",
        "company_name": "synopsys",
        "position": "r & d software engineer",
        "industry": null
      }                                                                                                  
    ],
    "total_count": 10000,
    "page": 1,
    "page_size": 3,
    "credits_used": 40,
    "credits_remaining": 789,                                                                                
    "request_id": "228c5661d5b94dec"
  }
```

---

## `enrich_person_xverum`

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
enrich_person_xverum("482910371", detail="full")
```

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "content": [
        {
          "type": "text",
          "text": "{\"social_url\":\"https://linkedin.com/in/ameem-shaik\",\"full_name\":\"john-doe\",\"headline\":\"Software Engineer\",\"location\":\"Raleigh-Durham-Chapel 
  Hill Area, United States\",\"company_name\”:\”Sailor\”,\”position\":\"Senior Software Engineer\",\"industry\":null,\"experience\":[{\"position\":\"Senior Software 
  Engineer\",\"company_name\”:\”Sailor\”,\”start_time\":\"Nov 2022\",\"end_time\":\"Present\",\"duration\":\"3 years 5 
  months\",\"location\":\"Remote\",\"job_description\":\"\",\"industry\":null}],\"about_me\":\"Passionate software engineer that enjoys collaborating with others to solve 
  important and interesting problems.\",\"seniority\":\"mid_ic\",\"credits_used\":0,\"credits_remaining\":787,\"request_id\":\"ec70b707ed9e4542\"}"
        }
      ],
      "structuredContent": {
        "social_url": "https://linkedin.com/in/ameem-shaik",
        "full_name": “John Doe",
        "headline": "Software Engineer",                                                                 
        "location": "Raleigh-Durham-Chapel Hill Area, United States",                                    
        "company_name": “Sailor”,
        "position": "Senior Software Engineer",
        "industry": null,
        "experience": [
          {
            "position": "Senior Software Engineer",
            "company_name": “Sailor”,                                                               
            "start_time": "Nov 2022",
            "end_time": "Present",
            "duration": "3 years 5 months",
            "location": "Remote",
            "job_description": "",
            "industry": null
          }
        ],                                                                                               
        "about_me": "Passionate software engineer that enjoys collaborating with others to solve important and interesting problems.",
        "seniority": "mid_ic",
        "credits_used": 0,
        "credits_remaining": 787,
        "request_id": "ec70b707ed9e4542"
      },
      "isError": false
    }                                                                                                    
  }

```

---

## Rate limits

**60 requests/minute** per key by default. Exceeding it returns `rate_limited` with a
`Retry-After` delay; your assistant should back off and retry. Higher limits are
available — contact us.
