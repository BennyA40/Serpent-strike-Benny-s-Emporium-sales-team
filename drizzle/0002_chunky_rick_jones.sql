CREATE TABLE `freelance_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`senderId` int NOT NULL,
	`recipientId` int NOT NULL,
	`message` text NOT NULL,
	`attachments` json,
	`isRead` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `freelance_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `freelance_payouts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`freelancerId` int NOT NULL,
	`projectId` int,
	`payoutAmount` decimal(10,2) NOT NULL,
	`payoutStatus` enum('pending','processing','completed','failed') DEFAULT 'pending',
	`paymentMethod` varchar(100),
	`stripePayoutId` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `freelance_payouts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `freelance_projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` varchar(64) NOT NULL,
	`clientId` int NOT NULL,
	`freelancerId` int NOT NULL,
	`serviceId` int,
	`title` varchar(300) NOT NULL,
	`description` text,
	`category` varchar(100) NOT NULL,
	`projectPrice` decimal(10,2) NOT NULL,
	`platformFee` decimal(10,2) NOT NULL,
	`freelancerPayout` decimal(10,2) NOT NULL,
	`manusFeature` decimal(10,2) NOT NULL,
	`bennysProfit` decimal(10,2) NOT NULL,
	`deliveryDeadline` timestamp NOT NULL,
	`status` enum('pending','active','completed','cancelled','disputed') DEFAULT 'pending',
	`paymentStatus` enum('pending','paid','refunded') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `freelance_projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `freelance_projects_projectId_unique` UNIQUE(`projectId`)
);
--> statement-breakpoint
CREATE TABLE `freelance_reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`clientId` int NOT NULL,
	`freelancerId` int NOT NULL,
	`rating` int NOT NULL,
	`review` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `freelance_reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `freelance_services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`freelancerId` int NOT NULL,
	`title` varchar(300) NOT NULL,
	`description` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`deliveryDays` int NOT NULL,
	`serviceImage` varchar(500),
	`highlights` json,
	`totalOrders` int DEFAULT 0,
	`averageRating` decimal(3,2) DEFAULT '5',
	`totalReviews` int DEFAULT 0,
	`isActive` int DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `freelance_services_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `freelancer_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(200) NOT NULL,
	`bio` text,
	`profileImage` varchar(500),
	`hourlyRate` decimal(10,2) NOT NULL,
	`skills` json,
	`categories` json,
	`portfolio` json,
	`totalEarnings` decimal(12,2) DEFAULT '0',
	`totalProjects` int DEFAULT 0,
	`averageRating` decimal(3,2) DEFAULT '5',
	`totalReviews` int DEFAULT 0,
	`isVerified` int DEFAULT 0,
	`availability` enum('available','busy','unavailable') DEFAULT 'available',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `freelancer_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `freelancer_profiles_userId_unique` UNIQUE(`userId`)
);
