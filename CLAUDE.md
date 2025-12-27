# Kameleon Dashboard

Next.js 14 authenticated dashboard for Kameleon PRD Assistant.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | Radix UI |
| State | TanStack Query |
| Auth | AWS Amplify + Cognito |
| i18n | next-intl |

## Project Structure

```
kameleon-dashboard/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Auth pages (login, register)
│   │   ├── (dashboard)/         # Protected dashboard pages
│   │   │   ├── documents/       # Document management
│   │   │   ├── personas/        # Persona management
│   │   │   ├── templates/       # Template management
│   │   │   ├── axioms/          # Axiom management
│   │   │   └── settings/        # User settings
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   └── ui/                  # Reusable UI components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities
│   ├── locales/                 # i18n translations
│   │   ├── en/
│   │   └── es/
│   └── providers/               # React context providers
└── public/                      # Static assets
```

## Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://dev.api.kameleon.com
NEXT_PUBLIC_COGNITO_USER_POOL_ID=us-east-1_XXXXXX
NEXT_PUBLIC_COGNITO_CLIENT_ID=XXXXXXXXXX
NEXT_PUBLIC_AWS_REGION=us-east-1
```

## Routes

| Route | Description |
|-------|-------------|
| /dashboard | Home dashboard |
| /dashboard/documents | Document list |
| /dashboard/documents/new | Create document |
| /dashboard/documents/[id] | Document editor |
| /dashboard/personas | Persona list |
| /dashboard/personas/[id] | Persona editor |
| /dashboard/templates | Template list |
| /dashboard/axioms | Axiom list |
| /dashboard/settings | User settings |

## i18n

Translations in `src/locales/{locale}/*.json`.

```typescript
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('documents');
  return <h1>{t('title')}</h1>;
}
```
