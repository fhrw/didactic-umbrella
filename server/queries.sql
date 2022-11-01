CREATE TABLE students (
	student_id INTEGER NOT NULL,
	teacher_id INTEGER NOT NULL,
	first_name TEXT,
	last_name TEXT,
	PRIMARY KEY (student_id),
	FOREIGN KEY (teacher_id) REFERENCES teachers (teacher_id) 
            ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE teachers (
	teacher_id INTEGER NOT NULL,
	first_name TEXT,
	last_name TEXT
)

CREATE TABLE constraints (
	constraint_id INTEGER NOT NULL,
	student_id INTEGER NOT NULL,
	week integer,
	slot text,
	primary key (constraint_id)
	foreign key (student_id) REFERENCES students (student_id)
);

CREATE TABLE history (
	history_id INTEGER NOT NULL,
	student_id INTEGER NOT NULL,
	week integer,
	slot text,
	primary key (history_id)
	foreign key (student_id) REFERENCES students (student_id)
);

CREATE TABLE slots (
	slot_id INTEGER NOT NULL,
	teacher_id INTEGER NOT NULL,
	week integer,
	slot text,
	primary key (slot_id),
	foreign key (teacher_id) REFERENCES teachers (teacher_id)
);