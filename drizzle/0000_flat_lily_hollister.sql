CREATE TABLE `user` (
	`code` text(6) PRIMARY KEY NOT NULL,
	`name` text(40) NOT NULL,
	`lastname` text(40) NOT NULL,
	`password` text(255) NOT NULL
);
