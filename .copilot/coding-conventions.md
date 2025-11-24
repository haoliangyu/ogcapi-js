# Coding Conventions for ogcapi-js

## Language & Syntax

- All code must be TypeScript.
- Prefer named exports over default exports.
- Use dash-case for file names
- Use async/await — no raw Promises.

## File Structure

- Place all public classes in `src/`.
- Internal helpers go in `src/utils/`.

## Project Style

- Follow existing patterns from @ogcapi-js/features and @ogcapi-js/processes.
- Use shared utilities from `@ogcapi-js/shared` whenever possible.

## Documentation

- Every public method requires a JSDoc block.
- Type interfaces must have at least one sentence of description.

## Tests

- Use Vitest/Jest (match monorepo).
- Every new module must include:
  - unit tests
- Unit test file structure should be same or similar to `src/` in order for `test-to-source` match.
