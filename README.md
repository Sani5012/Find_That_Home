# Find That Home - Real Estate Platform

A modern, fully-functional real estate platform built with React + Vite and Supabase backend. This platform enables users to search, list, and make offers on rental and purchase properties with role-based access control.

## Features

### 🔐 Authentication & User Roles
- **Tenant**: Browse rental listings, make rental offers, track offers
- **Buyer**: Browse properties for sale, make purchase offers, track applications
- **Landlord**: List rental properties, manage tenant offers, track transactions
- **Agent**: List both rental and sale properties, manage token system, handle multiple listings
- **Admin**: Manage all users, oversee transactions, control token pricing and platform settings

### 🏠 Property Management
- **List Properties**: Agents and landlords can list properties with detailed information
- **Search & Filter**: Advanced search with filters for location, price, type, amenities
- **Property Details**: View property details with images, amenities, ratings
- **Location-based**: Store GPS coordinates for proximity-based features
- **QR Codes**: Each property has a QR code for easy sharing and mobile access

### 💰 Offer System
- **Make Offers**: Tenants and buyers can submit offers on properties
- **Manage Offers**: Landlords and agents can accept/reject offers
- **Legal Process**: Track offers through the legal engagement process
- **Offer History**: Users can track all their offers and their status

### 🎫 Token System
- **Agent Tokens**: Agents purchase tokens to list properties and access premium features
- **Token Management**: Track token usage and purchase history
- **Admin Control**: Set token prices and listing duration
- **Transaction History**: Complete audit trail of all token purchases and usage

### 🗺️ Location Features
- **GPS Coordinates**: Store exact location of properties
- **Location Alerts**: Users can set up alerts for properties near them
- **Proximity Search**: Find properties within a specific radius
- **Visual Map Display**: Show property location with ratings

### 📊 Dashboards
- **Tenant/Buyer Dashboard**: View offers, profile, and saved searches
- **Agent Dashboard**: Manage listings, tokens, and transaction history
- **Landlord Dashboard**: Manage rental properties and tenant offers
- **Admin Dashboard**: Platform statistics, user management, settings

## Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Supabase (PostgreSQL + Auth)
- **Styling**: CSS3 with custom design system
- **Icons**: React Icons
- **QR Code**: qrcode.react
- **Routing**: React Router v6
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js 16+ and npm
- Supabase account (free at https://supabase.com)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Find_That_Home
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Create a new project at https://app.supabase.com
   - Go to SQL Editor and run all commands from `DATABASE_SETUP.sql`
   - Get your API credentials from Project Settings > API

4. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-key
```

5. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.jsx   # Navigation bar
│   ├── PropertyCard.jsx # Property listing card
│   └── *.css           # Component styles
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── SearchPage.jsx
│   ├── PropertyDetailPage.jsx
│   ├── ListPropertyPage.jsx
│   ├── TenantDashboard.jsx
│   ├── BuyerDashboard.jsx
│   ├── AgentDashboard.jsx
│   ├── LandlordDashboard.jsx
│   └── AdminPanel.jsx
├── services/           # API services
│   ├── supabaseClient.js
│   ├── authService.js
│   ├── propertyService.js
│   ├── offerService.js
│   ├── tokenService.js
│   └── alertService.js
├── context/            # React context
│   └── AuthContext.jsx
├── styles/             # Global and page styles
│   ├── global.css
│   ├── auth.css
│   ├── search.css
│   ├── property-detail.css
│   └── dashboard.css
├── App.jsx             # Main app component with routing
└── main.jsx            # Entry point
```

## User Flows

### Tenant/Buyer Flow
1. Sign up as Tenant/Buyer
2. Browse properties using search and filters
3. Click on property to view details
4. Make an offer with amount and optional message
5. Track offers in dashboard
6. View offer status updates

### Agent/Landlord Flow
1. Sign up as Agent/Landlord
2. Create property listings with details and images
3. View offers on their properties
4. Accept or reject offers
5. Track tenant/buyer information
6. (Agents) Purchase tokens for premium features
7. View transaction history

### Admin Flow
1. Login as admin
2. View platform statistics (total properties, revenue, users)
3. Manage token pricing and settings
4. View all property listings
5. Monitor platform activity

## Database Schema

### users
- id, email, user_type, full_name, phone, address, tokens, budget info
- Stores user profile and account information

### properties
- id, title, location, latitude, longitude, price, type, listing_type
- Stores all property listings

### offers
- id, property_id, made_by, offer_amount, status, message
- Stores all rental and purchase offers

### transactions
- id, user_id, type, amount, tokens, status
- Audit trail for token purchases and usage

### location_alerts
- id, user_id, latitude, longitude, radius, preferences
- Stores user location alert preferences

### token_settings
- price_per_token, listing_duration_days
- System-wide settings managed by admin

## API Services

### authService
- `signUp()` - Create new user account
- `signIn()` - Login user
- `signOut()` - Logout user
- `getCurrentUser()` - Get authenticated user
- `getUserProfile()` - Get user details
- `updateUserProfile()` - Update user information

### propertyService
- `createProperty()` - List new property
- `getProperties()` - Search with filters
- `getPropertyById()` - Get property details
- `getPropertiesByUser()` - Get user's listings
- `updateProperty()` - Update property
- `deleteProperty()` - Remove listing
- `searchPropertiesByLocation()` - Proximity search

### offerService
- `createOffer()` - Submit offer
- `getPropertyOffers()` - Get offers on property
- `getUserOffers()` - Get user's offers
- `acceptOffer()` - Accept offer
- `rejectOffer()` - Reject offer

### tokenService
- `getAgentTokens()` - Get user's token balance
- `purchaseTokens()` - Buy tokens
- `useTokensForListing()` - Deduct tokens
- `getTransactionHistory()` - View transactions
- `getTokenPricing()` - Get token price
- `updateTokenPricing()` - Admin function

### alertService
- `createLocationAlert()` - Set location alert
- `getUserAlerts()` - Get user's alerts
- `deactivateAlert()` - Turn off alert
- `checkProximityAlert()` - Calculate distance

## Authentication & Security

- **Row Level Security (RLS)** enabled on all tables
- **Users** can only view/modify their own data
- **Authentication** handled by Supabase Auth
- **Session** management with JWT tokens
- **Protected Routes** - Redirect unauthorized users to login

## Features In Detail

### 🎫 Token System for Agents
- Agents purchase tokens to list properties
- Tokens are deducted when property is listed
- Token price and duration set by admin
- Transaction history tracks all purchases and usage
- Premium features can be enabled per token

### 🗺️ Location-Based Features
- Store GPS coordinates with each property
- Calculate distance between user and properties
- Set up location alerts (radius-based)
- Visual proximity indicators
- Search within specific radius

### 🤝 Offer Management
- Rental offers for tenant-landlord transactions
- Purchase offers for buyer-agent/landlord transactions
- Message system with offers
- Legal document tracking
- Offer status workflow (pending → accepted/rejected)

### 📱 Mobile Responsive
- Fully responsive design
- Mobile-friendly navigation
- Touch-friendly buttons and forms
- Optimized for all screen sizes

## Customization

### Styling
- Global CSS variables in `styles/global.css`
- Customize colors, fonts, spacing
- Component-specific styles in CSS files

### Token Settings
- Default: $5 per token
- Default listing duration: 30 days
- Change in Admin Panel

### Database
- Modify tables in `DATABASE_SETUP.sql`
- Run migrations in Supabase SQL Editor
- Update services to match schema changes

## Testing

### Test Accounts
Create accounts via signup form with these details:

```
Tenant:
  Email: tenant@test.com
  Password: Test@123
  Role: Tenant

Agent:
  Email: agent@test.com
  Password: Test@123
  Role: Agent

Admin:
  Email: admin@test.com
  Password: Test@123
  Role: Admin
```

### Test Flows
1. **Search & Browse**: Create properties and browse in search
2. **Make Offers**: Login as tenant, make offer on property
3. **Accept/Reject**: Login as landlord, manage offers
4. **Tokens**: Login as agent, purchase and use tokens
5. **Admin Panel**: Login as admin, view statistics and settings

## Performance

- Debounced search (500ms)
- Indexed database queries
- Optimized image loading
- Lazy loading for lists
- Client-side filtering for better UX

## Troubleshooting

### Login Issues
- Check Supabase URL and Key are correct
- Verify email is confirmed (check Supabase Auth)
- Clear browser cache and try again

### Properties Not Showing
- Ensure DATABASE_SETUP.sql was fully executed
- Check user has admin access to manage properties
- Verify location coordinates are valid

### Token Issues
- Check user type is "agent"
- Verify token_settings table has data
- Check token balance in dashboard

### Styling Issues
- Clear cache: `npm run build`
- Restart dev server: `npm run dev`
- Check CSS file imports

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Environment Variables for Production
Set these in your hosting platform:
```
VITE_SUPABASE_URL=your-production-url
VITE_SUPABASE_KEY=your-production-key
```

## Future Enhancements

- [ ] AI-powered property recommendations
- [ ] Financial fit calculator
- [ ] Market intelligence and price predictions
- [ ] Video property tours
- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Admin analytics dashboard
- [ ] Solicitor/legal professional network
- [ ] Credit check integration

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, email support@findthathome.com or open an issue on GitHub.

## Authors

- Created as a complete real estate platform template
- Built with React, Vite, and Supabase

## Acknowledgments

- Vite for fast development
- React for component architecture
- Supabase for backend services
- React Router for routing
- React Icons for beautiful icons

---

**Happy coding! 🏡**

Start listing properties and connecting buyers with homes today!

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
