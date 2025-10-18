# Penny - Personal Budget Tracker Application

## Project Overview
Penny is a modern, full-stack personal budget tracking application designed to help users take control of their finances through real-time analytics, automated recurring transactions, and comprehensive financial management tools. The app features a beautiful dark-themed UI with purple/violet accents and provides an intuitive user experience for tracking income, expenses, and financial trends.

## Core Features

### 1. Live Dashboard & Analytics
- **Real-time Financial Overview**: Displays current month income vs expenses with visual balance indicator
- **Interactive Charts**: 
  - Pie charts showing spending breakdown by category (both income and expenses)
  - Line charts displaying monthly spending trends over time
  - Category-wise expense visualization with color-coded segments
- **Monthly Statistics**: Shows percentage changes from previous month for income, expenses, and transaction count
- **Smart Metrics**: Total balance calculation, transaction count tracking, and trend analysis

### 2. Transaction Management System
- **Quick Transaction Entry**: Streamlined form for adding income/expense transactions with smart defaults
- **Comprehensive Transaction History**: Date-based grouping of all transactions with detailed information
- **Transaction Types**: Support for both income and expense transactions with proper categorization
- **Receipt Attachment**: File upload capability for receipts (images and PDFs) with placeholder URL generation
- **Transaction Editing**: Full CRUD operations for modifying existing transactions
- **Date Management**: Calendar picker for transaction dates with validation

### 3. Automated Recurring Transactions
- **Flexible Scheduling**: Support for daily, weekly, monthly, and yearly recurring transactions
- **Smart Auto-Generation**: Automatic creation of actual transactions from recurring templates on schedule
- **Recurring Management**: Complete CRUD operations for managing recurring income and expenses
- **Active/Inactive Status**: Ability to pause or activate recurring transactions
- **Next Due Date Tracking**: Automatic calculation and update of next due dates based on frequency

### 4. Category Management System
- **Pre-configured Categories**: Default categories for common income and expense types
- **Custom Category Creation**: Users can create personalized categories with custom colors and icons
- **Category Editing**: Full modification capabilities for existing categories
- **Visual Integration**: Categories are color-coded and used throughout charts and visualizations
- **Icon Support**: Lucide React icons for each category type

### 5. User Authentication & Security
- **Google OAuth Integration**: Secure sign-in using Google authentication
- **User Data Isolation**: Complete separation of user data with proper authentication middleware
- **Session Management**: NextAuth.js handles user sessions and authentication state
- **Protected Routes**: All API endpoints and user data are protected with authentication checks

### 6. Modern UI/UX Design
- **Dark Theme**: Royal black background with golden/purple accents
- **Responsive Design**: Optimized for all device sizes with mobile-first approach
- **Smooth Animations**: Transitions and hover effects throughout the interface
- **Floating Action Button**: Quick access floating button for adding transactions
- **Tab-based Navigation**: Intuitive navigation between different sections
- **Glass Morphism**: Subtle backdrop blur effects and translucent elements

## Technical Architecture

### Frontend Stack
- **Next.js 13**: App Router with TypeScript for modern React development
- **React 18**: Latest React features with hooks-based state management
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Radix UI**: Accessible component primitives for consistent UI
- **Recharts**: Data visualization library for interactive charts
- **React Hook Form**: Form handling with Zod validation
- **Lucide React**: Modern icon library
- **Sonner**: Toast notification system

### Backend & Database
- **MongoDB**: NoSQL database with Mongoose ODM for data persistence
- **NextAuth.js**: Authentication library with Google OAuth provider
- **API Routes**: Next.js API routes for backend functionality
- **Mongoose Models**: Structured data models for User, Transaction, Category, and RecurringTransaction

### Data Models

#### User Model
- Unique email address with Google OAuth integration
- User profile information (name, image)
- Timestamps for account creation and updates

#### Transaction Model
- User association and amount tracking
- Transaction type (income/expense)
- Category assignment and date
- Optional description and receipt URL
- Proper indexing for performance

#### Category Model
- User-specific categories with default system categories
- Color and icon customization
- Type classification (income/expense)
- Unique naming within user scope

#### RecurringTransaction Model
- Template for automatic transaction generation
- Frequency settings (daily/weekly/monthly/yearly)
- Next due date calculation and tracking
- Active/inactive status management

