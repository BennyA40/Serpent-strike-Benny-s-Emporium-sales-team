CREATE TABLE `lenders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`lenderName` varchar(255) NOT NULL,
	`lenderType` enum('mca','bank','alternative','credit_repair','affiliate') NOT NULL,
	`apiKey` varchar(255),
	`apiEndpoint` varchar(255),
	`minLoanAmount` decimal(15,2),
	`maxLoanAmount` decimal(15,2),
	`minCreditScore` int,
	`minMonthlyRevenue` decimal(15,2),
	`commissionRate` decimal(5,2) NOT NULL,
	`isActive` int DEFAULT 1,
	`contactEmail` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lenders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loan_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`applicationId` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`loanType` enum('mca','term_loan','loc','equipment','personal','business') NOT NULL,
	`loanAmount` decimal(15,2) NOT NULL,
	`businessName` varchar(255),
	`businessType` varchar(100),
	`monthlyRevenue` decimal(15,2),
	`yearsInBusiness` int,
	`creditScore` int,
	`purpose` text,
	`status` enum('pending','qualified','routed','approved','declined','funded') DEFAULT 'pending',
	`qualificationScore` int,
	`routedLenderId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loan_applications_id` PRIMARY KEY(`id`),
	CONSTRAINT `loan_applications_applicationId_unique` UNIQUE(`applicationId`)
);
--> statement-breakpoint
CREATE TABLE `loan_commissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dealId` varchar(64) NOT NULL,
	`layer` enum('primary_loan','secondary_offer','lifestyle_upsell','referral') NOT NULL,
	`commissionAmount` decimal(15,2) NOT NULL,
	`commissionRate` decimal(5,2) NOT NULL,
	`recipientId` int NOT NULL,
	`recipientType` enum('benny','manus','partner','freelancer') NOT NULL,
	`status` enum('pending','earned','paid') DEFAULT 'pending',
	`paidAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loan_commissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loan_deals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`dealId` varchar(64) NOT NULL,
	`applicationId` varchar(64) NOT NULL,
	`offerId` varchar(64) NOT NULL,
	`lenderId` int NOT NULL,
	`borrowerId` int NOT NULL,
	`loanAmount` decimal(15,2) NOT NULL,
	`fundingDate` timestamp,
	`status` enum('pending','funded','active','completed','defaulted') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loan_deals_id` PRIMARY KEY(`id`),
	CONSTRAINT `loan_deals_dealId_unique` UNIQUE(`dealId`)
);
--> statement-breakpoint
CREATE TABLE `loan_offers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`offerId` varchar(64) NOT NULL,
	`applicationId` varchar(64) NOT NULL,
	`lenderId` int NOT NULL,
	`loanAmount` decimal(15,2) NOT NULL,
	`interestRate` decimal(5,2),
	`term` int,
	`monthlyPayment` decimal(15,2),
	`fees` decimal(15,2),
	`apr` decimal(5,2),
	`status` enum('pending','accepted','rejected','expired') DEFAULT 'pending',
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loan_offers_id` PRIMARY KEY(`id`),
	CONSTRAINT `loan_offers_offerId_unique` UNIQUE(`offerId`)
);
--> statement-breakpoint
CREATE TABLE `loan_partners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`partnerId` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`partnerType` enum('agent','freelancer','travel_partner','affiliate') NOT NULL,
	`businessName` varchar(255),
	`commissionRate` decimal(5,2) NOT NULL,
	`totalReferrals` int DEFAULT 0,
	`totalEarnings` decimal(15,2) DEFAULT 0,
	`status` enum('active','inactive','suspended') DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `loan_partners_id` PRIMARY KEY(`id`),
	CONSTRAINT `loan_partners_partnerId_unique` UNIQUE(`partnerId`)
);
--> statement-breakpoint
CREATE TABLE `partner_referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referralId` varchar(64) NOT NULL,
	`partnerId` varchar(64) NOT NULL,
	`applicationId` varchar(64) NOT NULL,
	`dealId` varchar(64),
	`referralCommission` decimal(15,2),
	`status` enum('pending','qualified','funded','paid') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partner_referrals_id` PRIMARY KEY(`id`),
	CONSTRAINT `partner_referrals_referralId_unique` UNIQUE(`referralId`)
);
