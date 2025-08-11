# Stripe Paywall with Trial System

A full-stack application implementing a Stripe paywall with a 1-week trial system. Users pay a reduced price for the first week, then automatically transition to the regular subscription price.

## 🏗️ Project Structure

```
stripe-paywall/
├── backend/          # NestJS API
├── frontend/         # React + Vite frontend
└── README.md        # This file
```

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ installed
- Stripe account (sandbox/test mode)
- Git

### 1. Clone and Setup Backend

```bash
cd backend
npm install
```

Create your environment file:
```bash
# Create .env file manually or copy from the template below
touch .env
```

Copy the backend environment template (see section 4 below) into your `.env` file.

### 2. Setup Frontend

```bash
cd frontend
npm install
```

Create your environment file:
```bash
# Create .env file manually or copy from the template below
touch .env
```

Copy the frontend environment template (see section 4 below) into your `.env` file.

### 3. Start Development Servers

**Backend (NestJS):**
```bash
cd backend
npm run start:dev
```
Server runs on `http://localhost:3000`

**Frontend (React + Vite):**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## 🧪 How to Test the Stripe Flow

### 1. Create Stripe Sandbox Account

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test Mode** (toggle in top-right)
3. Note down your **Publishable Key** and **Secret Key** from the API keys section

### 2. Create Products and Prices

You need to create **3 products**, each with **2 prices** (monthly + weekly trial):

#### Product 1: Starter
- **Product Name**: "Starter"
- **Prices**:
  - Monthly: `$9.99/month` (regular price)
  - Weekly: `$1.99/week` (trial price)

#### Product 2: Pro
- **Product Name**: "Pro"  
- **Prices**:
  - Monthly: `$19.99/month` (regular price)
  - Weekly: `$3.99/week` (trial price)

#### Product 3: Ultimate
- **Product Name**: "Ultimate"
- **Prices**:
  - Monthly: `$29.99/month` (regular price)
  - Weekly: `$5.99/week` (trial price)

### 3. Configure Plan IDs

1. Copy the **Price IDs** from Stripe Dashboard
2. Update `backend/src/checkout/plans.json`:

```json
{
  "plans": [
    {
      "id": "prod_SqPj4EtNDbsMca",
      "name": "Starter",
      "price_text": "$9.99 / month",
      "price_text_trial": "Start for just $1.99 - 7 days access, then $9.99 / month",
      "trial_period_days": 7,
      "price_id": "price_1RuiuFGTBncxZ1SrAzhqlfh1",
      "trial_price_id": "price_1RuiuoGTBncxZ1SrJSIzPNJR",
      "interval": "month",
      "trial_interval": "week"
    }
    // ... repeat for other plans
  ]
}
```

### 4. Set Environment Variables

**Backend `.env` (create from `.env.example`):**
```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Application Configuration
NODE_ENV=development
PORT=3000
```

**Frontend `.env` (create from `.env.example`):**
```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# API Configuration
VITE_API_URL=http://localhost:3000
```

### 5. Test the Flow

1. Start both servers
2. Go to `http://localhost:5173`
3. Select a plan
4. Use Stripe test cards:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - Use any future date for expiry, any 3 digits for CVC

## 🏛️ Architecture Notes

### Backend Architecture

The backend follows **Clean Architecture principles**:

- **Controllers**: Handle HTTP requests and responses
- **Use Cases**: Contain business logic, isolated from external concerns
- **Infrastructure Layer**: External services (Stripe API, databases)
- **Dependency Injection**: Using NestJS's built-in DI container

```
src/
├── checkout/
│   ├── checkout.controller.ts     # HTTP endpoints
│   ├── use-case/                  # Business logic
│   │   ├── create-payment-intent.use-case.ts
│   │   └── create-subscription-schedule.use-case.ts
│   ├── infra/                     # External services
│   │   └── stripe.service.ts      # Stripe API wrapper
│   └── plans.json                 # Plan configuration
```

### Frontend Architecture

- **Tanstack Router**: File-based routing for easy navigation
- **React Hook Form**: Form state management and validation
- **Stripe PaymentElement**: Secure payment data handling
- **Tailwind CSS**: Utility-first styling
- **React Hot Toast**: User notifications
- **Axios**: HTTP client for API requests

### Current API Endpoints

The backend exposes these endpoints:

1. **`GET /checkout/plans`** - Retrieve available subscription plans
2. **`POST /checkout/payment-intent`** - Create customer and setup intent for payment method
3. **`POST /checkout/create-subscription-schedule`** - Create subscription with trial period

### Trial Flow Implementation

The current implementation uses a **two-step process**:

1. **Setup Payment Method**: 
   - Create/find Stripe customer
   - Create SetupIntent for secure payment method collection
   - Frontend uses Stripe PaymentElement to collect payment details

2. **Create Subscription Schedule**: 
   - Attach payment method to customer
   - Create SubscriptionSchedule with two phases:
     - **Phase 1**: Trial period (1 week) with reduced price
     - **Phase 2**: Regular subscription with normal price
   - Automatic transition between phases

### Key Decisions & Trade-offs

#### ✅ Good Decisions

1. **Clean Architecture**: Separates business logic from infrastructure
2. **Stripe PaymentElement**: Keeps payment data secure and PCI compliant
3. **Stripe Subscription Schedules**: 
   - Robust way to handle trial-to-paid transitions
   - Automatic billing transitions
   - Built-in retry logic for failed payments
4. **SetupIntent Pattern**: Securely collect payment methods before subscription
5. **TypeScript**: Type safety throughout the application

#### ⚠️ Trade-offs & Limitations

1. **Plans in JSON File**: 
   - **Current**: Plans stored in `plans.json`
   - **Issue**: Data can become outdated vs Stripe dashboard
   - **Better Solution**: Fetch plans directly from Stripe API in production

2. **No Database**: 
   - **Current**: Relying on Stripe as source of truth
   - **Limitation**: No custom user data or analytics
   - **Future**: Add database for user profiles and analytics

3. **No Webhook Handling**:
   - **Current**: Basic subscription schedule creation
   - **Missing**: Webhook endpoints for subscription updates
   - **Impact**: Limited ability to handle edge cases

#### 🔄 Recommended Improvements

1. **Replace JSON with Stripe API**:
   ```typescript
   // Instead of importing plans.json
   const plans = await stripe.prices.list({ active: true });
   ```

2. **Add Database Layer**:
   - User profiles
   - Subscription status tracking
   - Analytics and metrics

3. **Add Webhook Endpoints**:
   - Handle subscription updates
   - Process payment failures
   - Manage cancellations

4. **Error Handling**:
   - Better error boundaries
   - Retry mechanisms
   - User-friendly error messages

5. **Testing**:
   - Unit tests for use cases
   - Integration tests for Stripe flow
   - E2E tests for complete user journey

## 🔒 Security Considerations

- ✅ Stripe handles sensitive payment data
- ✅ API keys properly configured in environment variables
- ✅ HTTPS required in production
- ⚠️ Add rate limiting for production
- ⚠️ Add request validation and sanitization
- ⚠️ Implement proper error handling without exposing internals


## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [NestJS Documentation](https://nestjs.com/)
- [Vite Documentation](https://vite.dev/)
- [Tanstack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com/) 