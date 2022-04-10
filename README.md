# Precise re-rendering control in React, Vue and Svelte

Comparing re-rendering between:

 * React/useState (with and without memo() wrapper)
 * React/MobX
 * Vue
 * Svelte

and between different update levels (if available):
 * VALUE
 * ITEM
 * ARRAY
 * STATE

# Installation

The project uses [Lerna](https://lerna.js.org/) to re-use modules from `pakages/common`. Before you start you need to
install all packages:

```
npm ci && npm run lerna-bootstrap
```

# Dev Mode

Use this mode to play around with  `UPDATE_LEVEL` or `BOARD_SIZE` from `packages/common/index.ts`

```
npm run start-dev
```

Script above will open React and Vue dev servers.

# Prod Mode

Use this mode to benchmark production builds.

Run http servers once… 
```
npm run serve-built
```

… then you may build many times all packages by:
```
npm run build
```

