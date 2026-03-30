# Benny's Emporium

> **Your Gateway to Endless Opportunities**

A sovereign, multi-vertical platform integrating travel planning, freelance solutions, and loan brokering into one unified ecosystem. Built with modern web technologies, intelligent routing algorithms, and a focus on trust, transparency, and opportunity.

---

## 🌟 Overview

Benny's Emporium is a full-stack web application that brings together three powerful verticals:

### **1. Travel & Lifestyle Hub**
- Flight, hotel, car rental, and cruise bookings
- Wellness retreats, adventure activities, cultural tours
- Sports and concert tickets
- Destination guides and curated packages
- Real-time pricing and availability

### **2. Freelance Solutions Marketplace**
- Freelancer profiles with portfolios and ratings
- Service listings across multiple categories
- Project management and messaging
- Secure payment processing with commission tracking
- Review and rating system
- Commission model: **30% platform fee** (15% to Manus infrastructure, 15% net profit)

### **3. Loan Brokering Hub**
- Fast pre-qualification (minutes, not days)
- Access to 50+ lenders
- Multi-product support (MCA, term loans, LOC, equipment financing, personal, business)
- Intelligent qualification scoring
- Offer comparison and acceptance
- Partner referral network
- Commission model: **5-8% primary** + **2-5% referral**

---

## 🏗️ Architecture

### **Tech Stack**

**Frontend:**
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- Wouter for routing
- tRPC for type-safe API calls
- Framer Motion for animations
- Lucide React for icons

**Backend:**
- Express.js for HTTP server
- tRPC for RPC procedures
- Drizzle ORM for database management
- MySQL/TiDB for data persistence
- JWT for session management
- Manus OAuth for authentication

**Infrastructure:**
- Vite for build tooling
- Vitest for unit testing
- Docker-ready deployment
- S3 integration for file storage
- Stripe-ready payment infrastructure

### **Database Schema**

The application uses 15+ tables organized by vertical:

**Users & Auth:**
- `users` - Core user accounts with OAuth integration

**Travel:**
- `flight_bookings` - Flight reservations and tracking
- `car_rentals` - Vehicle rental bookings
- `cruise_bookings` - Cruise reservations

**Freelance:**
- `freelancer_profiles` - Freelancer information and portfolios
- `freelance_services` - Service listings
- `freelance_projects` - Project management
- `freelance_messages` - Client-freelancer communication
- `freelance_reviews` - Ratings and feedback
- `freelance_payouts` - Commission tracking and payouts

**Loans:**
- `loan_applications` - Borrower applications with qualification scores
- `lenders` - Lender network and products
- `loan_offers` - Lender offers to borrowers
- `loan_deals` - Completed transactions
- `loan_commissions` - Multi-layer commission tracking
- `loan_partners` - Referral partners and agents
- `partner_referrals` - Referral tracking

**Bookings & Commissions:**
- `bookings_commissions` - Travel booking commissions

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js 22.13.0+
- pnpm 10.4.1+
- MySQL 8.0+ or TiDB
- Git

### **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BennyA40/Bennys-Emporium.git
   cd Bennys-Emporium
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables (see `.env.example` for required values)

4. **Initialize the database:**
   ```bash
   pnpm db:push
   ```

5. **Start the development server:**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

---

## 📖 Usage

### **For Borrowers (Loan Hub)**

1. Navigate to `/loans`
2. Select loan type and enter loan amount
3. Complete pre-qualification form
4. Receive instant qualification score
5. View offers from multiple lenders
6. Accept offer and receive funding

### **For Freelancers**

1. Navigate to `/freelance`
2. Create freelancer profile with portfolio
3. List your services with rates
4. Receive project inquiries
5. Manage projects and communicate with clients
6. Earn 70% of project value (30% platform fee)

### **For Travelers**

1. Navigate to `/travel-planning`
2. Search flights, hotels, cars, cruises
3. Browse destination guides
4. Filter by activity, price, date
5. Book and manage itineraries
6. Earn rewards on travel bookings

---

## 🔧 Development

### **Project Structure**

