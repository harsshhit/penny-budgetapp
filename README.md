# Penny - Personal Budget Tracker

A modern, full-stack budget tracking application built with Next.js, featuring real-time analytics, recurring transactions, and comprehensive financial management tools.

## 🚀 Features

### 📊 **Live Dashboard**
- Real-time financial overview with current month income vs expenses
- Interactive charts showing spending trends and category breakdowns
- Monthly statistics with percentage changes from previous month
- Visual analytics with pie charts and trend graphs

### 💰 **Transaction Management**
- Quick transaction entry with smart defaults and validation
- Full transaction history with date-based grouping
- Support for both income and expense transactions
- Receipt attachment capability for record-keeping
- Transaction editing and deletion

### 🔄 **Recurring Transactions**
- Automated recurring transaction setup (daily, weekly, monthly, yearly)
- Smart auto-generation of recurring transactions on schedule
- Easy management of recurring income and expenses
- Flexible scheduling options

### 📁 **Category Management**
- Pre-configured default categories for common income/expense types
- Custom category creation with personalized colors and icons
- Category editing and deletion capabilities
- Visual category breakdown in analytics

### 🔐 **Authentication & Security**
- Google OAuth integration for secure sign-in
- User-specific data isolation
- Session management with NextAuth.js
- Protected routes and API endpoints

### 📈 **Analytics & Reporting**
- Monthly spending trends visualization
- Category-wise expense breakdown
- Income vs expense comparisons
- Transaction count tracking
- Percentage change calculations from previous periods

### 🎨 **Modern UI/UX**
- Dark theme with royal black and golden accents
- Responsive design for all device sizes
- Smooth animations and transitions
- Intuitive tab-based navigation
- Modern component library with Radix UI

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: MongoDB with Mongoose ODM
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner toast notifications

## 📦 Default Categories

### Income Categories
- Salary
- Freelance
- Investments
- Other Income

### Expense Categories
- Food
- Transportation
- Housing
- Utilities
- Health
- Entertainment
- Shopping
- Education

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd penny-budgetapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 App Structure

- **Dashboard**: Overview of financial health with key metrics
- **Transactions**: Complete transaction history and management
- **Recurring**: Automated recurring transaction setup
- **Categories**: Custom category management
- **Settings**: User preferences and configuration

## 🔧 Development

- **Type checking**: `npm run typecheck`
- **Linting**: `npm run lint`
- **Build**: `npm run build`
- **Start production**: `npm start`

## 📄 License

This project is private and proprietary.
