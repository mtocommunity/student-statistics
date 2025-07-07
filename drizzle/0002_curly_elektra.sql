PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_answer` (
	`student_code` text(6) NOT NULL,
	`question_id` integer NOT NULL,
	`score` real,
	PRIMARY KEY(`student_code`, `question_id`),
	FOREIGN KEY (`student_code`,`question_id`) REFERENCES `user`(`code`,`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_answer`("student_code", "question_id", "score") SELECT "student_code", "question_id", "score" FROM `answer`;--> statement-breakpoint
DROP TABLE `answer`;--> statement-breakpoint
ALTER TABLE `__new_answer` RENAME TO `answer`;--> statement-breakpoint
PRAGMA foreign_keys=ON;