```
bennys_emporium/
├── client/                    # React frontend
│   ├── src/
│   │   ├── pages/            # Page components
│   │   ├── components/       # Reusable UI components
│   │   ├── lib/              # Utilities and helpers
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   ├── index.html            # HTML template
│   └── vite.config.ts        # Vite configuration
├── server/                    # Express backend
│   ├── routers/              # tRPC route handlers
│   ├── _core/                # Core infrastructure
│   ├── db.ts                 # Database helpers
│   ├── bookings.ts           # Booking operations
│   ├── freelance.ts          # Freelance operations
│   └── loans.ts              # Loan operations
├── drizzle/                  # Database schema
│   ├── schema.ts             # Table definitions
│   └── migrations/           # Migration files
├── shared/                   # Shared types and constants
└── package.json              # Dependencies
```

### **Key Files**

- `client/src/App.tsx` - Route definitions and layout
- `server/routers.ts` - Main API router
- `drizzle/schema.ts` - Database schema
- `server/_core/trpc.ts` - tRPC configuration
- `client/src/lib/trpc.ts` - tRPC client setup

### **Running Tests**

```bash
pnpm test
```

### **Building for Production**

```bash
pnpm build
pnpm start
```

---

## 💰 Commission Architecture

### **Travel & Lifestyle**
- Platform commission: **10-20%** depending on product
- Manus infrastructure fee: **2-3%**
- Net profit: **7-17%**

### **Freelance Solutions**
- Platform commission: **30%** (industry standard)
- Manus infrastructure fee: **15%**
- Net profit: **15%**
- Freelancer receives: **70%**

### **Loan Brokering**
- Primary loan commission: **5-8%**
  - Benny's cut: **3-5%**
  - Manus infrastructure: **2-3%**
- Referral commission: **2-5%** (to partners)
- Partner types: Agents, freelancers, travel partners, affiliates

---

## 🔐 Security

- **Authentication:** Manus OAuth with JWT sessions
- **Database:** Encrypted connections with SSL
- **API:** Type-safe tRPC with validation
- **Payments:** Stripe integration (ready to implement)
- **Data:** User data encrypted at rest
- **CORS:** Configured for secure cross-origin requests

---

## 📊 Features

### **Current Implementation**

✅ Multi-vertical platform architecture  
✅ User authentication with OAuth  
✅ Travel booking system with destination guides  
✅ Freelance marketplace with messaging  
✅ Loan brokering with qualification scoring  
✅ Commission tracking and reporting  
✅ Partner referral network  
✅ Responsive design (mobile-first)  
✅ Real-time notifications  
✅ Admin dashboard foundation  

### **Roadmap**

🔄 Real lender API integrations (SABRE, Expedia, MCA networks)  
🔄 Stripe payment processing  
🔄 Advanced analytics and reporting  
🔄 Mobile app (React Native)  
🔄 AI-powered recommendations  
🔄 Dispute resolution system  
🔄 Automated payouts  
🔄 Verification badges and trust scores  

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- Code follows the existing style
- Tests pass (`pnpm test`)
- TypeScript compiles without errors (`pnpm check`)
- README is updated if needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

**Project Lead:** Benjamin Amory  
**Email:** ligersama777@gmail.com  
**Phone:** 484-201-7626  
**GitHub:** https://github.com/BennyA40  

### **Getting Help**

- **Issues:** Report bugs or request features on [GitHub Issues](https://github.com/BennyA40/Bennys-Emporium/issues)
- **Discussions:** Join community discussions on [GitHub Discussions](https://github.com/BennyA40/Bennys-Emporium/discussions)
- **Email:** For direct inquiries, contact ligersama777@gmail.com

---

## 🌐 Live Demo

**Website:** https://bennys-emporium.manus.space  
**Admin Dashboard:** Available to authorized users

---

## 📚 Documentation

- [API Documentation](docs/API.md) - tRPC procedures and endpoints
- [Database Schema](docs/DATABASE.md) - Table definitions and relationships
- [Deployment Guide](docs/DEPLOYMENT.md) - Production setup instructions
- [Contributing Guide](CONTRIBUTING.md) - Development guidelines

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev)
- [tRPC](https://trpc.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Express.js](https://expressjs.com)
- [Manus Platform](https://manus.im)

---

## 📈 Status

**Current Version:** 1.0.0  
**Status:** Active Development  
**Last Updated:** March 2026  

---

**Benny's Emporium — Where Capital Meets Creativity**
