# Quick Start Guide - Find That Home

## ⚡ 5-Minute Setup

### Step 1: Supabase Setup (2 minutes)
1. Go to https://app.supabase.com and create a new project
2. Wait for project to initialize (~2 min)
3. Go to **SQL Editor** in the left sidebar
4. Copy ALL content from `DATABASE_SETUP.sql` file
5. Paste it into the SQL Editor and click **RUN**
6. Go to **Project Settings** > **API**
7. Copy your `Project URL` and `Anon Key`

### Step 2: Configure App (1 minute)
1. Create `.env.local` file in project root (copy from `.env.example`)
2. Paste your Supabase credentials:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_KEY=your-anon-key
```

### Step 3: Run App (2 minutes)
```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

App is now live at **http://localhost:5173** ✅

## 🧪 Test the App

### Create Test Accounts
1. Go to http://localhost:5173
2. Click "Sign Up"
3. Create accounts with these roles:

**Account 1: Agent**
- Email: agent@test.com
- Password: Test@123456
- Role: Real Estate Agent
- ✅ Can list properties, buy tokens

**Account 2: Tenant**
- Email: tenant@test.com
- Password: Test@123456
- Role: Tenant
- ✅ Can search and make offers

**Account 3: Landlord**
- Email: landlord@test.com
- Password: Test@123456
- Role: Landlord
- ✅ Can list properties, manage offers

**Account 4: Admin**
- Email: admin@test.com
- Password: Test@123456
- Role: Admin
- ✅ Can manage all users and settings

### Test Complete Flow

#### As Agent 👨‍💼
1. Login with agent@test.com
2. Go to "List Property"
3. Fill in property details:
   - Title: "Beautiful 2BR Apartment"
   - Location: "123 Main St, Downtown"
   - Price: 2500
   - Type: Apartment
   - Add some amenities: "WiFi, Parking, Pool"
4. Click "List Property"
5. Go to "Tokens" dashboard
6. Purchase 10 tokens (costs $50)

#### As Tenant 👩‍💼
1. Login with tenant@test.com
2. Go to "Search Properties"
3. Click on the property you just listed
4. Scroll down to "Make an Offer"
5. Enter offer amount: 2400
6. Add message: "Can move in next month"
7. Click "Submit Offer"

#### As Landlord 🏠
1. Login with landlord@test.com
2. Go to "Landlord Dashboard"
3. See the tenant's offer in "Tenant Offers"
4. Click "Accept" to accept the offer

#### As Tenant 👩‍💼
1. Go back to Tenant Dashboard
2. See your offer status changed to "accepted" ✅

#### As Admin 🔧
1. Login with admin@test.com
2. Go to "Admin Panel"
3. See:
   - Total properties: 1
   - Property listings table
4. Change token settings:
   - Set price per token: 6
   - Set listing duration: 45 days
5. Click "Update Settings"

## 🎯 Key Features to Try

### 1. **Property Search** 🔍
- Use filters: location, price range, property type
- See property details with images and ratings
- View QR code (can download)

### 2. **Make Offers** 💰
- Submit rental offers as tenant
- Submit purchase offers as buyer
- Add messages with offers
- Track offer history

### 3. **Manage Listings** 📋
- Agents: List properties with full details
- Include: bedrooms, bathrooms, amenities, GPS location
- Upload property images via URL

### 4. **Token System** 🎫
- Agents: Purchase tokens ($5 per token default)
- View transaction history
- Track token balance in dashboard

### 5. **Dashboards** 📊
- **Tenant**: View offers, edit profile
- **Agent**: View listings, tokens, transactions
- **Landlord**: View properties, manage tenant offers
- **Admin**: Platform statistics, settings

### 6. **Location Features** 📍
- Each property has GPS coordinates
- Properties show distance/location
- Location alerts (setup in tenant dashboard)

## 📁 File Locations

Important files for customization:

```
.env.local              ← Supabase credentials
DATABASE_SETUP.sql      ← Database schema
src/
  ├── App.jsx          ← App routing
  ├── styles/
  │   └── global.css   ← Global colors & fonts
  ├── services/        ← API calls to Supabase
  └── pages/           ← All page components
```

## 🎨 Customize Colors

Edit `src/styles/global.css`:

```css
:root {
  --primary-color: #2563eb;        /* Main blue */
  --secondary-color: #10b981;      /* Green */
  --danger-color: #ef4444;         /* Red */
  /* ... more colors ... */
}
```

## 💾 Save Your Work

### Create Repository
```bash
git init
git add .
git commit -m "Initial commit - Real estate platform"
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 🚀 Next Steps

### Add More Features
1. Payment integration (Stripe)
2. Email notifications
3. Property image uploads
4. Video tours
5. AI recommendations

### Improve Database
1. Add more fields to properties
2. Add reviews/ratings system
3. Add saved properties for users
4. Add user messages/chat

### Scale Up
1. Setup Supabase on production
2. Add error tracking (Sentry)
3. Setup CI/CD with GitHub Actions
4. Monitor with analytics

## 🆘 Troubleshooting

### "Cannot connect to Supabase"
✅ Check `.env.local` has correct URL and KEY
✅ Verify DATABASE_SETUP.sql was fully executed

### "User not found after signup"
✅ Confirm email in Supabase Auth dashboard
✅ Check user_type is correctly saved

### "Properties not showing"
✅ Make sure you're logged in as agent/landlord
✅ Check properties table has data in Supabase

### "Styling looks off"
✅ Clear browser cache (Ctrl+Shift+Del)
✅ Restart dev server (npm run dev)

## 📚 Learn More

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Supabase**: https://supabase.com/docs
- **React Router**: https://reactrouter.com

## 🎓 Code Comments

All code is well-commented like a university project:
- Each component explains what it does
- Services are documented
- CSS is organized and explained
- Easy to understand and modify

## ✅ Checklist

- [ ] Supabase project created
- [ ] DATABASE_SETUP.sql executed
- [ ] .env.local configured
- [ ] `npm install` completed
- [ ] `npm run dev` running
- [ ] Can create accounts
- [ ] Can list properties
- [ ] Can make offers
- [ ] Can see dashboards

**All done! 🎉 Your real estate platform is ready to use!**

Have questions? Check the main README.md for detailed information.
