# Contributing to Benny's Emporium

Thank you for your interest in contributing to Benny's Emporium! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project adheres to the Contributor Covenant Code of Conduct. By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Follow the JavaScript/TypeScript styleguides
- Include appropriate test cases
- Update documentation as needed
- End all files with a newline

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `pnpm install`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make your changes
5. Run tests: `pnpm test`
6. Run type checking: `pnpm check`
7. Commit with clear messages: `git commit -m 'Add feature description'`
8. Push to your fork
9. Create a Pull Request

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - 🎨 when improving the format/structure of the code
  - 🐛 when fixing a bug
  - ✨ when adding a new feature
  - 📝 when writing docs
  - 🚀 when improving performance
  - ✅ when adding tests
  - 🔒 when dealing with security
  - ⬆️ when upgrading dependencies
  - ⬇️ when downgrading dependencies

### JavaScript/TypeScript Styleguide

- Use TypeScript for all new code
- Use 2 spaces for indentation
- Use `const` by default, `let` if reassignment is needed
- Avoid `var`
- Use meaningful variable names
- Add JSDoc comments for functions
- Keep functions small and focused
- Use async/await instead of .then() chains

### React Component Styleguide

- Use functional components with hooks
- Place component logic in custom hooks when possible
- Use TypeScript for prop types
- Keep components focused on a single responsibility
- Extract complex logic into separate files
- Use descriptive component names

### Database Schema Styleguide

- Use camelCase for column names
- Use appropriate data types (int, varchar, decimal, timestamp, etc.)
- Add constraints (notNull, unique, primaryKey, etc.)
- Include timestamps (createdAt, updatedAt) for audit trails
- Use enums for fixed sets of values
- Document complex columns with comments

## Testing

- Write tests for new features
- Ensure all tests pass: `pnpm test`
- Aim for >80% code coverage
- Use Vitest for unit tests
- Test both happy paths and error cases

## Documentation

- Update README.md if you change functionality
- Add JSDoc comments to functions
- Update API documentation if you change endpoints
- Include examples for new features

## Project Structure

```
bennys_emporium/
├── client/                 # React frontend
├── server/                 # Express backend
├── drizzle/               # Database schema
├── shared/                # Shared types
└── docs/                  # Documentation
```

## Need Help?

- Check existing documentation in `/docs`
- Review similar code in the repository
- Open a discussion on GitHub
- Contact Benjamin Amory at ligersama777@gmail.com

## Recognition

Contributors will be recognized in the project's CONTRIBUTORS.md file.

Thank you for contributing to Benny's Emporium! 🎉
