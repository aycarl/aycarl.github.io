This markdown contains up to 5 most recently updated documents from the multi-document connection, followed by the API documentation for interacting with them.

# Document Content (for reference only, use the API below for up-to-date data)

## Projects

```json
[
  {
    "id": "56C11230-3499-4495-91F3-86EE5259482F",
    "type": "page",
    "textStyle": "page",
    "styling": {
      "fontFamily": "system",
      "backgroundColor": "#FFFFFF #222222",
      "backdrop": "none",
      "themeId": "default",
      "separatorStyle": "line"
    },
    "markdown": "Projects",
    "content": [
      {
        "id": "D2F0B707-C91B-437B-829A-CBAA614963A2",
        "type": "collection",
        "markdown": "Collection",
        "items": [
          {
            "id": "3D3B5BE6-5C4F-4EAD-AF40-5651B4754883",
            "type": "collectionItem",
            "title": "Building the Foundation of a Cloud-Native Survey Engine",
            "properties": {
              "tags": "#Golang #System-Design #Docker #API-Development #Architectural-Documentation #Cloud-Native-Patterns",
              "project": [
                "Biami: An Autonomous Cloud-Native Survey Engine"
              ],
              "date": "2026-04-25"
            },
            "markdown": "Building the Foundation of a Cloud-Native Survey Engine",
            "content": [
              {
                "id": "FA14DC8E-7936-4145-9463-17EB4D6CDABE",
                "type": "text",
                "textStyle": "h1",
                "markdown": "# Building the Foundation of a Cloud-Native Survey Engine"
              },
              {
                "id": "2FA5D8CF-2C38-41A1-8690-3C2E1C02170E",
                "type": "text",
                "markdown": "**Biami** (Ewe: *\"Ask Me\"*) is an autonomous, production-grade survey platform engineered for high-concurrency data ingestion. This phase of the project established the architectural bedrock and the core API layer required to handle complex, multi-channel communication (USSD, SMS, and PWA) at scale."
              },
              {
                "id": "FFC4D81F-85B3-440D-B87E-203C64C75942",
                "type": "text",
                "textStyle": "h2",
                "markdown": "## The Vision"
              },
              {
                "id": "5E970258-419C-45CC-B89B-130038F535E8",
                "type": "text",
                "markdown": "The primary goal was to design a system capable of bridging the gap between sophisticated data collection and accessibility in under-served regions. By focusing on a decoupled, event-driven architecture, Biami is built to be resilient, cost-effective, and horizontally scalable."
              },
              {
                "id": "C71F8F1C-3969-4FDD-BF35-9CED831A01A8",
                "type": "text",
                "textStyle": "h2",
                "markdown": "## Core Achievements"
              },
              {
                "id": "1A3090D6-C2F0-4561-B9A4-D2EEC29B3473",
                "type": "text",
                "listStyle": "bullet",
                "markdown": "- **Engineered the \"Data Core\":** Defined a dynamic JSON schema for survey questions and respondent metadata, allowing the platform to ingest unstructured data without requiring frequent database migrations."
              },
              {
                "id": "D0349ECA-44F4-4CBA-A2D4-E4390150E597",
                "type": "text",
                "listStyle": "bullet",
                "markdown": "- **High-Performance API Implementation:** Developed the initial API layer using **Golang** and the **Gin** framework. This choice was strategic, prioritizing Go’s superior concurrency model for handling thousands of simultaneous USSD session webhooks."
              },
              {
                "id": "055C62F9-DD67-4456-BDA2-EE5B03616EE3",
                "type": "text",
                "listStyle": "bullet",
                "markdown": "- **Production-Ready Containerization:** Implemented a multi-stage **Docker** build process to ensure a minimal attack surface and optimized deployment footprints for cloud environments."
              },
              {
                "id": "1482BCD0-C6D8-4A39-A9A9-E638FB476189",
                "type": "text",
                "listStyle": "bullet",
                "markdown": "- **Professional Project Orchestration:** Established a standard Go project layout (following the `cmd/internal/pkg` pattern) and a centralized **Makefile** for automated testing and builds."
              },
              {
                "id": "5E61A3CF-8E26-42F8-BE44-898A7209845A",
                "type": "text",
                "textStyle": "h2",
                "markdown": "## Technical Implementation"
              },
              {
                "id": "9DC6E6A1-1F6D-48FF-BEE4-33D4EB46005A",
                "type": "text",
                "markdown": "The architecture centers on a high-speed webhook handler designed to interface with global mobile gateways."
              },
              {
                "id": "D521AE39-82DD-4CB6-9078-DFCB58B472AF",
                "type": "text",
                "listStyle": "bullet",
                "markdown": "- **Language:** Golang 1.22"
              },
              {
                "id": "C3941B67-8929-4A32-8687-E9941A911461",
                "type": "text",
                "listStyle": "bullet",
                "markdown": "- **Framework:** Gin Gonic"
              },
              {
                "id": "DCAB51CD-D306-4A53-A5C6-576C4DBCA4A0",
                "type": "text",
                "listStyle": "bullet",
                "markdown": "- **Deployment:** Docker (Containerized Microservice)"
              },
              {
                "id": "71EA6842-5740-414E-8C67-C3429337408D",
                "type": "text",
                "listStyle": "bullet",
                "markdown": "- **Pattern:** Monorepo with a separation of concerns between business logic (`/internal`) and public entry points (`/cmd`)."
              },
              {
                "id": "4C0A9BF5-283D-4601-8F9A-A26A944A6ADD",
                "type": "text",
                "textStyle": "h2",
                "markdown": "## Architectural Decisions & Lessons Learned"
              },
              {
                "id": "8B26A47D-829A-4710-8DA9-5EBE76DDD03A",
                "type": "text",
                "textStyle": "h3",
                "markdown": "### Transitioning to a Cloud-Native Stack"
              },
              {
                "id": "C9C26910-C3CE-4B13-9EE1-7A21D8932991",
                "type": "text",
                "markdown": "While the initial blueprint for this project was based on Django, I made the executive architectural decision to pivot to **Golang** for the API layer. This shift ensures the project aligns with modern Infrastructure as Code (IaC) standards and provides the low-latency performance required for real-time USSD interactions."
              },
              {
                "id": "BA42E8E4-3DEA-46E7-AC90-1CE8EC2D0744",
                "type": "text",
                "textStyle": "h3",
                "markdown": "### Documentation as Code"
              },
              {
                "id": "4575E444-CE78-4FAC-9CCD-ED868C48239D",
                "type": "text",
                "markdown": "I adopted an **Architecture Decision Record (ADR)** workflow early in the process. Documenting the \"why\" behind every tool choice—from the Gin framework to the multi-stage Docker build—proved essential for maintaining clarity and professional rigor as the system complexity grew."
              },
              {
                "id": "192A21C0-7935-4600-ADE0-F83F107ED525",
                "type": "text",
                "textStyle": "h3",
                "markdown": "### The Power of Identity"
              },
              {
                "id": "ABB05259-1E81-4469-A9B8-3ECA4252C56B",
                "type": "text",
                "markdown": "Naming the project **Biami** (\"Ask Me\" in Ewe) served as a constant reminder of the user-centric mission. It reinforced the importance of designing for accessibility, ensuring that the underlying cloud infrastructure supports users on basic mobile devices just as effectively as those on modern PWAs."
              },
              {
                "id": "0F7C0868-FB13-4F93-AEBE-03B1EFD06D23",
                "type": "text",
                "textStyle": "h2",
                "markdown": "## Future Trajectory"
              },
              {
                "id": "5766A179-E05E-4FBF-9342-3B45B74C24BC",
                "type": "text",
                "markdown": "With the core API and data schemas established, the project is positioned to move into full-scale cloud orchestration, utilizing Terraform for environment provisioning and serverless patterns for autonomous data processing."
              },
              {
                "id": "6B08052E-305C-459F-A785-F0B03255F367",
                "type": "line",
                "lineStyle": "regular",
                "markdown": "*****"
              },
              {
                "id": "B4F681BC-02E7-4EC7-90B4-37B9D96ECC24",
                "type": "text",
                "textStyle": "h3",
                "markdown": "### Key Competencies Demonstrated"
              },
              {
                "id": "D4751121-5E87-4E49-9525-CBD8B5F2AE75",
                "type": "text",
                "markdown": "`Golang` `System Design` `Docker` `API Development` `Architectural Documentation` `Cloud-Native Patterns`"
              },
              {
                "id": "6E7D40B3-79C5-4903-8A11-3E246B2FA437",
                "type": "text",
                "markdown": ""
              }
            ]
          }
        ]
      },
      {
        "id": "26746CD0-E65A-4952-AABD-E1209DCA9263",
        "type": "text",
        "markdown": ""
      }
    ]
  }
]
```

