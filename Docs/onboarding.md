# React + Vite — Developer Onboarding

A quick-start guide to get you up and running with a React + Vite project.

---

## 1. Required Tools

| Tool | Version | Description | Link |
|------|---------|-------------|------|
| **Node.js** | v18+ (LTS recommended) | JavaScript runtime | [nodejs.org](https://nodejs.org) |
| **npm** | Latest | Package manager | Installed with node.js |
| **Git** | Latest | Version control | [git-scm.com](https://git-scm.com) |
| **VS Code** | Latest | Code editor | [code.visualstudio.com](https://code.visualstudio.com) |

### Recommended VS Code Extensions

- **ESLint** — `dbaeumer.vscode-eslint`
- **Prettier** — `esbenp.prettier-vscode`
- **Tailwind CSS IntelliSense** — `bradlc.vscode-tailwindcss`
- **Auto Import** — `steoates.autoimport`
- **GitLens** — `eamodio.gitlens`

---

## 2. Project Setup

### Clone the repository

```bash
git clone https://github.com/Az107/gym-routine-tracker.git
cd gym-routine-tracker
```

### Install dependencies

```bash
# Using npm
npm install
```
---

## 3. Environment Variables

Copy the example env file and fill in the required values:

```bash
cp .env.example .env
```

> Variables must be prefixed with `VITE_` to be accessible in the client.
> Example: `VITE_API_URL=https://api.example.com`

---

## 4. Start Developing

```bash
# Start the dev server (hot reload enabled)
npm run dev
```

The app will be available at **http://localhost:5000** by default.

### Other useful commands

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview

# Run linter
npm run lint

# Run tests (if configured)
npm run test
```

---

## 5. Project Structure

```
├── public/             # Static assets (favicon, robots.txt, etc.)
├── src/
│   ├── assets/         # Images, fonts, and other assets
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components / routes
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API calls and external services
│   ├── store/          # Global state (Zustand, Redux, etc.)
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── .env.example        # Environment variable template
├── index.html          # HTML entry point (Vite)
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

---

## 6. Key Technologies & Docs

| Technology | Purpose | Docs |
|------------|---------|------|
| **React 18** | UI library | [react.dev](https://react.dev) |
| **Vite** | Build tool & dev server | [vitejs.dev](https://vitejs.dev) |
| **TypeScript** | Type safety | [typescriptlang.org](https://www.typescriptlang.org) |
| **React Router** | Client-side routing | [reactrouter.com](https://reactrouter.com) |
| **Tailwind CSS** | Utility-first styling | [tailwindcss.com](https://tailwindcss.com) |
| **ESLint** | Code linting | [eslint.org](https://eslint.org) |
| **Prettier** | Code formatting | [prettier.io](https://prettier.io) |

---

## 7. Git Workflow

```bash
# Create a new feature branch
git checkout -b feature/your-feature-name

# Stage and commit your changes
git add .
git commit -m "feat: add your feature description"

# Push and open a Pull Request
git push origin feature/your-feature-name
```

We follow **Conventional Commits** for commit messages:
- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — maintenance tasks
- `docs:` — documentation changes
- `refactor:` — code refactoring

---

## 8. Useful Resources

- [Vite Guide](https://vitejs.dev/guide/)
- [React Official Docs](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Conventional Commits Spec](https://www.conventionalcommits.org/)

---

> **Need help?** Reach out to the team on Slack or open a GitHub issue. Happy coding! 🚀
