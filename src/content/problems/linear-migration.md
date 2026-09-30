---
title: Feedback reached the roadmap by luck
project: Moving from Jira to Linear
organization: Coolset
period: "2025"
role: Led the migration and designed the workspace
summary: Customer insights were scattered across Slack, calls and Jira, and the roadmap couldn't show who had asked for what. I moved the company to Linear and built one path from an insight, to a roadmap project, to the customer behind it.
outcomes:
  - Every insight lands in one triage queue that product owns
  - Roadmap projects link to the team projects that deliver them
  - Each roadmap item shows the customers who asked for it
stack: [Linear, Jira, Claude, Slack]
diagram: linear-flow
order: 1
---

## The problem

Jira had grown one board per team, each with its own workflow and labels. The roadmap lived in a separate document. Feedback from sales calls, support and Slack threads went wherever the person who heard it put it, which usually meant a direct message or a ticket nobody triaged.

When we sat down to plan a quarter, the most recent request tended to win, because it was the only one anyone remembered.

## What I found

The tool wasn't the real issue. Nobody owned incoming feedback, and there was no agreed shape for it. Moving to a new tool without fixing that would only move the mess.

So the migration had two jobs: move the work across, and decide where each kind of thing lives.

## What we built

- **A PMO team that owns the roadmap.** Each roadmap item is a Linear project with a clear outcome, not a bucket of tickets.
- **Team projects that link up.** Engineering teams keep their own projects and cycles. Each one links to the roadmap project it delivers, so progress rolls up without anyone updating a status document.
- **One triage queue for insights.** Feedback from Slack, calls and support arrives in PMO triage. Each insight is tagged by product area, linked to the roadmap project it supports, and linked to the customer who raised it.
- **A first pass by Claude.** A triage routine suggests tags, roadmap links and customers. A person confirms before anything moves out of triage.
- **History that came along.** Open Jira work migrated with its comments, so nothing in flight was lost on the switch.

## What changed

Planning now starts from the roadmap view, and each item carries its evidence: how many insights point at it, and from which customers. Engineers can see why their project exists. Product can answer "who asked for this?" in one click instead of a Slack search.
