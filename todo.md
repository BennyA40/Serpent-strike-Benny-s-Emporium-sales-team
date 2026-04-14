# Benny's Emporium — TODO

## Current Sprint: Quote Button Fix & Travel Vendor Directory

### Quote Request System
- [x] Fix Request a Quote button navigation
- [x] Create QuoteRequest page (/quote-request)
- [x] Add quote form with basic fields
- [x] Link button from Home and TravelPlanning pages

### Travel Vendor Directory
- [x] Create TravelVendorDirectory page (/travel-vendors)
- [x] Add Cruise Lines category (Royal Caribbean, Carnival, Norwegian, MSC, Princess, Celebrity, Holland America, Disney Cruise Line)
- [x] Add Resorts category (Sandals, Beaches, AMR Collection, RIU, Iberostar, Club Med, Karisma, Palace Resorts)
- [x] Add Booking Engines category (VAX VacationAccess, Expedia TAAP, Priceline Partner Network, Travel Impressions, Funjet, Apple Vacations, Pleasant Holidays)
- [x] Add Hotels category (Marriott, Hilton, Hyatt, IHG, Wyndham)
- [x] Add Airlines category (American, Delta, United, Southwest, JetBlue, Alaska)
- [x] Add placeholder credential fields for each vendor
- [ ] Create backend tRPC procedures for vendor management

### Integration
- [x] Add routes to App.tsx
- [x] Update navigation to link to vendor directory
- [x] Test all navigation flows
- [ ] Save checkpoint

## Completed Features

### Battalion Integration (Completed)
- [x] Database schema with squads, agents, assignments, commissions, metrics
- [x] Backend tRPC procedures for battalion operations
- [x] Battalion Command Center admin dashboard
- [x] Role-based access control
- [x] Agent leaderboards and performance tracking
- [x] Vitest tests (13 passing)

### Core Features (Completed)
- [x] Home page with hero and service cards
- [x] Travel Planning page
- [x] Bookings Dashboard
- [x] Freelance Hub
- [x] Loan Hub
- [x] Destination pages (Paris, Bali, Tokyo, Caribbean, New York, Dubai)

## Current Sprint: Browse Packages Button Fix & Freelance Subcategories

### Browse Packages Button Fixes
- [x] Fix Browse Packages button in TravelPlanning page
- [x] Fix Browse Packages button in FreelanceHub page
- [x] Create Packages browse page (/packages)
- [x] Link both buttons to packages page

### Freelance Subcategories Integration
- [ ] Add Writer subcategories (11 types: Auctioneer, Ritual, Micro-Story, Conversion Bard, Persona Architect, Technical Summarist, Ghostwriter, Emotional Logic, Worldbuilding, Dialogue Tailor, Brand Scripture)
- [ ] Add Web Design subcategories (6 types: UX Ritualist, Micro-Interaction, Conversion Layout, Brand-First Stylist, No-Code Specialist, Accessibility-Focused)
- [ ] Add Video Editing subcategories (6 types: Cinematic Story, Social Pulse, Motion Graphics, Documentary, Music-Synced, Color Grading)
- [ ] Add Consulting subcategories (5 types: Systems Architect, Brand Identity, Business Clarity, Digital Transformation, Market Positioning)
- [ ] Add Programming subcategories (5 types: Full-Stack, API Integration, No-Code/Low-Code, Performance, Security)
- [ ] Add Marketing subcategories (5 types: Funnel & Conversion, Social Presence, Paid Ads, Community Growth, Analytics)
- [ ] Add Music subcategories (5 types: Genre-Fusion, Vocal Production, Beat Architect, Mixing & Mastering, Sound Identity)
- [ ] Update FreelanceHub to display all subcategories

## Current Sprint: Freelance Services Population & Expansion

### Freelance Services Seed Data
- [x] Create seed data for 43 freelance subcategories
- [x] Populate Writing subcategories (11 types)
- [x] Populate Web Design subcategories (6 types)
- [x] Populate Video Editing subcategories (6 types)
- [x] Populate Consulting subcategories (5 types)
- [x] Populate Programming subcategories (5 types)
- [x] Populate Marketing subcategories (5 types)
- [x] Populate Music subcategories (5 types)

### FreelanceHub Expansion
- [x] Update FreelanceHub to display subcategories instead of main categories
- [x] Add subcategory filtering with proper UI
- [x] Create freelancer profile cards with ratings, reviews, portfolio
- [x] Add search across subcategories
- [ ] Create subcategory detail pages
- [x] Add freelancer discovery flow
- [x] Implement hire/contact functionality
