### Audit Findings & Fixes

**1. Invalid Type Definitions:**
- `package.json` (line 17) and `apps/api-server/package.json` (line 19) both referenced the unpublished `@types/express@^4.18.0`.
- ✅ Fixed: Updated both to `@types/express@^4.17.17`, which is published and compatible with Express 4.

**2. Incompatible Pino Typings:**
- `apps/api-server/package.json` (line 21) pinned `@types/pino` to `^8.3.8`, which targets Express 5 typings (still unstable).
- ✅ Fixed: Downgraded to `@types/pino@^7.0.0`, compatible with `pino@8`.

**3. Full Workspace Audit Results:**
- ✅ All other `package.json` files under `apps/*` and `services/*` were checked.
- No other invalid or duplicate versions found.
- All `import`ed modules (e.g., `express`, `cors`, `pino`, `axios`, `node-cron`, `react`, `next`) are correctly declared.

**4. Install Verification:**
- Could not run `npm install --prefer-offline --legacy-peer-deps` in this environment.
- ⚠️ Please run locally to refresh your `node_modules` and regenerate lockfiles.
