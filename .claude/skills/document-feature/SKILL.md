---
name: document-feature
description: Generate detailed documentation for a feature or part of the codebase. Use when asked to document, describe, or explain a feature's design choices, technology usage, and implementation methods. Invoke with /document-feature <feature-name-or-path>.
allowed-tools: Read, Grep, Glob, Write, Task
---

# Document feature

Generate comprehensive documentation about design choices, technology usage, and implementation methods for a specific feature or part of the codebase.

## Usage

```
/document-feature <feature-name-or-path>
```

**Examples:**
- `/document-feature contact-form` - Document the contact form feature
- `/document-feature src/components/features/home` - Document home page components
- `/document-feature GenerativeArt` - Document the GenerativeArt component
- `/document-feature animations` - Document animation patterns used

## Instructions

When invoked, follow these steps:

### 1. Identify the feature scope

Parse the argument to determine what to document:
- If a file path is provided, focus on that specific file/directory
- If a feature name is provided, search the codebase to find related files
- Use Glob and Grep to find all related files (components, hooks, utilities, styles, types)

### 2. Analyze the feature thoroughly

For each relevant file, examine and document:

**Design choices:**
- Component architecture (composition patterns, prop design)
- State management approach
- Data flow patterns
- Error handling strategies
- Separation of concerns

**Technology usage:**
- Frameworks and libraries used (React, GSAP, Drizzle, etc.)
- Why specific technologies were chosen for this feature
- Integration patterns with the broader codebase

**Implementation methods:**
- Key algorithms or logic patterns
- Performance optimizations
- Accessibility considerations
- Responsive design approach
- Animation techniques (if applicable)

**Code patterns:**
- Custom hooks and their purposes
- Type definitions and interfaces
- Validation schemas
- API integrations

### 3. Generate the documentation

Create a markdown file following the style of existing docs in `docs/`. Use this structure:

```markdown
# [Feature Name]

Brief overview paragraph explaining what this feature does and its role in the application.

## File structure

```
src/
├── components/feature/    # Feature components
│   ├── Component.tsx      # Description
│   └── SubComponent.tsx   # Description
├── hooks/                 # Related hooks
│   └── useFeature.ts
└── ...
```

## How it works

### [Subsection 1]

Explanation of the core mechanism with code examples:

```tsx
// Example code with file path reference
export function ExampleComponent() {
  // Implementation details
}
```

### [Subsection 2]

Continue explaining key aspects...

## Design choices

### [Choice 1 Title]
Explain the design decision, why it was made, and alternatives considered.

### [Choice 2 Title]
...

## Technology usage

| Technology | Purpose | Why chosen |
|------------|---------|------------|
| ... | ... | ... |

## Key patterns

Document reusable patterns found in this feature with code examples.

## Best practices

List any guidelines or patterns developers should follow when working with this feature.
```

### 4. Save the documentation

- Generate a kebab-case filename from the feature name (e.g., `contact-form.md`, `generative-art.md`)
- Save to `docs/` directory at the project root
- If a docs file already exists for this feature, update it rather than create a duplicate

### 5. Report completion

After saving, summarize:
- What was documented
- Key design insights discovered
- File location of the generated documentation

## Quality guidelines

- Use **sentence case** for all headings and text (per project conventions)
- Include specific file paths and line numbers for code references
- Be descriptive but concise - aim for thorough coverage without unnecessary verbosity
- Focus on the "why" behind decisions, not just the "what"
- Highlight any clever or non-obvious implementation details
- Note any potential improvements or technical debt discovered
