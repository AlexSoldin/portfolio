---
title: A risk three suppliers away is still your risk
project: Supply chain risk assessments
organization: Coolset
period: "2025"
role: Designed the risk model and the research workflow
summary: Risk research was manual and stopped at direct suppliers. I handed the research to an n8n workflow and modeled the supply chain with upstream and downstream links, so a finding on one supplier reaches every product and company that depends on it.
outcomes:
  - Research runs for each supplier without an analyst starting it
  - Findings reach every downstream product automatically
  - Each risk score traces back to the source that raised it
stack: [n8n, Claude, Django, Celery, PostgreSQL]
diagram: risk-propagation
order: 3
---

## The problem

Due diligence rules ask companies to understand risk deep in their supply chain, not just at the suppliers they pay directly. Researching a supplier meant checking its country, its commodities, sanctions lists and the news, then writing it up in a spreadsheet.

That work was slow, so it stopped at the first tier. The suppliers most likely to carry risk were the ones nobody looked at.

## What I found

"Assess supplier risk" was really two problems. Gathering evidence is open-ended, and the sources change often. Applying that evidence to a supply chain is deterministic and has to be exact.

The first suits a workflow that someone can change without a deploy. The second belongs in the backend, with tests.

## What we built

- **Research as a workflow.** An n8n workflow runs for each supplier. It gathers sources, uses Claude to pull out structured findings and returns each finding with the source it came from.
- **Assessments in the backend.** The backend validates those findings and stores them as an assessment. The workflow never writes risk scores directly.
- **A chain with direction.** Every link in a value chain records who is upstream (who supplies you) and who is downstream (who you supply). The same supplier can sit in many chains.
- **Propagation along the links.** When an assessment changes, a task walks downstream and recalculates the risk for every product and company that depends on that supplier. Requests for more information travel the other way, upstream to the supplier.

## What changed

A finding on a farm three tiers away now shows up on the finished product that depends on it, with the source attached. Analysts spend their time reviewing findings instead of collecting them.
