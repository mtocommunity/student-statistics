CREATE TABLE `course` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text(50) NOT NULL,
	`semester_id` integer NOT NULL,
	FOREIGN KEY (`semester_id`) REFERENCES `semester`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `semester` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`user_code` text(6) NOT NULL,
	FOREIGN KEY (`user_code`) REFERENCES `user`(`code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `answer` (
	`student_code` text(6) NOT NULL,
	`question_id` integer NOT NULL,
	`score` integer NOT NULL,
	PRIMARY KEY(`student_code`, `question_id`),
	FOREIGN KEY (`student_code`,`question_id`) REFERENCES `user`(`code`,`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `exam` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`min_passing_score` integer DEFAULT 12 NOT NULL,
	`course_id` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `question` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`n_order` integer NOT NULL,
	`max_score` integer NOT NULL,
	`exam_id` integer NOT NULL,
	FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `student_course` (
	`student_id` integer NOT NULL,
	`course_id` integer NOT NULL,
	PRIMARY KEY(`student_id`, `course_id`),
	FOREIGN KEY (`student_id`,`course_id`) REFERENCES `student`(`id`,`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `student` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text(50) NOT NULL,
	`last_name` text(50) NOT NULL,
	`code` text(9) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `user` (
	`code` text(6) PRIMARY KEY NOT NULL,
	`name` text(40) NOT NULL,
	`lastname` text(40) NOT NULL,
	`password` text(255) NOT NULL
);
