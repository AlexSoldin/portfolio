---
title: Every document type wanted its own table
project: Data room document model
organization: Coolset
period: "2024"
role: Designed the model and the publishing contract
summary: The data room stores certificates, policies, reports and more, each with fields of its own. I modeled them with polymorphic inheritance so the app stays typed, and publish every document as one flat object so other services never need to know the hierarchy.
outcomes:
  - New document types ship without changes to consuming services
  - One query returns every document for a company, whatever its type
  - Downstream services read a stable, versioned contract
stack: [Python, Django, PostgreSQL, Celery]
diagram: document-model
order: 2
---

## The problem

Companies upload many kinds of evidence to the data room. Every document shares a core: the company, an owner, a status, files and a validity period. Each type then adds its own fields. A certificate has an issuer and an expiry date. A policy has a version and a scope. A report covers a period under a framework.

The first options on the table were one wide table full of nullable columns, or a table per type with the same logic copied into each. Both got worse with every new type. Meanwhile other services, like the main app and the AI assistant, needed document data too.

## What I found

There were two audiences with opposite needs. Inside the data room we wanted rich types with their own validation and behavior. Outside it, consumers wanted one predictable shape that wouldn't break when a new type appeared.

Trying to serve both with the same structure was the mistake. They needed separate representations with a clear line between them.

## What we built

- **A base document with typed children.** Shared fields live on a base `Document` model. Each type is a subclass using multi-table inheritance, and a polymorphic queryset hands back the right subclass from a single query.
- **Types that describe themselves.** Each subclass declares which of its fields are published, so the knowledge stays next to the model it belongs to.
- **A flat published object.** When a document changes, a service flattens it into one payload: the shared fields, a `document_type` discriminator and the type's own fields under `attributes`. The payload is versioned.
- **Events, not shared tables.** The payload goes out as an event. Consumers store it as their own read model, so no other service ever queries the data room's tables.

## What changed

Adding a document type is now a subclass, a migration and a list of published fields. Consumers that don't know a new type yet still show its shared fields, so nothing breaks on release day.
