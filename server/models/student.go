package models

import "github.com/google/uuid"

type Student struct {
	Base
	Teacher_id uuid.UUID `json:"teacher_id"`
	First_name string    `json:"first_name"`
	Last_name  string    `json:"last_name"`
	School     string    `json:"school"`
	// considering adding start and end weeks to allow
	// for students to quit and enrol
	// Start_week: 0
	// End_week: -1
}

type StudentInput struct {
	Teacher_id uuid.UUID `json:"teacher_id" binding:"required"`
	First_name string    `json:"first_name" binding:"required"`
	Last_name  string    `json:"last_name" binding:"required"`
	School     string    `json:"school" binding:"required"`
}

type StudentUpdate struct {
	Teacher_id uuid.UUID `json:"teacher_id"`
	First_name string    `json:"first_name"`
	Last_name  string    `json:"last_name"`
	School     string    `json:"school"`
}