## Notes & Essays

```json
[
  {
    "id": "015067C7-3B65-47CE-A5FC-E09D9CC2CAC9",
    "type": "page",
    "textStyle": "page",
    "styling": {
      "fontFamily": "system",
      "backgroundColor": "#FFFFFF #222222",
      "backdrop": "none",
      "themeId": "default",
      "separatorStyle": "line"
    },
    "markdown": "Notes & Essays",
    "content": [
      {
        "id": "769CD161-FC8A-4B52-83AA-36A192AF9FCA",
        "type": "collection",
        "markdown": "Posts",
        "items": [
          {
            "id": "F8948A40-C711-4C35-8FCB-69D764ECCFE1",
            "type": "collectionItem",
            "title": "My Evolving Workflow as a Software Developer",
            "properties": {
              "date": "2026-04-19",
              "tags": "#software-development #developer-experience #dx #AI",
              "published": true
            },
            "markdown": "My Evolving Workflow as a Software Developer",
            "content": [
              {
                "id": "A999F7B0-FD0C-4B60-BCFE-331BA2930861",
                "type": "text",
                "markdown": "I have been in the software development space for roughly 15 years: from my first \"Hello world!\" print statement in Visual Basic as a student, to setting up automated systems and complex tasks programmatically now. As a former avid blogger and flash fiction writer back then, I would have hardly believed a word you said if you told me I would be crafting more logically coherent English prompts than typing C# or Python syntax. Yet this is a looming reality."
              },
              {
                "id": "4DCB968C-7791-4BA8-B967-3AD83D60070F",
                "type": "text",
                "markdown": "At the Anderson School of Management in ABQ, I made it a point to understand the fundamentals of model training and optimization in my Data Mining class, as well as what it took to create simple Python pipelines to tokenize texts for my Text Mining and Sentiment Analysis class. This was prior to the pandemic years. My priority was to learn enough to get a job that paid the bills and kept me mentally engaged and excited. I leaned towards programming for implementation and not necessarily the concepts, totally unaware that several labs across the globe were cooking what would change the programming playing field—RAG, LLMs, and Generative \"Artificial Intelligence.\""
              },
              {
                "id": "F029B918-464D-415A-B196-EE1CA1DD78A5",
                "type": "text",
                "markdown": "I have always looked to blogs, code repositories, Stack Overflow, and documentation sites to bootstrap my knowledge on how to implement custom features, connect systems, and cross-check syntax and best practices. Then came the programming tools that promised to reduce my research overhead when implementing a new task or greenfield project. Initially flawed in many ways, and progressively improving in complexity and accuracy at an overwhelming rate, AI tools and their developers have disrupted our workflows and daily experiences without our consent, and it is not stopping anytime soon."
              },
              {
                "id": "D47CC2D2-F923-4BC8-AC50-FE370971FE03",
                "type": "text",
                "markdown": "As with natural selection, you adapt or stay stubborn and arrive at the place where you are still trying to improve car speed while the rest of the world is optimizing hyperspeed trains and teleportation. I felt a lot of guilt initially when I started testing out the capabilities of some of the most popular AI coding tools. I felt that my code was my work and that if I relied on the assistance of an AI agent in coding, I was cheating and doing something illegal."
              },
              {
                "id": "CED44038-3752-461D-AC43-C9191655845F",
                "type": "text",
                "markdown": "As I mature both in my career and person, I quickly realized that I was harboring such a useless emotion. My code does not matter! My gradual mental shift from a product or service engineer to an engineer of experiences and value opened up the synapses that accelerated my developer experience and efficiency."
              },
              {
                "id": "A919DF81-2DB5-449E-B84F-65C01C4B58BF",
                "type": "text",
                "markdown": "I learn way more now and forget even more with just the sheer amount of information, options, and decisions that I have to deliberate on to perform meaningful programming tasks with AI. I have become more of a manager of software development than a software developer. Over the past two years, I noticed personal growth as a strategist who prioritizes higher-level architectural decisions and analyzes trade-offs. And I understand that succeeding and finding fulfillment in software engineering will eventually transcend the dopamine hits from solving an impossible algorithm by hand, solving some painful bug or refactoring an entire codebase."
              },
              {
                "id": "263531A4-8603-4452-B55F-8DDD2F59E2E2",
                "type": "text",
                "markdown": "I'm not entirely sure what the future will look like with the current trend, but I will still choose to focus on delivering human value beyond expectations. To do this, AI and code are but tools."
              }
            ]
          }
        ]
      }
    ]
  }
]
```

