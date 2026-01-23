# CLAUDE.md (Repository-wide Rules)

## 1) Purpose

In this repository, the AI must perform **safe, reproducible changes**.
If something is uncertain, do not guess—either preserve existing behavior or ask for clarification.

## 2) Rule precedence (IMPORTANT)

Rules are applied in the following order:

1. `CLAUDE.md` in the current working directory
2. `CLAUDE.md` in parent directories
3. Root `CLAUDE.md`

If rules conflict:

- Prefer rules closer to the working directory
- Prefer more specific rules
- Otherwise, keep existing code and behavior unchanged

## 3) Standard working loop

Every task must follow this sequence:

1. Identify the goal and affected scope
2. Implement changes with minimal impact
3. Run available verification commands
4. Report what changed, how it was verified, and any risks

## 4) Change policy

- Do not refactor unless explicitly requested
- One purpose per PR
- When modifying shared code, clearly describe the impact

## 5) Verification & honesty

- Only claim verification if commands were actually executed
- If verification could not be run, explicitly state why
- Do not repeat failed attempts without first identifying the cause

## 6) Security & secrets

- Never include real tokens, keys, or credentials in code, logs, or PRs
- When adding environment variables, update `.env.example` only
- Never log personally identifiable information (PII)

## 7) CI/CD awareness

- GitHub Actions–based CI/CD is in place
- Changes that affect deployment behavior must be explicitly explained
- Any change requiring manual server intervention must be clearly stated