## Default Categories

### Income Categories
- Salary (Briefcase icon, Green color)
- Freelance (Code icon, Emerald color)
- Investments (TrendingUp icon, Light green color)
- Other Income (DollarSign icon, Light emerald color)

### Expense Categories
- Food (Utensils icon, Red color)
- Transportation (Car icon, Orange color)
- Housing (Home icon, Purple color)
- Utilities (Zap icon, Blue color)
- Health (Heart icon, Pink color)
- Entertainment (Film icon, Amber color)
- Shopping (ShoppingBag icon, Teal color)
- Education (GraduationCap icon, Cyan color)
- Others (MoreHorizontal icon, Gray color)

## Key Functionalities

### Dashboard Analytics
- Real-time balance calculation from all transactions
- Monthly trend analysis with percentage changes
- Category-wise spending breakdown with pie charts
- Income vs expense comparison charts
- Transaction count tracking and statistics

### Transaction Workflow
1. User clicks floating add button
2. Quick add form opens with smart defaults
3. Form validation ensures data integrity
4. Optional receipt upload with file handling
5. Transaction saved to database with user association
6. Real-time UI updates across all components

### Recurring Transaction System
1. User creates recurring transaction template
2. System tracks next due date based on frequency
3. Automatic materialization when due date arrives
4. Actual transaction created from template
5. Next due date updated based on frequency rules
6. Support for catching up on missed recurring transactions

### Category Management
1. Default categories initialized on first user login
2. Users can create custom categories with colors and icons
3. Categories used throughout app for organization and visualization
4. Category editing and deletion with proper validation
5. Visual consistency maintained across all UI components

## UI/UX Design Principles

### Visual Design
- **Color Scheme**: Dark theme with zinc/black backgrounds and violet/purple accents
- **Typography**: Clean, modern fonts with proper hierarchy
- **Spacing**: Generous whitespace and padding for better readability
- **Shadows**: Soft shadows and subtle depth effects
- **Borders**: Rounded corners with consistent border styling

### Interaction Design
- **Hover Effects**: Smooth transitions on interactive elements
- **Button States**: Clear visual feedback for different button states
- **Form Validation**: Real-time validation with helpful error messages
- **Loading States**: Proper loading indicators for async operations
- **Responsive Layout**: Mobile-first design with breakpoint optimization

### Accessibility
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Color Contrast**: High contrast ratios for readability
- **Focus Management**: Clear focus indicators and logical tab order

## Development Patterns

### State Management
- React hooks for local component state
- API calls for data fetching and mutations
- No global state management (Redux/Context) - keeps architecture simple
- Real-time updates through component re-rendering

### Data Flow
1. MongoDB models define data structure
2. API routes handle CRUD operations
3. Client components fetch data through API calls
4. UI updates automatically reflect data changes
5. Form submissions trigger API calls and UI updates

### Error Handling
- Form validation with user-friendly error messages
- API error handling with toast notifications
- Graceful fallbacks for missing data
- Proper loading states for better UX

### Performance Optimizations
- Database indexing for efficient queries
- Component memoization where appropriate
- Lazy loading for large datasets
- Optimized re-renders through proper dependency arrays

## Environment Setup Requirements

### Required Environment Variables
- MONGODB_URI: MongoDB connection string
- NEXTAUTH_URL: Application URL for authentication
- NEXTAUTH_SECRET: Secret key for NextAuth.js
- GOOGLE_CLIENT_ID: Google OAuth client ID
- GOOGLE_CLIENT_SECRET: Google OAuth client secret

### Development Dependencies
- Node.js with npm package manager
- MongoDB database instance
- Google OAuth application setup
- Modern browser with JavaScript enabled

## Deployment Considerations

### Production Requirements
- MongoDB Atlas or self-hosted MongoDB
- Vercel, Netlify, or similar hosting platform
- Environment variables properly configured
- Google OAuth credentials for production domain
- SSL certificate for secure authentication

### Scalability Features
- User-specific data isolation
- Efficient database indexing
- Stateless authentication with JWT
- API route optimization for performance
- Component-based architecture for maintainability

This application represents a complete, production-ready budget tracking solution with modern web technologies, comprehensive features, and excellent user experience design.