# Documentation of the Craft Multi-Document API

## Craft – API for aycarl API

**Version:** 1.0.0

### Overview
The Craft Multi-Document API provides programmatic access to multiple Craft documents. Access documents, blocks, collections, and search across your document set with unified authentication.

### Key Concepts

**Document IDs**: Each document is identified by an ID. Use `GET /documents` to discover available documents and their IDs.

**Cross-Document Operations**: Most operations require specifying which document to work with via block IDs. The API automatically resolves which document a block belongs to.

### Recommended Usage
This API is ideal for building integrations that need to work with multiple related documents, such as project documentation sets, knowledge bases, or multi-document workflows.

### Craft Markdown Extensions
The `markdown` field on blocks uses standard Markdown with the following Craft-specific extensions. These tags can appear in both input (when creating/updating blocks) and output (when reading blocks), unless noted otherwise.

#### Page Structure
| Tag | Description |
|-----|-------------|
| `<page>...<\/page>` | A nested page (sub-document). Optional attributes: `textStyle` (e.g. `"card"`), `cardLayout`, `id`. |
| `<card>...<\/card>` | Shorthand for `<page textStyle="card">`. |
| `<pageTitle>...<\/pageTitle>` | The title of a `<page>`. Always the first child inside `<page>`. |
| `<content>...<\/content>` | The body content of a `<page>`, following `<pageTitle>`. |

