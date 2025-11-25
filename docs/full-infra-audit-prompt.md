### 🔍 Codex Prompt: Full Infrastructure Audit of ClubOS Monorepo

**Objective:** Perform a full infrastructure audit of the `clubos-monorepo`. Use the layout and structure as reflected in this repo.

---

### ✅ Audit Scope

#### 1. 📦 Dependency Health
- Identify:
  - Broken, unpublished, or deprecated packages
  - Duplicated versions across packages
  - Over-pinned or under-specified ranges
  - Misclassified devDependencies used in runtime

#### 2. 🧱 Project Structure
- Validate folder structure under `/apps` and `/services`
- Look for:
  - Redundancies or overly granular packages
  - Naming inconsistencies
  - Misplaced logic (e.g., business logic in routing layers)

#### 3. ⚙️ Tooling Consistency
- Compare `tsconfig.json`, ESLint configs, Tailwind/PostCSS
- Ensure all workspaces define:
  - `dev`, `build`, `start`, and `lint` scripts
  - Matching `engines` if needed

#### 4. �� API & ORM Schema
- Review Express route layout and error handling patterns
- Analyze `schema.prisma`:
  - Redundant fields
  - Lack of relations/indexes
  - Naming conventions

#### 5. 🐳 Containerization
- Audit all `Dockerfile`s and `docker-compose.yml` for:
  - Layer optimization
  - Port and volume security
  - .env coverage and example env completeness

#### 6. 🔁 CI/CD Readiness
- Check for test, lint, and build automation readiness
- Identify missing components for GitHub Actions / testing pipelines

#### 7. 🔐 Security Hygiene
- Detect:
  - Hardcoded secrets
  - Exposed local ports
  - Sensitive files committed or not `.gitignore`d

---

### 🧪 Output Format

For each section, use:

```md
## Section: [e.g. Docker]

- ✅ docker-compose.yml uses named volumes
- ❌ Missing `.env` validation on image boot
- ⚠️ Multiple Dockerfiles use root user — switch to node user where possible
