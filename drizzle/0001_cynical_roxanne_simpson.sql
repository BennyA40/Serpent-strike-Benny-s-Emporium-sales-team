CREATE TABLE `booking_quotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`email` varchar(320) NOT NULL,
	`name` varchar(200) NOT NULL,
	`bookingType` enum('flight','carRental','cruise','custom') NOT NULL,
	`details` json,
	`status` enum('pending','quoted','booked','expired') DEFAULT 'pending',
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `booking_quotes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `car_rental_bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`bookingReference` varchar(64) NOT NULL,
	`pickupLocation` varchar(200) NOT NULL,
	`dropoffLocation` varchar(200) NOT NULL,
	`pickupDate` timestamp NOT NULL,
	`dropoffDate` timestamp NOT NULL,
	`carType` varchar(100),
	`rentalCompany` varchar(100),
	`dailyRate` decimal(10,2) NOT NULL,
	`totalPrice` decimal(10,2) NOT NULL,
	`currency` varchar(3) DEFAULT 'USD',
	`status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
	`rentalData` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `car_rental_bookings_id` PRIMARY KEY(`id`),
	CONSTRAINT `car_rental_bookings_bookingReference_unique` UNIQUE(`bookingReference`)
);
--> statement-breakpoint
CREATE TABLE `commissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`bookingType` enum('flight','carRental','cruise') NOT NULL,
	`bookingId` int NOT NULL,
	`userId` int NOT NULL,
	`bookingAmount` decimal(10,2) NOT NULL,
	`commissionRate` decimal(5,2) NOT NULL,
	`commissionAmount` decimal(10,2) NOT NULL,
	`currency` varchar(3) DEFAULT 'USD',
	`status` enum('pending','earned','paid') DEFAULT 'pending',
	`paymentDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `commissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cruise_bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`bookingReference` varchar(64) NOT NULL,
	`cruiseLine` varchar(100) NOT NULL,
	`ship` varchar(100),
	`departurePort` varchar(100) NOT NULL,
	`destinationPorts` text,
	`departureDate` timestamp NOT NULL,
	`returnDate` timestamp NOT NULL,
	`cabinType` varchar(100),
	`passengers` int NOT NULL DEFAULT 1,
	`pricePerPerson` decimal(10,2) NOT NULL,
	`totalPrice` decimal(10,2) NOT NULL,
	`currency` varchar(3) DEFAULT 'USD',
	`status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
	`cruiseData` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cruise_bookings_id` PRIMARY KEY(`id`),
	CONSTRAINT `cruise_bookings_bookingReference_unique` UNIQUE(`bookingReference`)
);
--> statement-breakpoint
CREATE TABLE `flight_bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`bookingReference` varchar(64) NOT NULL,
	`departureCity` varchar(100) NOT NULL,
	`arrivalCity` varchar(100) NOT NULL,
	`departureDate` timestamp NOT NULL,
	`returnDate` timestamp,
	`passengers` int NOT NULL DEFAULT 1,
	`airline` varchar(100),
	`flightNumber` varchar(20),
	`price` decimal(10,2) NOT NULL,
	`currency` varchar(3) DEFAULT 'USD',
	`status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
	`sabreData` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `flight_bookings_id` PRIMARY KEY(`id`),
	CONSTRAINT `flight_bookings_bookingReference_unique` UNIQUE(`bookingReference`)
);