#### Block-Level Formatting
| Tag | Description |
|-----|-------------|
| `<callout>...<\/callout>` | Wraps blocks in a visually distinct callout box (similar to an admonition or aside). |
| `<caption>...<\/caption>` | Renders text in a smaller, muted caption style. |

#### Inline Formatting
| Tag | Description |
|-----|-------------|
| `<highlight color="...">...<\/highlight>` | Colored text highlight. Colors: yellow, green, mint, cyan, blue, purple, pink, red, gray, gradient-blue, gradient-purple, gradient-red, gradient-yellow, gradient-brown. |
| `==text==` | Shorthand for `<highlight color="yellow">`. |
| `<comment id="...">...<\/comment>` | Marks text that has a comment thread attached. The `id` references the comment thread. |
| `$formula$` or `$$formula$$` | LaTeX math formula, rendered inline or as a block. |

#### Links and Indentation
| Syntax | Description |
|--------|-------------|
| `[text](block://blockId)` | Cross-reference to another block by ID. Appears as `[text](invalid:out_of_scope)` when the target block is outside the current API scope. |
| `[text](date://YYYY-MM-DD)` | Link to a daily note for the given date. |
| 2+ leading spaces | Nesting level. Every 2 spaces represents one level of indentation. |

#### Collection Tags (output-only)
These tags appear only in responses, when the result contains collection data. They are not accepted as input.

