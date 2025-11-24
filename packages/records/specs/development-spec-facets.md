Version: 0.1.0-alpha (Facets)
Location: packages/records/specs/development-spec-facets.md
Author: Haoliang Yu
Repository: https://github.com/haoliangyu/ogcapi-js

Based on standard: OGC API – Records – Part 2: Facets (25-013)

docs.ogc.org

1. Overview

The @ogcapi-js/records package currently implements the core functionality defined in OGC API – Records – Part 1: Core. This specification adds support for the Facets extension defined in Part 2 (25-013). Facets provide aggregation/summary capabilities (term, histogram, filter facets) on top of search results, allowing clients to refine catalog queries.

This new extension will enable users of the library to:

Query facet definitions for a collection (which properties support facets)

Issue search requests with facets query parameter(s)

Parse facet-aware responses (including facets object in response)

Provide typed interfaces for facet definitions and buckets

Include unit tests covering param encoding, response parsing, facet logic

The extension should reuse the existing base code (HTTP client, query parameter builder, pagination logic) in the monorepo, and integrate seamlessly with the existing records module.

2. Goals & Scope
   Goals

Extend the core RecordsService client with facet-specific support.

Provide typed models for facet definitions and facet responses.

Support the conformance classes: Simple Facets and Advanced Facets (per spec)
docs.ogc.org

Encode and validate the facets query parameter (per spec grammar)
docs.ogc.org

Parse responses that include a facets object (including term/histogram/filter buckets)

Write unit tests covering:

Parameter encoding of facets

Response parsing of facets

Error conditions (malformed facet parameter, unexpected bucket types)

Maintain compatibility with Node.js and browser usage.

In Scope

Supporting Simple Facets (advertising facet definitions, retrieving facets for collections)

Supporting Advanced Facets (the facets query parameter syntax, response filtering)

Endpoint enhancements:

/collections/{id}/facets (if advertised)

/collections/{id}/items?facets=…

Typed data models:

Facet definition object (type, property, sortedBy, minOccurs, bucketType, filters)

Facet bucket result object (value/count or min/max/count)

Facet response wrapper (facets property)

Out of Scope (Initial Release)

UI/UX components or visualization of facets

Full server-side implementation of facets (library remains client-only)

Non-JSON encodings of facets responses

Automatic fallback behaviors for collections not supporting facets (minimal handling only)
