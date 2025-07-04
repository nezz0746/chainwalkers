# @repo/scripts

A utility package for creating world.json files in the Chainwalkers monorepo.

## Installation

This package is part of the monorepo and should be installed automatically when you run `pnpm install` from the root.

## Usage

### Creating World Files

Create a new world.json file:

```bash
pnpm --filter @repo/scripts create fantasy-realm
```

Create a world file in a specific location:

```bash
pnpm --filter @repo/scripts create my-world custom/path
```

This will create a world.json file with the proper structure based on the Chainwalkers world format.

## Available Scripts

- `pnpm --filter @repo/scripts create --help` - Show help information
- `pnpm --filter @repo/scripts lint` - Run ESLint
- `pnpm --filter @repo/scripts check-types` - Run TypeScript type checking

## Development

To run the script directly during development:

```bash
cd packages/scripts
pnpm tsx src/create.tsx --help
```

## Features

- ✅ Create world.json files with proper structure
- ✅ Automatic directory creation
- ✅ Timestamped world creation
- ✅ Help documentation
- 🚧 World structure will be populated based on requirements

## Dependencies

- `tsx` - For running TypeScript files directly
- `fs-extra` - Enhanced file system operations
- Standard monorepo dependencies (ESLint, TypeScript, etc.) 