| Tag | Description |
|-----|-------------|
| `<collection>...<\/collection>` | A collection (structured database). Contains `<title>`, `<properties>`, and either `<content>` (with items) or `<itemsPreview>`. |
| `<title>...<\/title>` | The name of a collection or collection item. |
| `<properties>...<\/properties>` | Comma-separated list of property (column) keys defined on the collection. |
| `<collectionItem>...<\/collectionItem>` | A single row/item in a collection. Contains `<property>` tags, a `<title>`, and optionally `<content>` or `<contentPreview>`. |
| `<property name="key">value<\/property>` | A property value on a collection item, where `name` is the property key. |
| `<contentPreview>...<\/contentPreview>` | A truncated preview of nested content, included when the response depth limit is reached instead of the full `<content>`. |
| `<itemsPreview>...<\/itemsPreview>` | A truncated preview of collection items, included when the response depth limit is reached instead of the full item list. |

### Development Tips
- Start with `GET /documents` to discover available documents and their IDs
- Use the `id` parameter in `GET /blocks` with a document's ID to fetch that document's content
- When inserting blocks, use `pageId` in the position object to specify the target document/block
- Use `GET /documents/search` to search across all documents with relevance-based ranking
- Collections can span multiple documents - use `GET /collections` to discover them

### Note for AI
When implementing functionality using this API, always make actual calls to these endpoints and verify the responses. Do not simulate or mock the API interactions or use hard-coded values on the client-side - use the real endpoints to ensure proper functionality and data handling.

**IMPORTANT: This is a production server connected to real user data.** Only perform testing operations that can be safely rolled back:

- Safe: Reading data (`GET` requests), creating test content that you delete immediately after
- Safe: Modifying content if you can restore it to its original state
- Safe: Moving blocks if you can move them back to their original position
- Unsafe: Permanent deletions, modifications without backup, or any changes you cannot reverse

Always verify rollback operations work before considering a test complete.

### Servers

- https://connect.craft.do/links/4GBve1yOGzU/api/v1
  API Server for aycarl API

---

## Endpoints

## Fetch Blocks

`GET /blocks`

Fetches content from documents in this multi-document connection. Use 'id' query parameter to specify which block to fetch.

Use `Accept` header `application/json` for structured data, `text/markdown` for rendered content.

**Content Rendering:** Text blocks contain markdown formatting and may include Craft-specific structural tags (e.g. `<page>`, `<callout>`, `<highlight>`). See the **Craft Markdown Extensions** section in the API description for the full list of tags.

**Scope Filtering:** Block links in markdown and collections, as well as relations are filtered to documents scope. Block links and date links are returned as `block://` and `date://` URLs.

**Tip:** Start by calling GET /documents to list available documents, then use their documentId values as the 'id' parameter to fetch each document's root content.

### Parameters

- **id** (required) (query): string
  The ID of the page block to fetch. Required for multi-document operations. Accepts IDs for documents, pages and blocks.
- **maxDepth** (query): number
  The maximum depth of blocks to fetch. Default is -1 (all descendants). With a depth of 0, only the specified block is fetched. With a depth of 1, only direct children are returned.
- **fetchMetadata** (query): boolean
  Whether to fetch metadata (comments, createdBy, lastModifiedBy, lastModifiedAt, createdAt) for the blocks. Default is false.

### Responses

#### 200
Successfully retrieved data

**Content-Type:** `application/json`

