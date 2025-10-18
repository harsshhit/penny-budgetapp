# AI Agent Instructions for Penny Budget App

## Project Overview
Penny is a full-stack personal budget tracking application built with Next.js 13, using App Router and TypeScript. The app features real-time financial analytics, recurring transactions, and comprehensive money management tools.

## Key Architecture Patterns

### Data Flow
- MongoDB models (`lib/models/`) define core entities (User, Transaction, Category, RecurringTransaction)
- API routes (`app/api/`) handle CRUD operations with MongoDB via Mongoose
- Client components in `components/` fetch data through custom hooks using the API routes
- State management is handled through React hooks and API calls - no global state management

### Authentication Pattern
- NextAuth.js with Google OAuth handles user authentication
- Protected routes/API endpoints use `requireAuth` middleware from `lib/auth.ts`
- User context is available through `useSession` hook from NextAuth.js

### Component Architecture
- Reusable UI components in `components/ui/` using Radix UI primitives
- Feature components in `components/` root combine UI components with business logic
- Dark theme with consistent color scheme (zinc/rose/emerald) defined in Tailwind

## Key Development Workflows

### Working with Transactions
1. Transaction schema defined in `lib/models/Transaction.ts`
2. API endpoints in `app/api/transactions/`
3. UI components: `quick-add-form.tsx`, `transaction-list.tsx`, `transaction-item.tsx`

### Recurring Transaction System
- Automated generation through `materializeRecurring` function in `app/api/transactions/route.ts`
- Supports daily/weekly/monthly/yearly frequencies
- Creates actual transactions from recurring templates on schedule

### Category Management
- Default categories defined in `lib/default-categories.ts`
- Custom categories can be created/edited through CategoryManager component
- Categories have color and icon properties used in visualizations

## Common Patterns

### Form Handling
Example from `quick-add-form.tsx`:
```typescript
const [errors, setErrors] = useState<Record<string, string>>({});
const validate = () => {
  const newErrors: Record<string, string> = {};
  if (!amount || parseFloat(amount) <= 0) {
    newErrors.amount = 'Amount must be greater than 0';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

### API Route Pattern
Example from `app/api/[entity]/route.ts`:
```typescript
export async function GET(req: Request) {
  const { userId } = await requireAuth();
  await connectToDatabase();
  // Fetch and return data...
}
```

### Component Props Pattern
Use TypeScript interfaces for props:
```typescript
interface ComponentProps {
  data: SomeType[];
  onAction: (id: string) => Promise<void>;
}
```

## Development Setup
1. Environment variables required in `.env.local`:
   - `MONGODB_URI`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
2. Development server: `npm run dev`