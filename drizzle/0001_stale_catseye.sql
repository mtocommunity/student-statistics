PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_answer` (
	`student_code` text(6) NOT NULL,
	`question_id` integer NOT NULL,
	`score` real NOT NULL,
	PRIMARY KEY(`student_code`, `question_id`),
	FOREIGN KEY (`student_code`,`question_id`) REFERENCES `user`(`code`,`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_answer`("student_code", "question_id", "score") SELECT "student_code", "question_id", "score" FROM `answer`;--> statement-breakpoint
DROP TABLE `answer`;--> statement-breakpoint
ALTER TABLE `__new_answer` RENAME TO `answer`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_exam` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`min_passing_score` real DEFAULT 11.6 NOT NULL,
	`course_id` integer NOT NULL,
	FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_exam`("id", "name", "min_passing_score", "course_id") SELECT "id", "name", "min_passing_score", "course_id" FROM `exam`;--> statement-breakpoint
DROP TABLE `exam`;--> statement-breakpoint
ALTER TABLE `__new_exam` RENAME TO `exam`;--> statement-breakpoint
CREATE TABLE `__new_question` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`n_order` integer NOT NULL,
	`max_score` real NOT NULL,
	`exam_id` integer NOT NULL,
	FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_question`("id", "n_order", "max_score", "exam_id") SELECT "id", "n_order", "max_score", "exam_id" FROM `question`;--> statement-breakpoint
DROP TABLE `question`;--> statement-breakpoint
ALTER TABLE `__new_question` RENAME TO `question`;