```json
{
  "id": "0",
  "type": "page",
  "textStyle": "page",
  "markdown": "<page>Document Title</page>",
  "content": [
    {
      "id": "1",
      "type": "text",
      "textStyle": "h1",
      "markdown": "# Main Section"
    },
    {
      "id": "2",
      "type": "text",
      "markdown": "This is some content in the document."
    },
    {
      "id": "3",
      "type": "page",
      "textStyle": "card",
      "markdown": "Subsection",
      "content": [
        {
          "id": "4",
          "type": "text",
          "markdown": "Nested content inside subsection."
        }
      ]
    }
  ]
}
```

---

## Search in Document

`GET /blocks/search`

Search content in one single Craft document. This is a secondary search tool that complements documents_search by allowing you to search within a single document.

### Parameters

- **documentId** (required) (query): string
  The document ID to search within.
- **pattern** (required) (query): string
  The search patterns to look for. Patterns must follow RE2-compatible syntax, which supports most common regular-expression features (literal text, character classes, grouping alternation, quantifiers, lookaheads, and fixed-width lookbehinds.
- **caseSensitive** (query): boolean
  Whether the search should be case sensitive. Default is false.
- **beforeBlockCount** (query): number
  The number of blocks to include before the matched block.
- **afterBlockCount** (query): number
  The number of blocks to include after the matched block.
- **fetchBlocks** (query): boolean
  Whether to include the full matched blocks with styling in the response. Default is false.

### Responses

#### 200
Successfully retrieved data

**Content-Type:** `application/json`


**Example: withContext**

Search for 'Description' with context blocks

```json
{
  "items": [
    {
      "blockId": "109",
      "markdown": "List Item A: Description text",
      "pageBlockPath": [
        {
          "id": "0",
          "content": "Document Title"
        }
      ],
      "beforeBlocks": [
        {
          "blockId": "108",
          "markdown": "## Second Level Header"
        }
      ],
      "afterBlocks": [
        {
          "blockId": "110",
          "markdown": "List Item B: Description text"
        },
        {
          "blockId": "111",
          "markdown": "List Item C: Description text"
        }
      ]
    }
  ]
}
```

**Example: deeplyNested**

Search in deeply nested structure

```json
{
  "items": [
    {
      "blockId": "15",
      "markdown": "Match found here",
      "pageBlockPath": [
        {
          "id": "0",
          "content": "Document Title"
        },
        {
          "id": "12",
          "content": "Section Card"
        },
        {
          "id": "14",
          "content": "Nested Card"
        }
      ],
      "beforeBlocks": [
        {
          "blockId": "13",
          "markdown": "Previous content"
        }
      ],
      "afterBlocks": [
        {
          "blockId": "16",
          "markdown": "Following content"
        }
      ]
    }
  ]
}
```

---

## Search across Documents

`GET /documents/search`

Search content across multiple documents using relevance-based ranking. This endpoint uses FlexiSpaceSearch to find matches across the documents in your multi-document connection.

- Search across all documents or filter to specific documents
- Optional document filtering (include or exclude specific documents)
- Relevance-based ranking (top 20 results)
- Content snippets with match highlighting
- Returns exposedDocumentId for each result

**Example Use Cases:**
- Find all mentions of a topic across project documents
- Search for specific content excluding certain documents
- Locate references across a set of related documents

### Parameters

- **include** (query): string
  Search terms to include in the search. Can be a single string or array of strings.
- **regexps** (query): string
  Search terms to include in the search. Patterns must follow RE2-compatible syntax, which supports most common regular-expression features (literal text, character classes, grouping alternation, quantifiers, lookaheads, and fixed-width lookbehinds.
- **documentIds** (query): string
  The document IDs to filter. If not provided, all documents will be searched. Can be a single string or array of strings.
- **documentFilterMode** (query): string
  Whether to include or exclude the specified documents. Default is 'include'. Only used when documentIds is provided.
- **fetchBlocks** (query): boolean
  Whether to include the full matched blocks with styling and block IDs in each search result. Default is false.

### Responses

#### 200
Successfully retrieved data

**Content-Type:** `application/json`


**Example: basicSearch**

Search for 'API' across all documents

```json
{
  "items": [
    {
      "documentId": "doc-123",
      "markdown": "The **API** endpoints are documented...",
      "blockIds": [
        "block-abc-123",
        "block-def-456"
      ]
    },
    {
      "documentId": "doc-456",
      "markdown": "**API** authentication requires...",
      "blockIds": [
        "block-ghi-789"
      ]
    }
  ]
}
```

**Example: filteredSearch**

Search with document filtering

```json
{
  "items": [
    {
      "documentId": "doc-123",
      "markdown": "Authentication **token** is required...",
      "blockIds": [
        "block-jkl-012"
      ]
    }
  ]
}
```

**Example: withMatchedBlocks**

Search with fetchBlocks=true

```json
{
  "items": [
    {
      "documentId": "doc-123",
      "markdown": "The **API** endpoints are documented...",
      "blockIds": [
        "block-abc-123"
      ],
      "blocks": [
        {
          "id": "block-abc-123",
          "type": "text",
          "markdown": "The API endpoints are documented in the developer guide"
        }
      ]
    }
  ]
}
```

---

## List Collections

`GET /collections`

List all collections across documents in this multi-document connection

### Parameters

- **documentIds** (query): string
  The document IDs to filter. If not provided, collections in all documents will be listed. Can be a single string or array of strings.
- **documentFilterMode** (query): string
  Whether to include or exclude the specified documents. Default is 'include'. Only used when documentIds is provided.

### Responses

#### 200
Success

**Content-Type:** `application/json`

```json
{
  "items": [
    {
      "id": "col1",
      "name": "Tasks",
      "itemCount": 5,
      "documentId": "doc1"
    },
    {
      "id": "col2",
      "name": "Notes",
      "itemCount": 3,
      "documentId": "doc2"
    }
  ]
}
```

---

## List Documents

`GET /documents`

Retrieve all documents accessible through this multi-document connection. Returns document IDs, titles, and deletion status. The document ID is the same as its root block ID - use it with GET /blocks to fetch content.

### Parameters

- **fetchMetadata** (query): boolean
  Whether to include metadata (lastModifiedAt, createdAt) in the response. Default is false.

### Responses

#### 200
Success

**Content-Type:** `application/json`


**Example: basic**

List of documents with deletion status

```json
{
  "items": [
    {
      "id": "doc-123",
      "title": "Project Plan",
      "isDeleted": false
    },
    {
      "id": "doc-456",
      "title": "Meeting Notes",
      "isDeleted": false
    },
    {
      "id": "doc-789",
      "title": "[Deleted Document]",
      "isDeleted": true
    }
  ]
}
```

**Example: withMetadata**

List with metadata (fetchMetadata=true)

```json
{
  "items": [
    {
      "id": "doc-123",
      "title": "Project Plan",
      "isDeleted": false,
      "lastModifiedAt": "2025-01-15T14:30:00Z",
      "createdAt": "2025-01-10T09:00:00Z",
      "clickableLink": "craftdocs://open?spaceId=space-uuid&documentId=doc-uuid-123"
    }
  ]
}
```

---

## Get Collection Schema

`GET /collections/{collectionId}/schema`

Get collection schema in JSON Schema format

### Parameters

- **format** (query): string
  The format to return the schema in. Default: json-schema-items. - 'schema': Returns the collection schema structure that can be edited - 'json-schema-items': Returns JSON Schema for addCollectionItems/updateCollectionItems validation
- **collectionId** (required) (path): string

### Responses

#### 200
Successfully retrieved data

**Content-Type:** `application/json`


**Example: schemaFormat**

Schema format response

```json
{
  "key": "tasks",
  "name": "Tasks",
  "contentPropDetails": {
    "key": "title",
    "name": "Title"
  },
  "properties": [
    {
      "key": "status",
      "name": "Status",
      "type": "select",
      "options": [
        "Not Started",
        "In Progress",
        "Completed"
      ]
    },
    {
      "key": "priority",
      "name": "Priority",
      "type": "select",
      "options": [
        "Low",
        "Medium",
        "High"
      ]
    },
    {
      "key": "dueDate",
      "name": "Due Date",
      "type": "date"
    }
  ],
  "propertyDetails": [
    {
      "key": "status",
      "name": "Status",
      "type": "select",
      "options": [
        "Not Started",
        "In Progress",
        "Completed"
      ]
    },
    {
      "key": "priority",
      "name": "Priority",
      "type": "select",
      "options": [
        "Low",
        "Medium",
        "High"
      ]
    },
    {
      "key": "dueDate",
      "name": "Due Date",
      "type": "date"
    }
  ]
}
```

**Example: jsonSchemaFormat**

JSON Schema format (for validation)

```json
{
  "type": "object",
  "properties": {
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "The title of the collection item"
          },
          "properties": {
            "type": "object",
            "properties": {
              "status": {
                "type": "string",
                "enum": [
                  "Not Started",
                  "In Progress",
                  "Completed"
                ],
                "description": "Status"
              },
              "priority": {
                "type": "string",
                "enum": [
                  "Low",
                  "Medium",
                  "High"
                ],
                "description": "Priority"
              },
              "dueDate": {
                "type": "string",
                "description": "Due Date"
              }
            }
          }
        },
        "required": [
          "title"
        ]
      }
    }
  },
  "required": [
    "items"
  ],
  "additionalProperties": false
}
```

---

## Get Collection Items

`GET /collections/{collectionId}/items`

Get all items from a collection

### Parameters

- **maxDepth** (query): number
  The maximum depth of nested content to fetch for each collection item. Default is -1 (all descendants). With a depth of 0, only the item properties are fetched without nested content.
- **collectionId** (required) (path): string

### Responses

#### 200
Successfully retrieved data

**Content-Type:** `application/json`

```json
{
  "items": [
    {
      "id": "item1",
      "title": "Task 1",
      "properties": {
        "status": "In Progress",
        "priority": "High",
        "assignee": "John Doe"
      },
      "content": [
        {
          "id": "1",
          "type": "text",
          "markdown": "Detailed description of the task."
        }
      ]
    },
    {
      "id": "item2",
      "title": "Task 2",
      "properties": {
        "status": "Done",
        "priority": "Low",
        "assignee": "Jane Smith"
      }
    }
  ]
}
```

---

## Get Connection Info

`GET /connection`

Returns connection metadata including space ID, space name, timezone, current time, and URL templates for constructing deep links to blocks.

### Responses

#### 200
Successfully retrieved data

**Content-Type:** `application/json`

```json
{
  "space": {
    "id": "string",
    "name": "string",
    "timezone": "string",
    "time": "string",
    "friendlyDate": "string"
  },
  "utc": {
    "time": "string"
  },
  "urlTemplates": {
    "app": "string"
  }
}
```

---

## Get Whiteboard Elements

`GET /whiteboards/{whiteboardBlockId}/elements`

Get all Excalidraw elements and appState from a whiteboard block. This is an experimental API, expect breaking changes.

### Parameters

- **whiteboardBlockId** (required) (path): string

### Responses

#### 200
Successfully retrieved data

**Content-Type:** `application/json`

```json
{
  "elements": [
    {
      "id": "string",
      "type": "string",
      "x": 0,
      "y": 0,
      "width": 0,
      "height": 0,
      "text": "string",
      "points": [
        [
          0
        ]
      ],
      "additionalProp": "<any>"
    }
  ],
  "assets": {
    "additionalProp": "<any>"
  },
  "appState": {
    "additionalProp": "<any>"
  }
}
```

---
