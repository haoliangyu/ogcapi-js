# @ogcapi-js/records — Development Specification (Core)
Version: 0.1.0-alpha
Location: `packages/records/specs/development-spec-core.md`
Author: Haoliang Yu
Repository: https://github.com/haoliangyu/ogcapi-js

---

## 1. Overview

The `@ogcapi-js/records` package is a new sub-library in the `ogcapi-js` monorepo that implements the **OGC API – Records – Part 1: Core** standard. It provides a typed, modular, and consistent JavaScript/TypeScript client for interacting with Records API servers, following the existing patterns established in `@ogcapi-js/features` and `@ogcapi-js/processes`.

This specification defines the development scope, architecture, public API, conformance mapping, and integration guidelines.

This document also serves as the foundation for GitHub Copilot Agent automation to implement the API extensions.

---

## 2. Goals & Scope

### Goals
- Implement Records API Part 1 (Core) using the same structure and patterns as other `ogcapi-js` packages.
- Provide a typed, ergonomic client for Records endpoints.
- Reuse existing shared utilities (`@ogcapi-js/shared`) for request handling, parameter encoding, errors, pagination, and filtering.
- Support all core Records query parameters.
- Provide robust TypeScript models for Records, Catalogs, Items, and Lists.
- Enable both Node.js and browser usage.
- Integrate build, test, and release workflows via existing monorepo automation.

### In Scope
- Endpoints:
  - `/`
  - `/api`
  - `/conformance`
  - `/collections`
  - `/collections/{id}`
  - `/collections/{id}/items`
  - `/collections/{id}/items/{recordId}`

- Query parameters (per OGC API – Records Part 1):
  - `bbox`
  - `datetime`
  - `q`
  - `type`
  - `ids`
  - `externalIds`
  - `filter`
  - `filter-lang`
  - `sortby`
  - `limit`
  - `offset`

- Typed models:
  - Landing page
  - Conformance
  - Catalog (Record Collection)
  - Record (Item)
  - ItemList / CollectionList
  - Link types

- Pagination (`next` links + limit/offset)

- JSON encoding (initial)

### Out of Scope (Initial Version)
- CRUD operations (Records Part 3)
- Facets or advanced filtering (Records Part 2)
- Non-JSON encodings (e.g., XML)
- Automatic crawlable catalogs with no API endpoints
- HTML rendering helpers
