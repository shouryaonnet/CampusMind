# CampusMind

**A centralized academic document retrieval platform that helps students
discover relevant study materials through content-based search.**

CampusMind is an academic Information Retrieval project. It helps
students find notes, lecture PDFs, syllabi, and previous-year question
papers by searching the actual text inside documents---not only their
file names.

> **Status:** Planning / initial development\
> **Project type:** Academic Major Project --- Information Retrieval

## The Problem

Academic resources are often scattered across folders, messaging groups,
drives, and websites. Finding a specific concept inside a large
collection of PDFs can be slow, particularly when the exact document
name is unknown.

CampusMind provides a searchable collection of academic documents and
ranks results according to the relevance of their contents.

## Key Features

-   **Full-text PDF search:** Search inside PDF content, not just titles
    or file names.
-   **Relevance ranking:** Use BM25 to rank documents against a search
    query.
-   **Search snippets:** Show useful excerpts from matching documents.
-   **Filters:** Narrow results by subject, semester, academic year, and
    document type.
-   **PDF upload and extraction:** Upload PDFs and extract their text
    for indexing.
-   **Similar-document search:** Upload a reference PDF and discover
    related documents using Apache Solr's MoreLikeThis feature.
-   **Document management:** Maintain document metadata and support
    administrative review or approval.
-   **Retrieval evaluation:** Measure Precision@10, Recall@10, nDCG@10,
    search latency, and indexing time.

## Proposed Technology Stack

  -----------------------------------------------------------------------
  Layer                   Technology              Responsibility
  ----------------------- ----------------------- -----------------------
  Frontend                Next.js, React          User interface and
                                                  search experience

  Backend                 Java, Spring Boot       REST APIs, application
                                                  logic, uploads, and
                                                  access control

  Database                PostgreSQL              Users, document
                                                  metadata, subjects, and
                                                  permissions

  Search engine           Apache Solr             Full-text indexing,
                                                  BM25 ranking, snippets,
                                                  and similar-document
                                                  retrieval

  PDF processing          Apache Tika             Extract text and
                                                  metadata from PDFs
  -----------------------------------------------------------------------

Solr will handle information retrieval and search. PostgreSQL will store
application data and document metadata.

## How It Works

1.  An authorized user uploads an academic PDF.
2.  The backend validates the file and extracts its text and metadata.
3.  The document record and metadata are stored in PostgreSQL.
4.  Extracted text and searchable fields are indexed in Apache Solr.
5.  A student enters a query and optionally selects filters.
6.  The backend sends the search request to Solr.
7.  Solr ranks matching documents using BM25.
8.  The frontend displays relevant documents, snippets, and links to
    accessible PDFs.

### Similar-document search

A student can upload a reference PDF. CampusMind extracts its text and
uses Solr's MoreLikeThis feature to find documents with similar content
in the indexed collection.

## High-Level Architecture

``` text
Student / Admin
      |
      v
Next.js + React UI
      |
   REST API
      |
      v
Spring Boot Backend
   /          \
  v            v
PostgreSQL   PDF Processing
(metadata)   (Apache Tika)
                 |
                 v
           Extracted Text
                 |
                 v
             Apache Solr
        (indexing and retrieval)
                 |
                 v
        Ranked Search Results
                 |
                 v
           Frontend Results
```

## Initial Project Scope

The first version will focus on a working end-to-end retrieval system:

-   Upload and manage PDF documents.
-   Extract text from PDFs.
-   Index document contents in Solr.
-   Search documents using BM25.
-   Filter results using document metadata.
-   Display relevant snippets and PDF access links.
-   Find similar documents from an uploaded reference PDF.
-   Evaluate retrieval quality and performance.

The initial dataset will contain sample academic PDFs and documents the
team has permission to use. It can be expanded as development
progresses.

## Search Evaluation

-   **Precision@10:** How many of the top 10 results are relevant.
-   **Recall@10:** How many relevant documents appear within the top 10.
-   **nDCG@10:** Whether highly relevant documents appear near the top.
-   **Search latency:** How long a search request takes.
-   **Indexing time:** How long document processing and indexing take.

## Development Roadmap

1.  **Foundation:** Set up the repository, frontend, backend, database,
    and development workflow.
2.  **Search engine:** Configure Solr and create the document
    index/schema.
3.  **PDF workflow:** Implement upload, validation, text extraction,
    metadata storage, and indexing.
4.  **Search experience:** Build query search, BM25 ranking, filters,
    snippets, and PDF access.
5.  **Similarity retrieval:** Add PDF-to-PDF similarity search using
    MoreLikeThis.
6.  **Evaluation:** Prepare relevance judgments, calculate retrieval
    metrics, test performance, and refine the system.

## Team

CampusMind is being developed by a team of five. Responsibilities will
be divided across frontend development, backend APIs, search and
indexing, PDF processing and document management, and
testing/evaluation. The team will collaborate on integration and final
validation.

## Possible Future Enhancements

-   Query expansion using a curated academic topic dictionary.
-   Semantic or hybrid search.
-   Improved document recommendations.
-   Support for additional document formats.
-   More detailed search analytics.

## Getting Started

Setup instructions will be added as the frontend, backend, database, and
Solr services are implemented.

Planned repository structure:

``` text
CampusMind/
├── frontend/       # Next.js application
├── backend/        # Spring Boot REST API
├── docs/           # Project documentation
└── README.md
```

## Academic Purpose

CampusMind is an academic Information Retrieval project demonstrating
document processing, indexing, ranked retrieval, similarity search, and
systematic evaluation in a practical application.

------------------------------------------------------------------------

**CampusMind --- Find the knowledge inside your documents.**
